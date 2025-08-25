import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PatientProfile from '@/components/PatientProfile';
import MedicalRecordForm from '@/components/MedicalRecordForm';
import DoctorScheduleManagement from '@/components/DoctorScheduleManagement';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctor, setDoctor] = useState({ name: 'Dr. John Doe', specialization: 'Cardiologist', timings: '9 AM - 5 PM' });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/appointments/doctor/1');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Mock data for UI development
      setAppointments([
        { id: 1, time: '10:00 AM', patient_name: 'Alice Johnson', status: 'confirmed' },
        { id: 2, time: '11:00 AM', patient_name: 'Bob Williams', status: 'pending' },
      ]);
    }
  };

  const fetchPatients = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/patients/doctor/1');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Mock data for UI development
      setPatients([
        { id: 1, name: 'Alice Johnson', last_visit: '2023-05-10' },
        { id: 2, name: 'Bob Williams', last_visit: '2023-05-12' },
      ]);
    }
  };

  const handleSelectPatient = (patient: any) => {
    // Mock patient profile data, replace with API call
    setSelectedPatient({
      ...patient,
      age: 34,
      gender: 'Female',
      contact: '123-456-7890',
      email: `${patient.name.split(' ')[0].toLowerCase()}@example.com`,
      previousVisits: [
        { id: 'v1', date: '2023-05-10', doctor: 'Dr. Smith', department: 'Cardiology', diagnosis: 'Minor arrhythmia', followUpDate: '2023-06-10' },
      ],
      prescribedMedications: [
        { id: 'm1', name: 'Aspirin', dosage: '81mg', frequency: 'Once a day' },
      ],
    });
  };

  const handleMedicalRecordSubmit = (record: any) => {
    console.log('New medical record:', record);
    // Here you would make an API call to save the record
    alert('Medical record added successfully!');
    setSelectedPatient(null); // Go back to the list
  };

  const handleUpdateTimings = (newTimings: string) => {
    setDoctor({ ...doctor, timings: newTimings });
    // Add API call to update timings in the backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your appointments and patients</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((appointment: any) => (
                          <TableRow key={appointment.id}>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{appointment.patient_name}</TableCell>
                            <TableCell>
                              <Badge variant={appointment.status === 'pending' ? 'secondary' : 'default'}>
                                {appointment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-4">
            {selectedPatient ? (
              <div>
                <Button onClick={() => setSelectedPatient(null)} className="mb-4">Back to Patient List</Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <PatientProfile patient={selectedPatient} />
                  </div>
                  <div>
                    <MedicalRecordForm patientId={selectedPatient.id} onSubmit={handleMedicalRecordSubmit} />
                  </div>
                </div>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient: any) => (
                        <TableRow key={patient.id}>
                          <TableCell>{patient.name}</TableCell>
                          <TableCell>{patient.last_visit}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" className="mr-2" onClick={() => handleSelectPatient(patient)}>View History</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="schedule">
            <DoctorScheduleManagement />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="Dr. John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{doctor.name}</h2>
                  <p className="text-gray-500">{doctor.specialization}</p>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="timings">Your Timings:</Label>
                    <Input id="timings" defaultValue={doctor.timings} className="w-auto" />
                    <Button onClick={() => handleUpdateTimings((document.getElementById('timings') as HTMLInputElement).value)}>Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Past Visit Data</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for past visit data */}
                <p>Past visit data will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
