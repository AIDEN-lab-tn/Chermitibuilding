import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Mail, Lock, AlertCircle, User, Shield, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import logo from '/public/logo.png';

// Mock users database
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@chermiti.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    apartmentNumber: null,
    floor: null,
    purchaseDate: null,
    status: 'Administrator'
  },
  {
    id: '2',
    email: 'john@example.com',
    password: 'user123',
    role: 'resident',
    name: 'John Smith',
    apartmentNumber: 'A-2501',
    floor: 25,
    purchaseDate: '2024-01-15',
    status: 'Owner'
  }
];

const LoginContent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock database
      const user = MOCK_USERS.find(u => 
        u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        setError('Invalid email or password. Please try again.');
        return;
      }

      // Store user data in localStorage (in real app, use proper auth)
      localStorage.setItem('userData', JSON.stringify(user));
      
      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/resident-dashboard');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-200 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1"></div>
              <img src={logo} alt="Chermiti Logo" className="h-12 w-auto object-contain bg-transparent border-none outline-none shadow-none" />
              <div className="flex-1 flex justify-end">
                <button
                  onClick={toggleTheme}
                  className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Chermiti Building
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sign in to access your dashboard
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
                </div>
              )}

              <div>
                <Label htmlFor="email" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <div className="text-center space-y-3">
                <button
                  type="button"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => alert('Password reset functionality coming soon!')}
                >
                  Forgot your password?
                </button>
                
                {/* Demo Credentials */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Demo Credentials:</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-3 w-3 text-red-500" />
                      <span className="text-gray-600 dark:text-gray-400">Admin: admin@chermiti.com / admin123</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-400">Resident: john@example.com / user123</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => navigate('/')}
                >
                  ← Back to Main Site
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <ThemeProvider>
      <LoginContent />
    </ThemeProvider>
  );
};

export default Login;