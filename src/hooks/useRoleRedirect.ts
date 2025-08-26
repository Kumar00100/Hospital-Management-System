import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useRoleRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Role Redirect - isAuthenticated:', isAuthenticated, 'user:', user); // Debug log
    if (isAuthenticated && user) {
      // Add a small delay to ensure authentication state is fully updated
      // before navigating, so the navigation component shows correct buttons
      const timer = setTimeout(() => {
        // Redirect users to their respective dashboards based on role
        switch (user.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'doctor':
            navigate('/doctor/dashboard');
            break;
          case 'staff':
            navigate('/staff/dashboard');
            break;
          case 'patient':
            navigate('/patient/dashboard');
            break;
          default:
            navigate('/');
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, navigate]);

  return { user, isAuthenticated };
};
