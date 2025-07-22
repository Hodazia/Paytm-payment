import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Wallet, LogOut, User } from 'lucide-react';
import { Button } from './Button'; // Assuming your Button component is responsive and accepts a 'size' prop

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 
     opacity-90 shadow-sm sticky top-0 z-50 py-3 sm:py-4"> {/* Removed h-18, added responsive vertical padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-auto"> {/* Removed fixed h-18, now height is determined by content and padding */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3"> {/* Adjusted space-x for mobile */}
            <Wallet className="h-7 w-7 sm:h-8 sm:w-8 text-white bg-gradient-to-br 
            from-blue-500 to-purple-600 rounded-lg p-1" /> {/* Adjusted icon size for mobile */}
            <span className="text-xl sm:text-2xl font-bold text-white">VirtualPay</span> {/* Adjusted font size for mobile */}
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-4"> {/* Adjusted space-x for mobile */}
            {user ? (
              <>
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-2 bg-gray-50 rounded-lg"> {/* Adjusted padding and space-x for mobile */}
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" /> {/* Adjusted icon size for mobile */}
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{user.username}</span> {/* Adjusted font size for mobile */}
                </div>
                <Button 
                  onClick={handleLogout} 
                  size="sm" // Use 'sm' size for mobile, 'default' for larger screens
                  className="flex items-center border border-input bg-background hover:bg-accent hover:text-accent-foreground" // Removed hardcoded px/py/h, let Button component manage it
                >
                  <LogOut className="h-4 w-4 mr-1 sm:mr-2" /> {/* Adjusted mr for mobile */}
                  <span className="hidden sm:inline">Sign Out</span> {/* Hide text on very small screens, show icon only */}
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button 
                    size="sm" // Use 'sm' size for mobile
                    className="text-sm" // Keep text-sm if desired, but size prop should handle overall dimensions
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="sm" // Use 'sm' size for mobile
                    className="text-sm" // Keep text-sm if desired
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
