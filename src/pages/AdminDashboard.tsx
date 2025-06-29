import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Moon
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
      paymentStatus: 'Current'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      apartmentNumber: 'B-1203',
      floor: 12,
      status: 'Owner',
      purchaseDate: '2024-03-20',
      paymentStatus: 'Current'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      apartmentNumber: 'C-3401',
      floor: 34,
      status: 'Renter',
      purchaseDate: '2024-06-10',
      paymentStatus: 'Overdue'
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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-200 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-blue-200 dark:border-gray-800">
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
            <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
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
                  variant={activeTab === 'residents' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'residents' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('residents')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Residents
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
                <Button
                  variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
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
                  <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Residents</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{residents.length}</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Active Updates</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{updates.length}</p>
                        </div>
                        <Bell className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Announcements</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{announcements.length}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">$2.4M</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
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
              </div>
            )}

            {activeTab === 'residents' && (
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
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

            {activeTab === 'updates' && (
              <div className="space-y-6">
                {/* Add New Update */}
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
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
                        <Label htmlFor="updateDescription" className="text-gray-900 dark:text-blue-300 font-semibold">Description</Label>
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
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
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
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
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
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
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

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-gray-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Building Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Occupancy Rate</h3>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">95%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">180 of 189 units occupied</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Monthly Revenue</h3>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">$2.4M</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">+12% from last month</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Maintenance Requests</h3>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">23</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">5 pending, 18 completed</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Satisfaction Score</h3>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">4.8/5</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Based on 156 reviews</div>
                        </div>
                      </div>
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