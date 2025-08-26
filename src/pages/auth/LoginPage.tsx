import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user.types';
import { Hospital, LogIn } from 'lucide-react';

interface LoginPageProps {
  role: UserRole;
  title: string;
  description: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ role, title, description }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password, role);
      if (success) {
        console.log('Login successful, redirecting to home...');
        navigate('/'); // ✅ Redirect all users to home page
      } else {
        setError('Invalid credentials or role mismatch');
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const getTestCredentials = () => {
    const testUsers = {
      admin: { email: 'admin@hospital.com', password: 'admin123' },
      doctor: { email: 'dr.smith@hospital.com', password: 'doctor123' },
      staff: { email: 'staff@hospital.com', password: 'staff123' },
      patient: { email: 'patient1@email.com', password: 'patient123' },
    };
    return testUsers[role] || { email: '', password: '' };
  };

  const handleTestLogin = () => {
    const credentials = getTestCredentials();
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Hospital className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleTestLogin}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Use Test Account
            </Button>
          </form>
          
          {role === 'patient' && (
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => navigate('/register')}
              >
                Don't have an account? Register here
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
