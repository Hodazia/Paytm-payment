import React, { createContext, useContext, useState, useEffect } from 'react';
import { BACKEND_URL } from '../assets/backurl';

// Create the AuthContext
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // DEBUG: Log AuthProvider's internal state on every render
  console.log("AUTH_DEBUG: AuthProvider Render - User:", user, "Token:", token ? "Present" : "Missing", "isLoading:", isLoading);

  // Effect to load user and token from localStorage on component mount
  useEffect(() => {
    console.log("AUTH_DEBUG: AuthProvider useEffect (initial load) triggered.");
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    console.log("AUTH_DEBUG: LocalStorage - savedToken:", savedToken ? "Found" : "Not Found", "savedUser:", savedUser ? "Found" : "Not Found");

    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        console.log("AUTH_DEBUG: Successfully loaded user and token from localStorage.");
      } catch (e) {
        console.error("AUTH_DEBUG: Failed to parse user from localStorage:", e);
        // Clear invalid storage if parsing fails to prevent future errors
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setToken(null); // Ensure token state is cleared
        setUser(null); // Ensure user state is cleared
        console.log("AUTH_DEBUG: Cleared invalid user/token from localStorage and state.");
      }
    } else {
      console.log("AUTH_DEBUG: No user/token found in localStorage or one was missing.");
      setToken(null); // Explicitly ensure token is null if not found
      setUser(null); // Explicitly ensure user is null if not found
    }
    setIsLoading(false);
    console.log("AUTH_DEBUG: AuthProvider initial loading complete. isLoading set to false.");
  }, []); // Empty dependency array means this runs once on mount

  const login = async (username, password) => {
    console.log("AUTH_DEBUG: Login attempt for username:", username);
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("AUTH_DEBUG: Login API response status:", response.status);
      console.log("AUTH_DEBUG: Login API response data:", data);

      if (response.ok) {
        let userId = null;
        try {
          // Ensure data.token exists before trying to split/decode
          if (data.token) {
            const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
            userId = tokenPayload.userId;
            console.log("AUTH_DEBUG: Token decoded, userId:", userId);
          } else {
            console.warn("AUTH_DEBUG: Login successful but no token in response data.");
          }
        } catch (e) {
          console.error("AUTH_DEBUG: Failed to decode token payload:", e);
          userId = 'user_' + Date.now(); // Fallback: use a placeholder userId
        }
        
        const userObj = { id: userId, username };
        setUser(userObj);
        setToken(data.token); // Set token in state
        localStorage.setItem('token', data.token); // Save token to localStorage
        localStorage.setItem('user', JSON.stringify(userObj)); // Save user to localStorage
        console.log(`AUTH_DEBUG: Successfully signed in as ${username}. Token and user saved.`);
        return true;
      } else {
        console.error(`AUTH_DEBUG: Sign in failed: ${data.message || "Invalid credentials"}`);
        return false;
      }
    } catch (error) {
      console.error("AUTH_DEBUG: Network error during sign in:", error);
      return false;
    } finally {
      setIsLoading(false);
      console.log("AUTH_DEBUG: Login process finished. isLoading set to false.");
    }
  };

  /**
   * Handles user signup.
   * @param {string} username
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   * @returns {Promise<boolean>} True if signup is successful, false otherwise.
   */
  const signup = async (username, password, firstName, lastName) => {
    console.log("AUTH_DEBUG: Signup attempt for username:", username);
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstName, lastName }),
      });

      const data = await response.json();
      console.log("AUTH_DEBUG: Signup API response status:", response.status);
      console.log("AUTH_DEBUG: Signup API response data:", data);

      if (response.ok) {
        let userId = null;
        try {
          if (data.token) {
            const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
            userId = tokenPayload.userId;
            console.log("AUTH_DEBUG: Token decoded, userId:", userId);
          } else {
            console.warn("AUTH_DEBUG: Signup successful but no token in response data.");
          }
        } catch (e) {
          console.error("AUTH_DEBUG: Failed to decode token payload:", e);
          userId = 'user_' + Date.now(); // Fallback: use a placeholder userId
        }
        
        const userObj = { id: userId, username };
        setUser(userObj);
        setToken(data.token); // Set token in state
        localStorage.setItem('token', data.token); // Save token to localStorage
        localStorage.setItem('user', JSON.stringify(userObj)); // Save user to localStorage
        console.log(`AUTH_DEBUG: Welcome ${username}! Account created. Token and user saved.`);
        return true;
      } else {
        console.error(`AUTH_DEBUG: Sign up failed: ${data.message || "Username already exists"}`);
        return false;
      }
    } catch (error) {
      console.error("AUTH_DEBUG: Network error during sign up:", error);
      return false;
    } finally {
      setIsLoading(false);
      console.log("AUTH_DEBUG: Signup process finished. isLoading set to false.");
    }
  };

  /**
   * Handles user logout.
   */
  const logout = () => {
    console.log("AUTH_DEBUG: Logout initiated.");
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("AUTH_DEBUG: You have been successfully signed out. State and localStorage cleared.");
  };

  // Value provided by the AuthContext
  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};