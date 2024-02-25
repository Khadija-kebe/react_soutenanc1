import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { accountService } from './path-to-your-account-service'; // Adjust the path accordingly

const ProtectedRoute = ({ element, path }) => {
  const isUserAdmin = accountService.getUserProfile() === 'admin';
  
  return isUserAdmin ? <Route path={path} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
