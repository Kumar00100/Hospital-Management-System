import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import PatientProfile from '@/components/PatientProfile';
import MedicalRecordForm from '@/components/MedicalRecordForm';

const StaffDashboard = () => {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    newPatients: 0,
    pendingAppointments: 0,
    totalPatients: 0
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    fetchDashboardStats();
    fetchPatients();
  }, []);

  const fetchDashboardStats = async () => {
    // Mock data - replace with actual API call
    setStats({
      todayAppointments: 12,
      newPatients: 5,
      pendingAppointments: 8,
      totalPatients: 156
    });
  };

  const fetchPatients = async () => {
    // Mock data for patient list
    setPatients([
      { id: 1, name: 'Jane Smith', last_visit: '2023-04-15' },
      { id: 2, name: 'John Doe', last_visit: '2023-04-18' },
    ]);
  };

  const handleSelectPatient = (patient: any) => {
    // Mock patient profile data, replace with API call
    setSelectedPatient({
      ...patient,
      age: 45,
      gender: 'Male',
      contact: '555-555-5555',
      email: `${patient.name.split(' ')[0].toLowerCase()}@example.com`,
      previousVisits: [
        { id: 'v1', date: patient.last_visit, doctor: 'Dr. Davis', department: 'General Surgery', diagnosis: 'Minor injury' },
      ],
      prescribedMedications: [
        { id: 'm1', name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed' },
      ],
    });
  };

  const handleMedicalRecordSubmit = (record: any) => {
    console.log('New medical record from staff:', record);
    // API call to save the record
    alert('Medical record added successfully!');
    setSelectedPatient(null); // Go back to the list
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage patient appointments and registrations</p>
        </div>

        <Tabs defaultValue="registration" className="space-y-4">
          <TabsList>
            <TabsTrigger value="registration">Patient Registration</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="records">Patient Records</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
            <TabsTrigger value="inpatients">Inpatients</TabsTrigger>
          </TabsList>

          <TabsContent value="registration">
            <Card>
              <CardHeader>
                <CardTitle>Register New Patient</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input id="contact" placeholder="123-456-7890" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <Button>Register Patient</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patient-search">Search Patient</Label>
                    <Input id="patient-search" placeholder="Enter patient name or ID" />
                  </div>
                  <div>
                    <Label htmlFor="doctor">Select Doctor</Label>
                    <Input id="doctor" placeholder="Dr. Smith" />
                  </div>
                  <div>
                    <Label htmlFor="appointment-date">Date</Label>
                    <Input id="appointment-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="appointment-time">Time</Label>
                    <Input id="appointment-time" type="time" />
                  </div>
                </div>
                <Button>Book Appointment</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records">
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
                  <CardTitle>Manage Patient Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Search for a patient..." className="mb-4" />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell>{patient.name}</TableCell>
                          <TableCell>{patient.last_visit}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleSelectPatient(patient)}>View/Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="schedules">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Doctor Schedules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Doctor schedule management interface will be here.</p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Calendar</CardTitle>
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

          <TabsContent value="inpatients">
            <Card>
              <CardHeader>
                <CardTitle>Inpatient Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button>Admit Patient</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Admission Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Mark Brown</TableCell>
                      <TableCell>302</TableCell>
                      <TableCell>2023-05-20</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Discharge</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;
