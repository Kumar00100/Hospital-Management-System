import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PatientProfile from '@/components/PatientProfile';
import FeedbackForm from '@/components/FeedbackForm';
import { useAppointments } from '@/contexts/AppointmentsContext';
import { useAuth } from '@/contexts/AuthContext';
import apiService from '@/services/api';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { appointments, fetchAppointments, isLoading: appointmentsLoading } = useAppointments();
  const [patient, setPatient] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAppointments();

      const fetchPatientData = async () => {
        setIsLoading(true);
        try {
          const response = await apiService.getPatientByUserId(user.id);
          if (response.data) {
            setPatient(response.data);
          } else {
            console.error('Failed to fetch patient data:', response.error);
          }
        } catch (error) {
          console.error('Error fetching patient data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPatientData();
    }
  }, [user, fetchAppointments]);

  if (isLoading || appointmentsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-600">Please log in to view your dashboard.</div>
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
            <p className="mt-2 text-gray-600">Welcome back, {user.name}</p>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

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
                        <TableCell>{appt.doctor_name}</TableCell>
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
                <p>You have no reports.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p>You have no messages.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackForm />
          </TabsContent>

          <TabsContent value="profile">
            {patient ? (
              <PatientProfile patient={patient} />
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
