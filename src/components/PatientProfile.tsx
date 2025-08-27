import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Calendar, Heart, IdCard } from 'lucide-react';

interface Patient {
  id: string;
  user_id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  blood_group: string;
  registrationNumber: string;
  created_at?: string;
}

interface PatientProfileProps {
  patient: Patient;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src="/placeholder.svg" alt={patient.name} />
              <AvatarFallback className="bg-blue-500 text-white text-2xl">
                {patient.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
              <p className="text-gray-600 mb-2">Patient ID: {patient.id}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {patient.age} years
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {patient.gender}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {patient.blood_group}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IdCard className="h-5 w-5 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{patient.name}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{patient.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{patient.age} years</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{patient.gender}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{patient.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <IdCard className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Registration Number</p>
                <p className="font-medium">{patient.registrationNumber}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Heart className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium">
                  <Badge variant="outline">{patient.blood_group}</Badge>
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Separator className="my-4" />
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{patient.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600" />
            Medical Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 className="font-medium text-red-800 mb-1">Blood Group</h3>
              <p className="text-2xl font-bold text-red-600">{patient.blood_group}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-1">Age</h3>
              <p className="text-2xl font-bold text-blue-600">{patient.age} years</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-1">Gender</h3>
              <p className="text-2xl font-bold text-green-600">{patient.gender}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile;
