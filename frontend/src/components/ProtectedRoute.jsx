const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
  
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-lg text-gray-700">Loading...</p>
        </div>
      );
    }
  
    return user ? <>{children}</> : <Navigate to="/signin" replace />;
  };
  