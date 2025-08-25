import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Visit {
  id: string;
  date: string;
  doctor: string;
  department: string;
  diagnosis: string;
  followUpDate?: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  email: string;
  avatarUrl?: string;
  previousVisits: Visit[];
  prescribedMedications: Medication[];
}

interface PatientProfileProps {
  patient: Patient;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={patient.avatarUrl || '/placeholder.svg'} alt={patient.name} />
            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <div><strong>Patient ID:</strong> {patient.id}</div>
            <div><strong>Name:</strong> {patient.name}</div>
            <div><strong>Age:</strong> {patient.age}</div>
            <div><strong>Gender:</strong> {patient.gender}</div>
            <div><strong>Contact:</strong> {patient.contact}</div>
            <div><strong>Email:</strong> {patient.email}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Follow-up</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patient.previousVisits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>{visit.date}</TableCell>
                  <TableCell>{visit.doctor}</TableCell>
                  <TableCell>{visit.department}</TableCell>
                  <TableCell>{visit.diagnosis}</TableCell>
                  <TableCell>{visit.followUpDate || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prescribed Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patient.prescribedMedications.map((med) => (
                <TableRow key={med.id}>
                  <TableCell>{med.name}</TableCell>
                  <TableCell>{med.dosage}</TableCell>
                  <TableCell>{med.frequency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile;
