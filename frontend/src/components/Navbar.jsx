import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Wallet, LogOut, User } from 'lucide-react';
import { Button } from './Button'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 
     opacity-90 shadow-sm sticky top-0 z-50 py-3 sm:py-4"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-auto"> 
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3"> 
            <Wallet className="h-7 w-7 sm:h-8 sm:w-8 text-white bg-gradient-to-br 
            from-blue-500 to-purple-600 rounded-lg p-1" /> 
            <span className="text-xl sm:text-2xl font-bold text-white">VirtualPay</span> 
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-4"> 
            {user ? (
              <>
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-2 bg-gray-50 rounded-lg"> 
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" /> 
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{user.username}</span> 
                </div>
                <Button 
                  onClick={handleLogout} 
                  size="sm"
                  className="flex items-center border border-input bg-background hover:bg-accent hover:text-accent-foreground" 
                >
                  <LogOut className="h-4 w-4 mr-1 sm:mr-2" /> 
                  <span className="hidden sm:inline">Sign Out</span> 
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button 
                    size="sm" 
                    className="text-sm" 
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="sm" 
                    className="text-sm" 
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
