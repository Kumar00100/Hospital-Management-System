import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock Data
const appointmentStats = {
  day: 25,
  week: 150,
  month: 620,
};

const topDepartmentsData = [
  { name: 'Cardiology', appointments: 180 },
  { name: 'Neurology', appointments: 150 },
  { name: 'Orthopedics', appointments: 120 },
  { name: 'Pediatrics', appointments: 90 },
  { name: 'Dental', appointments: 70 },
];

const ReportsDashboard = () => {

  const handleExport = (format: 'pdf' | 'csv') => {
    alert(`Exporting reports as ${format.toUpperCase()}...`);
    // Logic for exporting data would go here
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{appointmentStats.day}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointments This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{appointmentStats.week}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointments This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{appointmentStats.month}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Departments by Appointments</CardTitle>
          <div className="flex space-x-2">
            <Button onClick={() => handleExport('pdf')} variant="outline">Export as PDF</Button>
            <Button onClick={() => handleExport('csv')} variant="outline">Export as CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={topDepartmentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsDashboard;
