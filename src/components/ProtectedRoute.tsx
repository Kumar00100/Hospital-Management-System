import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  console.log('🛡️ ProtectedRoute check:', { 
    user, 
    isAuthenticated, 
    isLoading, 
    allowedRoles,
    userRole: user?.role 
  });

  // Show loading spinner while checking authentication
  if (isLoading) {
    console.log('⏳ ProtectedRoute: Loading...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Verifying Access</h2>
          <p className="text-gray-600">Please wait while we verify your credentials...</p>
        </div>
      </div>
    );
  }

  // User not authenticated - redirect to login
  if (!isAuthenticated) {
    console.log('❌ ProtectedRoute: User not authenticated');
    return <Navigate to="/" replace />;
  }

  // User authenticated but role not allowed
  if (!user || !allowedRoles.includes(user.role)) {
    console.log('⚠️ ProtectedRoute: Insufficient permissions', { userRole: user?.role, allowedRoles });
    
    // Redirect to appropriate dashboard based on user role
    switch (user?.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'doctor':
        return <Navigate to="/doctor/dashboard" replace />;
      case 'staff':
        return <Navigate to="/staff/dashboard" replace />;
      case 'patient':
        return <Navigate to="/patient/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // User authenticated and has required role - render the protected content
  console.log('✅ ProtectedRoute: Access granted for', user.role);
  return <>{children}</>;
};
