import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  Building2, 
  TrendingUp, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Settings,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import apiService from '@/services/api';
import { useAppointments } from '@/contexts/AppointmentsContext';

interface Appointment {
  id: string;
  patient_name: string;
  doctor_name: string;
  department_name: string;
  date: string;
  time: string;
  status: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 1247,
    totalDoctors: 89,
    totalAppointments: 342,
    totalDepartments: 12,
    pendingAppointments: 23,
    todayAppointments: 45,
    monthlyRevenue: 125000,
    activeUsers: 156
  });

  const { appointments, fetchAppointments } = useAppointments();
  const [recentRegistrations, setRecentRegistrations] = useState<User[]>([]);
  const [topDepartments, setTopDepartments] = useState([
    { name: 'Cardiology', appointments: 156, revenue: 45000, growth: '+12%' },
    { name: 'Neurology', appointments: 134, revenue: 38000, growth: '+8%' },
    { name: 'Orthopedics', appointments: 98, revenue: 28000, growth: '+15%' },
    { name: 'Pediatrics', appointments: 87, revenue: 22000, growth: '+5%' }
  ]);

  // Get the latest 5 appointments, sorted by date and time
  const recentAppointments = appointments
    .sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time);
      const dateB = new Date(b.date + 'T' + b.time);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 5);

  const fetchRecentRegistrations = async () => {
    try {
      const response = await apiService.getRecentRegistrations();
      if (response.data) {
        setRecentRegistrations(response.data as User[]);
      }
    } catch (error) {
      console.error('Error fetching recent registrations:', error);
      // Fallback to mock data if API fails
      setRecentRegistrations([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'patient', status: 'active', createdAt: '2024-01-15T10:00:00Z' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'doctor', status: 'active', createdAt: '2024-01-15T09:30:00Z' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'staff', status: 'active', createdAt: '2024-01-15T08:45:00Z' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'patient', status: 'active', createdAt: '2024-01-14T16:20:00Z' }
      ]);
    }
  };

  useEffect(() => {
    fetchRecentRegistrations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Hospital Management System Overview</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients.toLocaleString()}</div>
              <p className="text-xs text-blue-100">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              <Stethoscope className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDoctors}</div>
              <p className="text-xs text-green-100">+3 new this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs text-purple-100">{stats.pendingAppointments} pending</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(stats.monthlyRevenue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-orange-100">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="user-registration" onClick={() => window.location.href = '/user-dashboard'}>
              User Registration
            </TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Appointments */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Appointments
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={fetchAppointments}
                        className="flex items-center"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Refresh
                      </Button>
                      <Button variant="outline" size="sm">View All</Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {appointment.patient_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{appointment.patient_name}</p>
                            <p className="text-xs text-gray-500">{appointment.doctor_name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{appointment.time}</p>
                          <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1 capitalize">{appointment.status}</span>
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Registrations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Recent Registrations
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = '/user-dashboard'}
                      >
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentRegistrations.slice(0, 3).map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                            <Badge className={`text-xs ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              {/* Top Departments */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Top Performing Departments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topDepartments.map((dept, index) => (
                      <div key={dept.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{dept.name}</p>
                            <p className="text-sm text-gray-500">{dept.appointments} appointments</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${dept.revenue.toLocaleString()}</p>
                          <Badge variant="secondary" className="text-xs">{dept.growth}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Appointments</CardTitle>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search appointments..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      New Appointment
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patient_name}</TableCell>
                        <TableCell>{appointment.doctor_name}</TableCell>
                        <TableCell>{appointment.department_name}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{appointment.date}</p>
                            <p className="text-sm text-gray-500">{appointment.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1 capitalize">{appointment.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Department Management</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Department
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topDepartments.map((dept) => (
                    <Card key={dept.name} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{dept.name}</CardTitle>
                          <Building2 className="h-5 w-5 text-blue-500" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Appointments:</span>
                            <span className="font-medium">{dept.appointments}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Revenue:</span>
                            <span className="font-medium">${dept.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Growth:</span>
                            <Badge variant="secondary">{dept.growth}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <Button size="sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="text-center p-6">
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Patients</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalPatients}</p>
                    <p className="text-sm text-gray-500">Registered users</p>
                  </Card>
                  
                  <Card className="text-center p-6">
                    <Stethoscope className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Doctors</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.totalDoctors}</p>
                    <p className="text-sm text-gray-500">Medical staff</p>
                  </Card>
                  
                  <Card className="text-center p-6">
                    <Building2 className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Staff</h3>
                    <p className="text-3xl font-bold text-purple-600">45</p>
                    <p className="text-sm text-gray-500">Administrative</p>
                  </Card>
                  
                  <Card className="text-center p-6">
                    <Settings className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Admins</h3>
                    <p className="text-3xl font-bold text-orange-600">3</p>
                    <p className="text-sm text-gray-500">System managers</p>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Registration Tab */}
          <TabsContent value="user-registration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Registration Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced User Management</h3>
                  <p className="text-gray-600 mb-6">
                    Access the comprehensive user registration dashboard to manage all user accounts, 
                    view detailed statistics, and perform advanced user management operations.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => window.location.href = '/user-dashboard'}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Open User Registration Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <BarChart3 className="h-6 w-6 text-blue-500" />
                      <h3 className="text-lg font-semibold">Revenue Analytics</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>This Month</span>
                        <span className="font-medium">${stats.monthlyRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Month</span>
                        <span className="font-medium">$115,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth</span>
                        <Badge variant="secondary">+8.7%</Badge>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Activity className="h-6 w-6 text-green-500" />
                      <h3 className="text-lg font-semibold">Appointment Trends</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Today</span>
                        <span className="font-medium">{stats.todayAppointments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>This Week</span>
                        <span className="font-medium">234</span>
                      </div>
                      <div className="flex justify-between">
                        <span>This Month</span>
                        <span className="font-medium">1,247</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
