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
  Users, 
  Bell, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Home,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  BarChart3,
  DollarSign,
  TrendingUp,
  Sun,
  Moon,
  UserPlus,
  Building,
  Target,
  CreditCard,
  Search,
  Filter,
  Eye,
  MapPin
} from 'lucide-react';
import logo from '/public/logo.png';

const AdminDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Mock data for admin dashboard
  const [residents, setResidents] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      apartmentNumber: 'A-2501',
      floor: 25,
      status: 'Owner',
      purchaseDate: '2024-01-15',
      paymentStatus: 'Current',
      totalAmount: 850000,
      paidAmount: 637500,
      phone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      apartmentNumber: 'B-1203',
      floor: 12,
      status: 'Owner',
      purchaseDate: '2024-03-20',
      paymentStatus: 'Current',
      totalAmount: 750000,
      paidAmount: 562500,
      phone: '+1 (555) 234-5678'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      apartmentNumber: 'C-3401',
      floor: 34,
      status: 'Renter',
      purchaseDate: '2024-06-10',
      paymentStatus: 'Overdue',
      totalAmount: 920000,
      paidAmount: 460000,
      phone: '+1 (555) 345-6789'
    }
  ]);

  const [apartments, setApartments] = useState([
    { id: '1', number: 'A-2501', floor: 25, type: 'Penthouse', size: '3500 sq ft', status: 'Sold', price: 850000, resident: 'John Smith' },
    { id: '2', number: 'B-1203', floor: 12, type: 'Luxury', size: '2800 sq ft', status: 'Sold', price: 750000, resident: 'Sarah Johnson' },
    { id: '3', number: 'C-3401', floor: 34, type: 'Premium', size: '3200 sq ft', status: 'Sold', price: 920000, resident: 'Mike Wilson' },
    { id: '4', number: 'A-4502', floor: 45, type: 'Penthouse', size: '4000 sq ft', status: 'Available', price: 1200000, resident: null },
    { id: '5', number: 'B-2304', floor: 23, type: 'Luxury', size: '2600 sq ft', status: 'Reserved', price: 680000, resident: null }
  ]);

  const [progressUpdates, setProgressUpdates] = useState([
    {
      id: 1,
      apartmentId: '1',
      apartmentNumber: 'A-2501',
      phase: 'Interior Finishing',
      progress: 85,
      lastUpdate: '2024-12-15',
      notes: 'Kitchen installation completed, bathroom fixtures in progress'
    },
    {
      id: 2,
      apartmentId: '2',
      apartmentNumber: 'B-1203',
      phase: 'Final Inspection',
      progress: 95,
      lastUpdate: '2024-12-14',
      notes: 'Minor touch-ups required, expected completion next week'
    }
  ]);

  const [updates, setUpdates] = useState([
    {
      id: 1,
      date: '2024-12-15',
      title: 'Elevator Maintenance Completed',
      description: 'All elevators have been serviced and are operating normally.',
      type: 'maintenance',
      status: 'published'
    },
    {
      id: 2,
      date: '2024-12-10',
      title: 'New Gym Equipment Installed',
      description: 'State-of-the-art fitness equipment has been added to the rooftop gym.',
      type: 'amenity',
      status: 'published'
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      date: '2024-12-18',
      title: 'Holiday Building Hours',
      content: 'Please note that concierge services will have modified hours during the holiday season.',
      priority: 'high',
      status: 'active'
    },
    {
      id: 2,
      date: '2024-12-12',
      title: 'Rooftop Garden Opening',
      content: 'The new rooftop garden is now open for all residents to enjoy.',
      priority: 'medium',
      status: 'active'
    }
  ]);

  const [newResident, setNewResident] = useState({
    name: '',
    email: '',
    phone: '',
    apartmentId: ''
  });

  const [newApartment, setNewApartment] = useState({
    number: '',
    floor: '',
    type: 'Luxury',
    size: '',
    price: ''
  });

  const [newUpdate, setNewUpdate] = useState({
    title: '',
    description: '',
    type: 'maintenance'
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium'
  });

  const [newProgressUpdate, setNewProgressUpdate] = useState({
    apartmentId: '',
    phase: '',
    progress: 0,
    notes: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role !== 'admin') {
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

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault();
    const resident = {
      id: Date.now().toString(),
      name: newResident.name,
      email: newResident.email,
      phone: newResident.phone,
      apartmentNumber: apartments.find(apt => apt.id === newResident.apartmentId)?.number || '',
      floor: apartments.find(apt => apt.id === newResident.apartmentId)?.floor || 0,
      status: 'Owner',
      purchaseDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'Current',
      totalAmount: apartments.find(apt => apt.id === newResident.apartmentId)?.price || 0,
      paidAmount: 0
    };
    setResidents([...residents, resident]);
    
    // Update apartment status
    setApartments(apartments.map(apt => 
      apt.id === newResident.apartmentId 
        ? { ...apt, status: 'Sold', resident: newResident.name }
        : apt
    ));
    
    setNewResident({ name: '', email: '', phone: '', apartmentId: '' });
    alert('Resident added successfully!');
  };

  const handleAddApartment = (e: React.FormEvent) => {
    e.preventDefault();
    const apartment = {
      id: Date.now().toString(),
      number: newApartment.number,
      floor: parseInt(newApartment.floor),
      type: newApartment.type,
      size: newApartment.size,
      status: 'Available',
      price: parseInt(newApartment.price),
      resident: null
    };
    setApartments([...apartments, apartment]);
    setNewApartment({ number: '', floor: '', type: 'Luxury', size: '', price: '' });
    alert('Apartment added successfully!');
  };

  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const update = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newUpdate.title,
      description: newUpdate.description,
      type: newUpdate.type,
      status: 'published'
    };
    setUpdates([update, ...updates]);
    setNewUpdate({ title: '', description: '', type: 'maintenance' });
    alert('Update published successfully!');
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const announcement = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      priority: newAnnouncement.priority,
      status: 'active'
    };
    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: '', content: '', priority: 'medium' });
    alert('Announcement published successfully!');
  };

  const handleAddProgressUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const apartment = apartments.find(apt => apt.id === newProgressUpdate.apartmentId);
    const update = {
      id: Date.now(),
      apartmentId: newProgressUpdate.apartmentId,
      apartmentNumber: apartment?.number || '',
      phase: newProgressUpdate.phase,
      progress: newProgressUpdate.progress,
      lastUpdate: new Date().toISOString().split('T')[0],
      notes: newProgressUpdate.notes
    };
    setProgressUpdates([update, ...progressUpdates]);
    setNewProgressUpdate({ apartmentId: '', phase: '', progress: 0, notes: '' });
    alert('Progress update added successfully!');
  };

  const deleteUpdate = (id: number) => {
    setUpdates(updates.filter(update => update.id !== id));
    alert('Update deleted successfully!');
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    alert('Announcement deleted successfully!');
  };

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

  const getApartmentStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Sold': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Reserved': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
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
                  <Settings className="h-5 w-5" />
                  <span>Admin Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === 'overview' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === 'property-management' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'property-management' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('property-management')}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Property Management
                </Button>
                <Button
                  variant={activeTab === 'client-management' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'client-management' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('client-management')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Client Management
                </Button>
                <Button
                  variant={activeTab === 'progress-updates' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'progress-updates' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('progress-updates')}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Progress Updates
                </Button>
                <Button
                  variant={activeTab === 'payment-management' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'payment-management' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('payment-management')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Management
                </Button>
                <Button
                  variant={activeTab === 'updates' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'updates' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('updates')}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Manage Updates
                </Button>
                <Button
                  variant={activeTab === 'announcements' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'announcements' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('announcements')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Announcements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Apartments</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{apartments.length}</p>
                        </div>
                        <Building className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Residents</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{residents.length}</p>
                        </div>
                        <Users className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Available Units</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{apartments.filter(apt => apt.status === 'Available').length}</p>
                        </div>
                        <Home className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">$2.4M</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Bell className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-gray-800 dark:text-gray-300">New update published: Elevator Maintenance</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Users className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-800 dark:text-gray-300">New resident registered: Sarah Johnson</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="text-sm text-gray-800 dark:text-gray-300">Holiday announcement published</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Occupancy Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {Math.round((apartments.filter(apt => apt.status === 'Sold').length / apartments.length) * 100)}%
                      </div>
                      <Progress value={(apartments.filter(apt => apt.status === 'Sold').length / apartments.length) * 100} className="h-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {apartments.filter(apt => apt.status === 'Sold').length} of {apartments.length} units occupied
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Payment Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Current</span>
                          <span className="text-sm font-semibold text-green-600">{residents.filter(r => r.paymentStatus === 'Current').length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Overdue</span>
                          <span className="text-sm font-semibold text-red-600">{residents.filter(r => r.paymentStatus === 'Overdue').length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'property-management' && (
              <div className="space-y-6">
                {/* Add New Apartment */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                      <Plus className="h-5 w-5" />
                      <span>Add New Apartment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddApartment} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="apartmentNumber" className="text-gray-900 dark:text-blue-300 font-semibold">Apartment Number</Label>
                        <Input
                          id="apartmentNumber"
                          value={newApartment.number}
                          onChange={(e) => setNewApartment({...newApartment, number: e.target.value})}
                          placeholder="e.g., A-2501"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="floor" className="text-gray-900 dark:text-blue-300 font-semibold">Floor</Label>
                        <Input
                          id="floor"
                          type="number"
                          value={newApartment.floor}
                          onChange={(e) => setNewApartment({...newApartment, floor: e.target.value})}
                          placeholder="25"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="type" className="text-gray-900 dark:text-blue-300 font-semibold">Type</Label>
                        <select
                          id="type"
                          value={newApartment.type}
                          onChange={(e) => setNewApartment({...newApartment, type: e.target.value})}
                          className="w-full p-2 border border-gray-400 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-2"
                        >
                          <option value="Luxury">Luxury</option>
                          <option value="Premium">Premium</option>
                          <option value="Penthouse">Penthouse</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="size" className="text-gray-900 dark:text-blue-300 font-semibold">Size</Label>
                        <Input
                          id="size"
                          value={newApartment.size}
                          onChange={(e) => setNewApartment({...newApartment, size: e.target.value})}
                          placeholder="2800 sq ft"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price" className="text-gray-900 dark:text-blue-300 font-semibold">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newApartment.price}
                          onChange={(e) => setNewApartment({...newApartment, price: e.target.value})}
                          placeholder="750000"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Add Apartment
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Apartments List */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Apartment Inventory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3 text-gray-900 dark:text-white">Unit</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Floor</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Type</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Size</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Price</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Status</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Resident</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {apartments.map((apartment) => (
                            <tr key={apartment.id} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="p-3 text-gray-800 dark:text-gray-300">{apartment.number}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">{apartment.floor}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">{apartment.type}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">{apartment.size}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">${apartment.price.toLocaleString()}</td>
                              <td className="p-3">
                                <Badge className={getApartmentStatusColor(apartment.status)}>
                                  {apartment.status}
                                </Badge>
                              </td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">{apartment.resident || '-'}</td>
                              <td className="p-3">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </div>
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

            {activeTab === 'client-management' && (
              <div className="space-y-6">
                {/* Add New Resident */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                      <UserPlus className="h-5 w-5" />
                      <span>Add New Resident</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddResident} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="residentName" className="text-gray-900 dark:text-blue-300 font-semibold">Full Name</Label>
                        <Input
                          id="residentName"
                          value={newResident.name}
                          onChange={(e) => setNewResident({...newResident, name: e.target.value})}
                          placeholder="John Smith"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="residentEmail" className="text-gray-900 dark:text-blue-300 font-semibold">Email</Label>
                        <Input
                          id="residentEmail"
                          type="email"
                          value={newResident.email}
                          onChange={(e) => setNewResident({...newResident, email: e.target.value})}
                          placeholder="john@example.com"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="residentPhone" className="text-gray-900 dark:text-blue-300 font-semibold">Phone</Label>
                        <Input
                          id="residentPhone"
                          value={newResident.phone}
                          onChange={(e) => setNewResident({...newResident, phone: e.target.value})}
                          placeholder="+1 (555) 123-4567"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="assignApartment" className="text-gray-900 dark:text-blue-300 font-semibold">Assign Apartment</Label>
                        <select
                          id="assignApartment"
                          value={newResident.apartmentId}
                          onChange={(e) => setNewResident({...newResident, apartmentId: e.target.value})}
                          className="w-full p-2 border border-gray-400 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-2"
                          required
                        >
                          <option value="">Select Apartment</option>
                          {apartments.filter(apt => apt.status === 'Available').map(apt => (
                            <option key={apt.id} value={apt.id}>
                              {apt.number} - {apt.type} (${apt.price.toLocaleString()})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Add Resident
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Residents List */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Resident Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3 text-gray-900 dark:text-white">Name</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Email</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Phone</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Apartment</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Status</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Payment</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {residents.map((resident) => (
                            <tr key={resident.id} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="p-3 text-gray-800 dark:text-gray-300">{resident.name}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">{resident.email}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">{resident.phone}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">{resident.apartmentNumber}</td>
                              <td className="p-3">
                                <Badge className={resident.status === 'Owner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}>
                                  {resident.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Badge className={resident.paymentStatus === 'Current' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}>
                                  {resident.paymentStatus}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600">
                                    <MessageSquare className="h-3 w-3" />
                                  </Button>
                                </div>
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

            {activeTab === 'progress-updates' && (
              <div className="space-y-6">
                {/* Add Progress Update */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                      <Plus className="h-5 w-5" />
                      <span>Add Progress Update</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddProgressUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="progressApartment" className="text-gray-900 dark:text-blue-300 font-semibold">Apartment</Label>
                          <select
                            id="progressApartment"
                            value={newProgressUpdate.apartmentId}
                            onChange={(e) => setNewProgressUpdate({...newProgressUpdate, apartmentId: e.target.value})}
                            className="w-full p-2 border border-gray-400 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-2"
                            required
                          >
                            <option value="">Select Apartment</option>
                            {apartments.map(apt => (
                              <option key={apt.id} value={apt.id}>
                                {apt.number} - {apt.type}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="progressPhase" className="text-gray-900 dark:text-blue-300 font-semibold">Construction Phase</Label>
                          <Input
                            id="progressPhase"
                            value={newProgressUpdate.phase}
                            onChange={(e) => setNewProgressUpdate({...newProgressUpdate, phase: e.target.value})}
                            placeholder="e.g., Interior Finishing"
                            className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="progressPercent" className="text-gray-900 dark:text-blue-300 font-semibold">Progress Percentage</Label>
                        <Input
                          id="progressPercent"
                          type="number"
                          min="0"
                          max="100"
                          value={newProgressUpdate.progress}
                          onChange={(e) => setNewProgressUpdate({...newProgressUpdate, progress: parseInt(e.target.value)})}
                          placeholder="85"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="progressNotes" className="text-gray-900 dark:text-blue-300 font-semibold">Notes</Label>
                        <Textarea
                          id="progressNotes"
                          value={newProgressUpdate.notes}
                          onChange={(e) => setNewProgressUpdate({...newProgressUpdate, notes: e.target.value})}
                          placeholder="Detailed progress notes..."
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          rows={3}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Add Progress Update
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Progress Updates List */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Construction Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {progressUpdates.map((update) => (
                        <div key={update.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{update.apartmentNumber}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{update.phase}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-blue-600">{update.progress}%</span>
                              <p className="text-xs text-gray-500">{update.lastUpdate}</p>
                            </div>
                          </div>
                          <Progress value={update.progress} className="h-2 mb-3" />
                          <p className="text-sm text-gray-800 dark:text-gray-300">{update.notes}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'payment-management' && (
              <div className="space-y-6">
                {/* Payment Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                        <p className="text-2xl font-bold text-green-600">
                          ${residents.reduce((sum, r) => sum + r.paidAmount, 0).toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding</p>
                        <p className="text-2xl font-bold text-orange-600">
                          ${residents.reduce((sum, r) => sum + (r.totalAmount - r.paidAmount), 0).toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Overdue Accounts</p>
                        <p className="text-2xl font-bold text-red-600">
                          {residents.filter(r => r.paymentStatus === 'Overdue').length}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Details */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Payment Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3 text-gray-900 dark:text-white">Resident</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Apartment</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Total Amount</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Paid Amount</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Remaining</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Status</th>
                            <th className="text-left p-3 text-gray-900 dark:text-white">Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {residents.map((resident) => (
                            <tr key={resident.id} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="p-3 text-gray-800 dark:text-gray-300">{resident.name}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">{resident.apartmentNumber}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">${resident.totalAmount.toLocaleString()}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">${resident.paidAmount.toLocaleString()}</td>
                              <td className="p-3 text-gray-800 dark:text-gray-300">${(resident.totalAmount - resident.paidAmount).toLocaleString()}</td>
                              <td className="p-3">
                                <Badge className={resident.paymentStatus === 'Current' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}>
                                  {resident.paymentStatus}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="w-24">
                                  <Progress value={(resident.paidAmount / resident.totalAmount) * 100} className="h-2" />
                                  <span className="text-xs text-gray-500">{Math.round((resident.paidAmount / resident.totalAmount) * 100)}%</span>
                                </div>
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

            {activeTab === 'updates' && (
              <div className="space-y-6">
                {/* Add New Update */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                      <Plus className="h-5 w-5" />
                      <span>Publish New Update</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="updateTitle" className="text-gray-900 dark:text-blue-300 font-semibold">Title</Label>
                        <Input
                          id="updateTitle"
                          value={newUpdate.title}
                          onChange={(e) => setNewUpdate({...newUpdate, title: e.target.value})}
                          placeholder="Update title"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="updateDescription" className="text-gray-900 dark:text-blue-300 font-semib old">Description</Label>
                        <Textarea
                          id="updateDescription"
                          value={newUpdate.description}
                          onChange={(e) => setNewUpdate({...newUpdate, description: e.target.value})}
                          placeholder="Update description"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="updateType" className="text-gray-900 dark:text-blue-300 font-semibold">Type</Label>
                        <select
                          id="updateType"
                          value={newUpdate.type}
                          onChange={(e) => setNewUpdate({...newUpdate, type: e.target.value})}
                          className="w-full p-2 border border-gray-400 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-2"
                        >
                          <option value="maintenance">Maintenance</option>
                          <option value="amenity">Amenity</option>
                          <option value="security">Security</option>
                        </select>
                      </div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Publish Update
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Existing Updates */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Published Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {updates.map((update) => (
                        <div key={update.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                {getStatusIcon(update.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{update.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{update.description}</p>
                                <span className="text-xs text-gray-500">{update.date}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600" onClick={() => deleteUpdate(update.id)}>
                                <Trash2 className="h-3 w-3" />
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

            {activeTab === 'announcements' && (
              <div className="space-y-6">
                {/* Add New Announcement */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                      <Plus className="h-5 w-5" />
                      <span>Create New Announcement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddAnnouncement} className="space-y-4">
                      <div>
                        <Label htmlFor="announcementTitle" className="text-gray-900 dark:text-blue-300 font-semibold">Title</Label>
                        <Input
                          id="announcementTitle"
                          value={newAnnouncement.title}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                          placeholder="Announcement title"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="announcementContent" className="text-gray-900 dark:text-blue-300 font-semibold">Content</Label>
                        <Textarea
                          id="announcementContent"
                          value={newAnnouncement.content}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                          placeholder="Announcement content"
                          className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                          rows={4}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="announcementPriority" className="text-gray-900 dark:text-blue-300 font-semibold">Priority</Label>
                        <select
                          id="announcementPriority"
                          value={newAnnouncement.priority}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                          className="w-full p-2 border border-gray-400 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-2"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                      </div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Publish Announcement
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Existing Announcements */}
                <Card className="bg-white/80 dark:bg-black/80 glass-effect border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Active Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.map((announcement) => (
                        <div key={announcement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{announcement.content}</p>
                              <span className="text-xs text-gray-500">{announcement.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(announcement.priority)}>
                                {announcement.priority}
                              </Badge>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" className="border-blue-200 dark:border-gray-600" onClick={() => deleteAnnouncement(announcement.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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

const AdminDashboard = () => {
  return (
    <ThemeProvider>
      <AdminDashboardContent />
    </ThemeProvider>
  );
};

export default AdminDashboard;