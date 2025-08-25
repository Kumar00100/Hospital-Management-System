import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Stethoscope, User, Phone, Calendar, Clock, Building, UserCheck, FileText, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import apiService from '@/services/api';

interface AppointmentFormData {
  name: string;
  age: string;
  gender: string;
  mobile: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  symptoms: string;
  notifyDoctor: boolean;
}

const AppointmentBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  
  // Time slots for appointments
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];
  
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: user?.name || "",
    age: "",
    gender: "",
    mobile: "", // Phone will be entered by user since it's not in BackendUser
    department: "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
    notifyDoctor: false,
  });

  // Load departments and doctors on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading departments and doctors...');
        
        // Load departments
        const deptResponse = await apiService.getDepartments();
        console.log('Departments API response:', deptResponse);
        
        if (deptResponse.data) {
          console.log('Departments data:', deptResponse.data);
          setDepartments(deptResponse.data as any[]);
        } else if (deptResponse.error) {
          console.error('Departments API error:', deptResponse.error);
        }

        // Load doctors
        const docResponse = await apiService.getDoctors();
        console.log('Doctors API response:', docResponse);
        
        if (docResponse.data) {
          console.log('Doctors data:', docResponse.data);
          setDoctors(docResponse.data as any[]);
        } else if (docResponse.error) {
          console.error('Doctors API error:', docResponse.error);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Filter doctors by selected department
  const filteredDoctors = doctors.filter(doctor => 
    !formData.department || doctor.department_name === formData.department
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.department || !formData.doctor || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Find the selected doctor and department IDs
      const selectedDoctor = doctors.find(d => d.name === formData.doctor);
      const selectedDepartment = departments.find(d => d.name === formData.department);

      if (!selectedDoctor || !selectedDepartment) {
        throw new Error('Invalid doctor or department selection');
      }

      // Create appointment using API service
      const appointmentData = {
        patient_id: user?.id, // Use logged-in user's ID
        doctor_id: selectedDoctor.id,
        department_id: selectedDepartment.id,
        date: formData.date,
        time: formData.time,
        description: formData.symptoms,
        status: 'pending'
      };

      const response = await apiService.createAppointment(appointmentData);

      if (response.error) {
        throw new Error(response.error);
      }

      toast({
        title: "Appointment Booked Successfully! 🎉",
        description: `Your appointment with ${formData.doctor} on ${formData.date} has been confirmed. You will receive a confirmation call shortly.`,
      });

      // Reset form
      setFormData({
        name: user?.name || "",
        age: "",
        gender: "",
        mobile: "",
        department: "",
        doctor: "",
        date: "",
        time: "",
        symptoms: "",
        notifyDoctor: false,
      });
    } catch (error) {
      console.error('Appointment booking error:', error);
      toast({
        title: "Could not book appointment",
        description: error instanceof Error ? error.message : "Please try again or login to continue.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 rounded-full p-3">
            <Stethoscope className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Patient Information
        </h3>
        <p className="text-gray-600">
          Please provide your details to schedule your appointment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                  disabled={!!user}
                  className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Your age"
                  min="1"
                  max="120"
                  className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Mobile Number *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                  placeholder="Your mobile number"
                  required
                  disabled={!!user}
                  className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Department *</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, department: value }));
                    // Reset doctor when department changes
                    setFormData(prev => ({ ...prev, doctor: "" }));
                  }}
                >
                  <SelectTrigger className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Doctor */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Preferred Doctor</Label>
                <Select 
                  value={formData.doctor} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, doctor: value }))}
                  disabled={!formData.department}
                >
                  <SelectTrigger className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredDoctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.name}>{doctor.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Preferred Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Preferred Time
                </Label>
                <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                  <SelectTrigger className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Symptoms Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <FileText className="w-5 h-5 mr-2 text-orange-600" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symptoms" className="text-sm font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Description of Symptoms
                </Label>
                <Textarea
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                  placeholder="Please describe your symptoms or reason for visit..."
                  rows={4}
                  className="bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="notify" 
                  checked={formData.notifyDoctor}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifyDoctor: checked as boolean }))}
                />
                <label
                  htmlFor="notify"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Notify doctor about this booking
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              {/* <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" /> */}
              <div>
                <h4 className="font-medium text-orange-900 mb-1">Important Notice</h4>
                <p className="text-sm text-orange-800">
                  Please arrive 15 minutes before your scheduled appointment time. 
                  Bring your ID and any relevant medical records. 
                  For emergency situations, please call our emergency hotline immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Booking Appointment...
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentBooking;