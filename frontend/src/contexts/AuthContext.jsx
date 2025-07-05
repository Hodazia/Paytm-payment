import React, { createContext, useContext, useState, useEffect } from 'react';


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

  // Effect to load user and token from localStorage on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
        // Clear invalid storage if parsing fails
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);


  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/v1/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Extract userId from the token (JWT tokens contain user info)
        let userId = null;
        try {
          const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
          userId = tokenPayload.userId;
        } catch (e) {
          console.error("Failed to decode token:", e);
          // Fallback: use a placeholder userId
          userId = 'user_' + Date.now();
        }
        
        const userObj = { id: userId, username };
        setUser(userObj);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userObj));
        console.log(`Successfully signed in as ${username}`);
        return true;
      } else {
        console.error(`Sign in failed: ${data.message || "Invalid credentials"}`);
        return false;
      }
    } catch (error) {
      console.error("Network error during sign in:", error);
      return false;
    } finally {
      setIsLoading(false);
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
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstName, lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        // Extract userId from the token (JWT tokens contain user info)
        let userId = null;
        try {
          const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
          userId = tokenPayload.userId;
        } catch (e) {
          console.error("Failed to decode token:", e);
          // Fallback: use a placeholder userId
          userId = 'user_' + Date.now();
        }
        
        const userObj = { id: userId, username };
        setUser(userObj);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userObj));
        console.log(`Welcome ${username}! Your account has been created successfully.`);
        return true;
      } else {
        console.error(`Sign up failed: ${data.message || "Username already exists"}`);
        return false;
      }
    } catch (error) {
      console.error("Network error during sign up:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles user logout.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("You have been successfully signed out.");
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