import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const token = localStorage.getItem('access_token');

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  return children;  // Allow access if authenticated
};

export default ProtectedRoute;
