import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { 
  Building2, 
  User, 
  Bell, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Home,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Sun,
  Moon,
  CreditCard,
  FileText,
  TrendingUp,
  Download,
  Eye,
  DollarSign,
  Calendar as CalendarIcon,
  Target
} from 'lucide-react';
import logo from '/public/logo.png';

const ResidentDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [supportMessage, setSupportMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role !== 'resident') {
        navigate('/login');
        return;
      }
      setUserData(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  // Mock data for demonstration
  const apartmentUpdates = [
    {
      id: 1,
      date: '2024-12-15',
      title: 'Elevator Maintenance Completed',
      description: 'All elevators have been serviced and are operating normally.',
      type: 'maintenance',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-12-10',
      title: 'New Gym Equipment Installed',
      description: 'State-of-the-art fitness equipment has been added to the rooftop gym.',
      type: 'amenity',
      status: 'new'
    },
    {
      id: 3,
      date: '2024-12-05',
      title: 'Security System Upgrade',
      description: 'Enhanced facial recognition system installed at main entrance.',
      type: 'security',
      status: 'completed'
    }
  ];

  const announcements = [
    {
      id: 1,
      date: '2024-12-18',
      title: 'Holiday Building Hours',
      content: 'Please note that concierge services will have modified hours during the holiday season.',
      priority: 'high'
    },
    {
      id: 2,
      date: '2024-12-12',
      title: 'Rooftop Garden Opening',
      content: 'The new rooftop garden is now open for all residents to enjoy. Access via elevator to floor 60.',
      priority: 'medium'
    },
    {
      id: 3,
      date: '2024-12-08',
      title: 'Parking Garage Cleaning',
      content: 'Monthly deep cleaning of parking garage scheduled for this weekend.',
      priority: 'low'
    }
  ];

  // Progress tracking data
  const progressData = {
    overall: 75,
    phases: [
      { name: 'Foundation', progress: 100, status: 'completed' },
      { name: 'Structure', progress: 100, status: 'completed' },
      { name: 'Interior Work', progress: 85, status: 'in-progress' },
      { name: 'Finishing', progress: 45, status: 'in-progress' },
      { name: 'Final Inspection', progress: 0, status: 'pending' }
    ],
    milestones: [
      { date: '2024-01-15', title: 'Construction Started', completed: true },
      { date: '2024-06-20', title: 'Structure Completed', completed: true },
      { date: '2024-11-30', title: 'Interior 80% Complete', completed: true },
      { date: '2025-03-15', title: 'Expected Completion', completed: false },
      { date: '2025-04-01', title: 'Move-in Ready', completed: false }
    ]
  };

  // Payment data
  const paymentData = {
    totalAmount: 850000,
    paidAmount: 637500,
    remainingAmount: 212500,
    nextPayment: {
      amount: 42500,
      dueDate: '2025-01-15'
    },
    paymentHistory: [
      { date: '2024-01-15', amount: 170000, type: 'Down Payment', status: 'paid' },
      { date: '2024-04-15', amount: 85000, type: 'Quarterly Payment', status: 'paid' },
      { date: '2024-07-15', amount: 85000, type: 'Quarterly Payment', status: 'paid' },
      { date: '2024-10-15', amount: 85000, type: 'Quarterly Payment', status: 'paid' },
      { date: '2024-12-15', amount: 212500, type: 'Progress Payment', status: 'paid' },
      { date: '2025-01-15', amount: 42500, type: 'Quarterly Payment', status: 'pending' },
      { date: '2025-04-15', amount: 170000, type: 'Final Payment', status: 'pending' }
    ]
  };

  // Documents data
  const documentsData = [
    { id: 1, name: 'Purchase Agreement', type: 'Contract', date: '2024-01-15', size: '2.4 MB' },
    { id: 2, name: 'Floor Plans - Unit A-2501', type: 'Blueprint', date: '2024-01-20', size: '5.1 MB' },
    { id: 3, name: 'Building Specifications', type: 'Technical', date: '2024-02-01', size: '8.7 MB' },
    { id: 4, name: 'Interior Design Options', type: 'Design', date: '2024-02-15', size: '12.3 MB' },
    { id: 5, name: 'Payment Schedule', type: 'Financial', date: '2024-01-15', size: '1.2 MB' },
    { id: 6, name: 'Building Amenities Guide', type: 'Information', date: '2024-03-01', size: '6.8 MB' }
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return <Settings className="h-4 w-4" />;
      case 'amenity': return <Home className="h-4 w-4" />;
      case 'security': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
      case 'low': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support request submitted successfully! We will get back to you within 24 hours.');
    setSupportMessage('');
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'gradient-bg-dark' : 'gradient-bg-light'}`}>
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/90 glass-effect shadow-lg border-b border-blue-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={logo} alt="Chermiti Logo" className="h-10 w-auto md:h-12 md:w-auto object-contain p-0 bg-transparent border-none outline-none shadow-none" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resident Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {userData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 border-blue-200 dark:border-gray-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-white">
                  <User className="h-5 w-5" />
                  <span>Navigation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === 'overview' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === 'progress' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'progress' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('progress')}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Progress Tracker
                </Button>
                <Button
                  variant={activeTab === 'payments' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'payments' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('payments')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payments
                </Button>
                <Button
                  variant={activeTab === 'documents' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'documents' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('documents')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </Button>
                <Button
                  variant={activeTab === 'updates' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'updates' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('updates')}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Updates
                </Button>
                <Button
                  variant={activeTab === 'announcements' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'announcements' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('announcements')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Announcements
                </Button>
                <Button
                  variant={activeTab === 'support' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'support' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('support')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Support
                </Button>
              </CardContent>
            </Card>

            {/* Apartment Info */}
            <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-white">Your Apartment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Unit:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{userData.apartmentNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Floor:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{userData.floor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">{userData.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Since:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{userData.purchaseDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Construction Progress</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.overall}%</p>
                        </div>
                        <Target className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Amount Paid</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">${(paymentData.paidAmount / 1000).toFixed(0)}K</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Next Payment</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">${(paymentData.nextPayment.amount / 1000).toFixed(0)}K</p>
                        </div>
                        <CalendarIcon className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Overview */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Welcome to Your Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Stay connected with your luxury residence. Here you can track construction progress, 
                      manage payments, access important documents, and stay updated with the latest announcements.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <Target className="h-8 w-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Progress</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Track construction</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <CreditCard className="h-8 w-8 text-green-600 mb-2" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Payments</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Manage finances</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <FileText className="h-8 w-8 text-purple-600 mb-2" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Documents</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Access files</p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <Bell className="h-8 w-8 text-orange-600 mb-2" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Updates</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Latest news</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                {/* Overall Progress */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Construction Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Overall Progress</span>
                        <span className="text-2xl font-bold text-blue-600">{progressData.overall}%</span>
                      </div>
                      <Progress value={progressData.overall} className="h-3" />
                    </div>

                    {/* Phase Progress */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Construction Phases</h3>
                      {progressData.phases.map((phase, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">{phase.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold">{phase.progress}%</span>
                              <Badge className={
                                phase.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }>
                                {phase.status}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={phase.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Milestones */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Project Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {progressData.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`w-4 h-4 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${milestone.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                {milestone.title}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{milestone.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                {/* Payment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">${paymentData.totalAmount.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Amount Paid</p>
                        <p className="text-2xl font-bold text-green-600">${paymentData.paidAmount.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                        <p className="text-2xl font-bold text-orange-600">${paymentData.remainingAmount.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Progress */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Payment Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Payment Completion</span>
                        <span className="text-sm font-semibold">{Math.round((paymentData.paidAmount / paymentData.totalAmount) * 100)}%</span>
                      </div>
                      <Progress value={(paymentData.paidAmount / paymentData.totalAmount) * 100} className="h-3" />
                    </div>
                    
                    {/* Next Payment */}
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Next Payment Due</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-orange-600">${paymentData.nextPayment.amount.toLocaleString()}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Due: {paymentData.nextPayment.dueDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment History */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3 text-gray-900 dark:text-white">Date</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Type</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Amount</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paymentData.paymentHistory.map((payment, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="p-3 text-gray-800 dark:text-gray-300">{payment.date}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">{payment.type}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">${payment.amount.toLocaleString()}</td>
                              <td className="p-3">
                                <Badge className={payment.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'}>
                                  {payment.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Document Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documentsData.map((doc) => (
                        <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <FileText className="h-8 w-8 text-blue-600 mt-1" />
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{doc.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{doc.type}</p>
                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                  <span>{doc.date}</span>
                                  <span>{doc.size}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'updates' && (
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Apartment Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {apartmentUpdates.map((update) => (
                        <div key={update.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                {getStatusIcon(update.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{update.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{update.description}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Clock className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{update.date}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={update.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}>
                              {update.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Building Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.map((announcement) => (
                        <div key={announcement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{announcement.content}</p>
                              <div className="flex items-center space-x-2 mt-3">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{announcement.date}</span>
                              </div>
                            </div>
                            <Badge className={getPriorityColor(announcement.priority)}>
                              {announcement.priority} priority
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Contact Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Quick Contact</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-800 dark:text-gray-300">24/7 Concierge: +1 (555) 123-4567</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-800 dark:text-gray-300">support@chermitibuilding.com</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-800 dark:text-gray-300">Emergency: +1 (555) 911-HELP</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Support Hours</h3>
                        <div className="text-sm space-y-1 text-gray-800 dark:text-gray-300">
                          <p>Concierge: 24/7</p>
                          <p>Maintenance: Mon-Fri 8AM-6PM</p>
                          <p>Management: Mon-Fri 9AM-5PM</p>
                          <p>Emergency: 24/7</p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSupportSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="subject" className="text-gray-900 dark:text-blue-300 font-semibold">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Brief description of your request"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-gray-900 dark:text-blue-300 font-semibold">Message</Label>
                        <Textarea
                          id="message"
                          value={supportMessage}
                          onChange={(e) => setSupportMessage(e.target.value)}
                          placeholder="Please describe your request or issue in detail..."
                          rows={4}
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-1"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Submit Support Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResidentDashboard = () => {
  return (
    <ThemeProvider>
      <ResidentDashboardContent />
    </ThemeProvider>
  );
};

export default ResidentDashboard;