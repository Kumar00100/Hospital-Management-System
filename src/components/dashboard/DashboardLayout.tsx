import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LogOut, 
  User, 
  Calendar, 
  Users, 
  Stethoscope, 
  Settings, 
  Bell,
  Home,
  FileText,
  MessageSquare,
  BarChart3,
  Shield
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  const { user, logout, sessionTimeout, refreshSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  // Check session timeout and show warning
  useEffect(() => {
    if (sessionTimeout) {
      const timeLeft = sessionTimeout - Date.now();
      const warningThreshold = 5 * 60 * 1000; // 5 minutes

      if (timeLeft < warningThreshold && timeLeft > 0) {
        setShowSessionWarning(true);
      } else {
        setShowSessionWarning(false);
      }
    }
  }, [sessionTimeout]);

  // Auto-refresh session on user activity
  useEffect(() => {
    const handleUserActivity = () => {
      if (user) {
        refreshSession();
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [user, refreshSession]);

  const handleLogout = () => {
    logout();
  };

  const getNavigationItems = () => {
    if (!user) return [];

    const baseItems = [
      { name: 'Dashboard', href: `/${user.role}/dashboard`, icon: Home },
    ];

    switch (user.role) {
      case 'admin':
        return [
          ...baseItems,
          { name: 'Departments', href: '/admin/departments', icon: Users },
          { name: 'Doctors', href: '/admin/doctors', icon: Stethoscope },
          { name: 'Patients', href: '/admin/patients', icon: User },
          { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
          { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
          { name: 'Settings', href: '/admin/settings', icon: Settings },
        ];
      case 'doctor':
        return [
          ...baseItems,
          { name: 'My Schedule', href: '/doctor/schedule', icon: Calendar },
          { name: 'Patients', href: '/doctor/patients', icon: User },
          { name: 'Prescriptions', href: '/doctor/prescriptions', icon: FileText },
          { name: 'Messages', href: '/doctor/messages', icon: MessageSquare },
        ];
      case 'staff':
        return [
          ...baseItems,
          { name: 'Appointments', href: '/staff/appointments', icon: Calendar },
          { name: 'Patients', href: '/staff/patients', icon: User },
          { name: 'Messages', href: '/staff/messages', icon: MessageSquare },
        ];
      case 'patient':
        return [
          ...baseItems,
          { name: 'My Appointments', href: '/patient/appointments', icon: Calendar },
          { name: 'Medical Records', href: '/patient/records', icon: FileText },
          { name: 'Messages', href: '/patient/messages', icon: MessageSquare },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'staff': return 'bg-green-100 text-green-800';
      case 'patient': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSessionTimeLeft = () => {
    if (!sessionTimeout) return '';
    const timeLeft = sessionTimeout - Date.now();
    if (timeLeft <= 0) return 'Expired';
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Vitalis Vista</h1>
                  <p className="text-sm text-gray-500">Hospital Management System</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Session Timer */}
              {sessionTimeout && (
                <div className="text-sm text-gray-600">
                  Session: {getSessionTimeLeft()}
                </div>
              )}

              {/* Notifications */}
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <Badge className={`w-fit ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(`/${user.role}/profile`)}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/${user.role}/settings`)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Session Warning */}
      {showSessionWarning && (
        <Alert className="mx-4 mt-4 bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-800">
            Your session will expire soon. Click anywhere to extend your session.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => navigate(item.href)}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                );
              })}
            </nav>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {description && (
              <p className="mt-2 text-gray-600">{description}</p>
            )}
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
