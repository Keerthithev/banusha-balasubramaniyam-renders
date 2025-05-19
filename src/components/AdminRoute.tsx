
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '@/services/AuthService';
import { toast } from 'sonner';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access the admin dashboard");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
