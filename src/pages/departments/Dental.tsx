import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smile, Phone, MapPin, Clock, User, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dental = () => {
  const navigate = useNavigate();

  const doctors = [
    {
      name: "Dr. Lisa Thompson",
      specialization: "General Dentist",
      experience: "18 years",
      rating: 4.9,
    },
    {
      name: "Dr. John Martinez",
      specialization: "Orthodontist",
      experience: "15 years",
      rating: 4.8,
    },
    {
      name: "Dr. Anna White",
      specialization: "Oral Surgeon",
      experience: "12 years",
      rating: 4.7,
    }
  ];

  const services = [
    "General Dentistry",
    "Orthodontics",
    "Oral Surgery",
    "Cosmetic Dentistry",
    "Root Canal Treatment",
    "Dental Implants"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/20 p-3 rounded-lg">
              <Smile className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Dental Department</h1>
              <p className="text-xl opacity-90">Oral health and dentistry specialists</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Building A, Floor 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1-555-0205</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Fri: 8AM-6PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About Our Dental Department</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our Dental Department provides comprehensive oral healthcare services using the latest 
                  technology and techniques. We focus on preventive care, restorative treatments, and 
                  cosmetic procedures to ensure optimal oral health and beautiful smiles.
                </p>
                <p className="text-gray-600">
                  Our team of experienced dentists and specialists create a comfortable, anxiety-free 
                  environment for all patients, from routine checkups to complex dental procedures.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div key={service} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Specialists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.name} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <p className="text-gray-600">{doctor.specialization}</p>
                        <p className="text-sm text-gray-500">{doctor.experience} experience</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/appointment')}
                >
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/doctors')}>
                  View All Doctors
                </Button>
                <Button variant="outline" className="w-full">Download Brochure</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Specialists</span>
                  <Badge variant="secondary">5 Doctors</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Patients Treated</span>
                  <Badge variant="secondary">1,200+</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <Badge variant="secondary">98%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Emergency Available</span>
                  <Badge className="bg-green-100 text-green-800">24/7</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">+1-555-0205</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Building A, Floor 1</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Mon-Fri: 8AM-6PM</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dental;
