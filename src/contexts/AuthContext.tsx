import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserRole } from '@/types/user.types';
import apiService from '@/services/api';

// Define the user type that matches the backend response
interface BackendUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registrationNumber: string;
  mobile: string;
}

interface LoginResponse {
  token: string;
  user: BackendUser;
}

interface AuthContextType {
  user: BackendUser | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionTimeout: number | null;
  refreshSession: () => void;
  checkSessionValidity: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState<number | null>(null);

  const checkSessionValidity = (): boolean => {
    if (!sessionTimeout) return false;
    return Date.now() < sessionTimeout;
  };

  const refreshSession = () => {
    if (sessionTimeout && Date.now() < sessionTimeout) {
      const newTimeout = Date.now() + SESSION_DURATION;
      setSessionTimeout(newTimeout);
      localStorage.setItem('hms-session-timeout', newTimeout.toString());
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for existing session
        const storedUser = localStorage.getItem('hms-user');
        const storedTimeout = localStorage.getItem('hms-session-timeout');
        const storedToken = localStorage.getItem('hms-token');

        if (storedUser && storedTimeout && storedToken) {
          const timeout = parseInt(storedTimeout);
          
          if (Date.now() < timeout) {
            // Session is valid, restore user
            const userData = JSON.parse(storedUser) as BackendUser;
            setUser(userData);
            setSessionTimeout(timeout);
            console.log('✅ Session restored for:', userData.name);
          } else {
            // Session expired, clear storage
            console.log('⏰ Session expired, clearing storage');
            localStorage.removeItem('hms-user');
            localStorage.removeItem('hms-session-timeout');
            localStorage.removeItem('hms-token');
          }
        } else if (storedToken) {
          // Try to get current user from API
          try {
            const response = await apiService.getCurrentUser();
            if (response.data) {
              const userData = response.data as BackendUser;
              setUser(userData);
              
              // Set new session timeout
              const timeout = Date.now() + SESSION_DURATION;
              setSessionTimeout(timeout);
              localStorage.setItem('hms-session-timeout', timeout.toString());
              localStorage.setItem('hms-user', JSON.stringify(userData));
              
              console.log('✅ User restored from API:', userData.name);
            }
          } catch (error) {
            console.log('❌ Failed to restore user from API, clearing token');
            localStorage.removeItem('hms-token');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear any corrupted data
        localStorage.removeItem('hms-user');
        localStorage.removeItem('hms-session-timeout');
        localStorage.removeItem('hms-token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      console.log('🔐 Login attempt:', { email, role });
      
      const response = await apiService.login(email, password, role);
      
      if (response.error) {
        console.log('❌ Login failed:', response.error);
        return false;
      }

      if (response.data) {
        const loginData = response.data as LoginResponse;
        const { token, user: userData } = loginData;
        
        console.log('✅ Login successful for:', userData.name, 'with role:', userData.role);
        
        // Store token
        console.log('Storing token:', token);
        localStorage.setItem('hms-token', token);
        
        // Set session timeout
        const timeout = Date.now() + SESSION_DURATION;
        
        setUser(userData);
        setSessionTimeout(timeout);
        
        // Store in localStorage
        localStorage.setItem('hms-user', JSON.stringify(userData));
        localStorage.setItem('hms-session-timeout', timeout.toString());
        localStorage.setItem('hms-login-time', Date.now().toString());
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setSessionTimeout(null);
    
    // Clear all auth-related storage
    localStorage.removeItem('hms-user');
    localStorage.removeItem('hms-session-timeout');
    localStorage.removeItem('hms-login-time');
    localStorage.removeItem('hms-token');
    
    // Clear any other session data
    sessionStorage.clear();
    
    // Force page reload to clear any cached state
    window.location.href = '/';
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user && checkSessionValidity(),
    isLoading,
    sessionTimeout,
    refreshSession,
    checkSessionValidity,
  };

  // Debug logging
  useEffect(() => {
    console.log('🔍 AuthContext State:', {
      user: user ? { id: user.id, email: user.email, role: user.role, name: user.name } : null,
      isAuthenticated: !!user && checkSessionValidity(),
      isLoading,
      sessionTimeout: sessionTimeout ? new Date(sessionTimeout).toLocaleString() : null
    });
  }, [user, isLoading, sessionTimeout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
