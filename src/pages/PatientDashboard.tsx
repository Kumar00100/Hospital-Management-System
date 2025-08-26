import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PatientProfile from '@/components/PatientProfile';
import FeedbackForm from '@/components/FeedbackForm';

const PatientDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [messages, setMessages] = useState([]);
  const [patientProfile, setPatientProfile] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage (from registration) or route state
    const currentUser = localStorage.getItem('currentUser');
    const storedUser = currentUser ? JSON.parse(currentUser) : null;
    
    // Check if user data is passed via route state (from registration)
    const locationState = window.history.state;
    const routeUser = locationState?.usr?.user;
    
    if (routeUser) {
      // Use user data from route state (most recent registration)
      setUser(routeUser);
      setPatientProfile(routeUser);
      localStorage.setItem('currentUser', JSON.stringify(routeUser));
    } else if (storedUser) {
      // Use stored user data from localStorage
      setUser(storedUser);
      setPatientProfile(storedUser);
    } else {
      // Fallback to mock data if no user found
      setUser({ firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' });
    }

    // Fetch initial data
    fetchAppointments();
    fetchReports();
    fetchMessages();
  }, []);

  const fetchAppointments = async () => {
    // Mock data, replace with API call
    setAppointments([
      { id: 1, doctor: 'Dr. Smith', date: '2023-06-10', status: 'Confirmed' },
      { id: 2, doctor: 'Dr. Jones', date: '2023-06-15', status: 'Pending' },
    ]);
  };

  const fetchReports = async () => {
    // Mock data
    setReports([
      { id: 1, name: 'Blood Test Results', date: '2023-05-20' },
      { id: 2, name: 'X-Ray Report', date: '2023-05-22' },
    ]);
  };

  const fetchMessages = async () => {
    // Mock data
    setMessages([
      { id: 1, from: 'Dr. Smith', message: 'Your results are in.', date: '2023-05-21' },
    ]);
  };

  // If no user data, show loading or redirect
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user.firstName} {user.lastName}</p>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        {/* Registration Data Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Registration Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900">{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900">{user.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-gray-900">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Gender</label>
                <p className="text-gray-900">{user.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Blood Group</label>
                <p className="text-gray-900">{user.bloodGroup}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-900">
                  {user.address?.street}, {user.address?.city}, {user.address?.state} {user.address?.zipCode}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                <p className="text-gray-900">{user.emergencyContact?.name} ({user.emergencyContact?.relationship})</p>
                <p className="text-gray-900 text-sm">{user.emergencyContact?.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="appointments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="reports">My Reports</TabsTrigger>
            <TabsTrigger value="messages">Doctor Messages</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>My Appointments</CardTitle>
                <Button onClick={() => window.location.href = '/appointment'}>
                  Book New Appointment
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appt: any) => (
                      <TableRow key={appt.id}>
                        <TableCell>{appt.doctor}</TableCell>
                        <TableCell>{appt.date}</TableCell>
                        <TableCell>
                          <Badge variant={appt.status === 'Confirmed' ? 'default' : 'secondary'}>
                            {appt.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>My Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report: any) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Download</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {messages.map((msg: any) => (
                  <div key={msg.id} className="border-b pb-4 mb-4">
                    <p className="font-semibold">{msg.from}</p>
                    <p className="text-sm text-gray-600">{msg.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{msg.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackForm />
          </TabsContent>

          <TabsContent value="profile">
            {patientProfile ? (
              <PatientProfile patient={patientProfile} />
            ) : (
              <p>Loading profile...</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
