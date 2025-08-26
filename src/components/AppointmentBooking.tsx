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
  age: number | string;
  gender: string;
  mobile: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  symptoms: string;
  notifyDoctor: boolean;
  registrationNumber: string;
}

const AppointmentBooking = () => {
  const { user } = useAuth();
  console.log('User:', user); // Log user information
  console.log('User mobile number:', user?.mobile); // Log mobile number
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
    registrationNumber: user?.registrationNumber || "", // Initialize registration number
    name: user?.name || "",
    age: "",
    gender: "",
    mobile: user?.mobile || "", // Use user's mobile number from AuthContext
    department: "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
    notifyDoctor: false,
  });

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        mobile: user.mobile || "",
        registrationNumber: user.registrationNumber || ""
      }));
    }
  }, [user]);

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
          console.log('Number of departments:', (deptResponse.data as any[]).length);
          if ((deptResponse.data as any[]).length === 0) {
            console.warn('No departments found in the database');
            // Add mock departments as fallback
            const mockDepartments = [
              { id: 1, name: 'Cardiology' },
              { id: 2, name: 'Neurology' },
              { id: 3, name: 'Orthopedics' },
              { id: 4, name: 'Pediatrics' },
              { id: 5, name: 'Dental' },
              { id: 6, name: 'Surgery' },
              { id: 7, name: 'Ophthalmology' },
              { id: 8, name: 'ENT' },
              { id: 9, name: 'Dermatology' },
              { id: 10, name: 'Gynecology' }
            ];
            setDepartments(mockDepartments);
          } else {
            setDepartments(deptResponse.data as any[]);
          }
        } else if (deptResponse.error) {
          console.error('Departments API error:', deptResponse.error);
          // Add mock departments as fallback
          const mockDepartments = [
            { id: 1, name: 'Cardiology' },
            { id: 2, name: 'Neurology' },
            { id: 3, name: 'Orthopedics' },
            { id: 4, name: 'Pediatrics' },
            { id: 5, name: 'Dental' },
            { id: 6, name: 'Surgery' },
            { id: 7, name: 'Ophthalmology' },
            { id: 8, name: 'ENT' },
            { id: 9, name: 'Dermatology' },
            { id: 10, name: 'Gynecology' }
          ];
          setDepartments(mockDepartments);
          // Show error toast to user
          toast({
            title: "Using demo departments",
            description: "Could not connect to server. Using demo department list.",
            variant: "default"
          });
        }

        // Load doctors
        const docResponse = await apiService.getDoctors();
        console.log('Doctors API response:', docResponse);
        
        if (docResponse.data) {
          console.log('Doctors data:', docResponse.data);
          console.log('Number of doctors:', (docResponse.data as any[]).length);
          if ((docResponse.data as any[]).length === 0) {
            console.warn('No doctors found in the database');
            // Add mock doctors as fallback
            const mockDoctors = [
              { id: 1, name: 'Dr. Sarah Smith', department_name: 'Cardiology' },
              { id: 2, name: 'Dr. Michael Johnson', department_name: 'Neurology' },
              { id: 3, name: 'Dr. Emily Rodriguez', department_name: 'Orthopedics' },
              { id: 4, name: 'Dr. James Wilson', department_name: 'Pediatrics' },
              { id: 5, name: 'Dr. Lisa Thompson', department_name: 'Dental' },
              { id: 6, name: 'Dr. Robert Davis', department_name: 'Surgery' },
              { id: 7, name: 'Dr. Jennifer Lee', department_name: 'Ophthalmology' },
              { id: 8, name: 'Dr. David Kim', department_name: 'ENT' },
              { id: 9, name: 'Dr. Sarah Johnson', department_name: 'Dermatology' },
              { id: 10, name: 'Dr. Michael Chen', department_name: 'Gynecology' }
            ];
            setDoctors(mockDoctors);
          } else {
            setDoctors(docResponse.data as any[]);
          }
        } else if (docResponse.error) {
          console.error('Doctors API error:', docResponse.error);
          // Add mock doctors as fallback
          const mockDoctors = [
            { id: 1, name: 'Dr. Sarah Smith', department_name: 'Cardiology' },
            { id: 2, name: 'Dr. Michael Johnson', department_name: 'Neurology' },
            { id: 3, name: 'Dr. Emily Rodriguez', department_name: 'Orthopedics' },
            { id: 4, name: 'Dr. James Wilson', department_name: 'Pediatrics' },
            { id: 5, name: 'Dr. Lisa Thompson', department_name: 'Dental' },
            { id: 6, name: 'Dr. Robert Davis', department_name: 'Surgery' },
            { id: 7, name: 'Dr. Jennifer Lee', department_name: 'Ophthalmology' },
            { id: 8, name: 'Dr. David Kim', department_name: 'ENT' },
            { id: 9, name: 'Dr. Sarah Johnson', department_name: 'Dermatology' },
            { id: 10, name: 'Dr. Michael Chen', department_name: 'Gynecology' }
          ];
          setDoctors(mockDoctors);
        }
        } catch (error) {
          console.error('Error loading data:', error);
          // Add mock departments as fallback
          const mockDepartments = [
            { id: 1, name: 'Cardiology' },
            { id: 2, name: 'Neurology' },
            { id: 3, name: 'Orthopedics' },
            { id: 4, name: 'Pediatrics' },
            { id: 5, name: 'Dental' },
            { id: 6, name: 'Surgery' },
            { id: 7, name: 'Ophthalmology' },
            { id: 8, name: 'ENT' },
            { id: 9, name: 'Dermatology' },
            { id: 10, name: 'Gynecology' }
          ];
          setDepartments(mockDepartments);
          
          // Add mock doctors as fallback
          const mockDoctors = [
            { id: 1, name: 'Dr. Sarah Smith', department_name: 'Cardiology' },
            { id: 2, name: 'Dr. Michael Johnson', department_name: 'Neurology' },
            { id: 3, name: 'Dr. Emily Rodriguez', department_name: 'Orthopedics' },
            { id: 4, name: 'Dr. James Wilson', department_name: 'Pediatrics' },
            { id: 5, name: 'Dr. Lisa Thompson', department_name: 'Dental' },
            { id: 6, name: 'Dr. Robert Davis', department_name: 'Surgery' },
            { id: 7, name: 'Dr. Jennifer Lee', department_name: 'Ophthalmology' },
            { id: 8, name: 'Dr. David Kim', department_name: 'ENT' },
            { id: 9, name: 'Dr. Sarah Johnson', department_name: 'Dermatology' },
            { id: 10, name: 'Dr. Michael Chen', department_name: 'Gynecology' }
          ];
          setDoctors(mockDoctors);
          
          toast({
            title: "Connection Error",
            description: "Unable to connect to the server. Using demo data.",
            variant: "default"
          });
        }
      };

      loadData();
    }, []);

  // Filter doctors by selected department
  const filteredDoctors = doctors.filter(doctor => 
    !formData.department || doctor.department_name === formData.department
  );

  // Debug logging for filtered doctors
  useEffect(() => {
    console.log('Filtered doctors:', filteredDoctors);
    console.log('Selected department:', formData.department);
    console.log('All doctors:', doctors);
    console.log('First doctor department field:', doctors[0] ? doctors[0].department_name : 'No doctors loaded');
  }, [formData.department, doctors, filteredDoctors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book an appointment.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      // Redirect to login page
      window.location.href = '/login';
      return;
    }

    // Enhanced validation
    const requiredFields = ['name', 'department', 'doctor', 'date', 'time', 'mobile'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof AppointmentFormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Validate mobile number format
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
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
        patient_id: user.id, // Use logged-in user's ID
        doctor_id: selectedDoctor.id,
        department_id: selectedDepartment.id,
        date: formData.date,
        time: formData.time,
        description: formData.symptoms,
        status: 'pending'
      };

      console.log('Sending appointment data:', appointmentData);

      const response = await apiService.createAppointment(appointmentData);
      console.log('API Response:', response); // Log the API response

      if (response.error) {
        throw new Error(response.error);
      }

      toast({
        title: "Appointment Booked Successfully! 🎉",
        description: `Your appointment with ${formData.doctor} on ${formData.date} at ${formData.time} has been confirmed. You will receive a confirmation call shortly.`,
      });

      // Reset form
      setFormData({
        name: user.name || "",
        age: "",
        gender: "",
        mobile: "",
        department: "",
        doctor: "",
        date: "",
        time: "",
        symptoms: "",
        notifyDoctor: false,
        registrationNumber: user.registrationNumber || "",
      });

      // Redirect to home page after 3 seconds to allow user to see the success message
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);

    } catch (error) {
      console.error('Appointment booking error:', error);
      toast({
        title: "Could not book appointment",
        description: error instanceof Error ? error.message : "Please try again or contact support.",
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

      {/* Login Notice for unauthenticated users */}
      {!user && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Login Required</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>You need to be logged in to book an appointment. Please <a href="/login" className="font-medium underline text-yellow-800 hover:text-yellow-900">login here</a> or <a href="/register" className="font-medium underline text-yellow-800 hover:text-yellow-900">create an account</a>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome message for authenticated users */}
      {user && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Welcome, {user.name}!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>You are logged in and ready to book your appointment. Your information has been pre-filled for convenience.</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  // disabled={!!user}
                  className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Registration Number */}
              <div className="space-y-2">
                <Label htmlFor="registrationNumber" className="text-sm font-medium flex items-center">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Registration Number
                </Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                  placeholder="Your registration number"
                  // disabled={!!user}
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
                    console.log('Department selected:', value);
                    console.log('Current departments state:', departments);
                    setFormData(prev => ({ ...prev, department: value }));
                    // Reset doctor when department changes
                    setFormData(prev => ({ ...prev, doctor: "" }));
                  }}
                >
                  <SelectTrigger className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.length > 0 ? (
                      departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>Loading departments...</SelectItem>
                    )}
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
                    {doctors.length > 0 ? (
                      filteredDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.name}>{doctor.name}</SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>Loading doctors...</SelectItem>
                    )}
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