import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Phone, MapPin, Clock, User, Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Cardiology = () => {
  const navigate = useNavigate();

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      experience: "12 years",
      rating: 4.8,
      image: "/placeholder.svg",
      profileSlug: "dr-sarah-johnson"
    },
    {
      name: "Dr. Michael Brown",
      specialization: "Cardiac Surgeon",
      experience: "12 years",
      rating: 4.9,
      image: "/placeholder.svg"
    },
    {
      name: "Dr. Emily Davis",
      specialization: "Electrophysiologist",
      experience: "10 years",
      rating: 4.7,
      image: "/placeholder.svg"
    }
  ];

  const services = [
    "Echocardiography",
    "Cardiac Catheterization",
    "Angioplasty",
    "Heart Surgery",
    "ECG & Stress Tests",
    "Cardiac Rehabilitation"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/20 p-3 rounded-lg">
              <Heart className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Cardiology Department</h1>
              <p className="text-xl opacity-90">Heart and cardiovascular care specialists</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Building A, Floor 3</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1-555-0201</span>
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Department */}
            <Card>
              <CardHeader>
                <CardTitle>About Our Cardiology Department</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our Cardiology Department is equipped with state-of-the-art technology and staffed by experienced cardiologists 
                  who specialize in diagnosing and treating heart and cardiovascular conditions. We provide comprehensive cardiac care 
                  from prevention to advanced surgical procedures.
                </p>
                <p className="text-gray-600">
                  Our team uses the latest diagnostic tools and treatment methods to ensure the best possible outcomes for our patients. 
                  We focus on both emergency cardiac care and long-term heart health management.
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Our Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div key={service} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Doctors */}
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
                      {doctor.profileSlug && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/doctors/${doctor.profileSlug}`)}
                        >
                          View Profile
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => navigate('/appointment')}
                >
                  Book Appointment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/doctors')}
                >
                  View All Doctors
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  Download Brochure
                </Button>
              </CardContent>
            </Card>

            {/* Department Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Department Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Specialists</span>
                  <Badge variant="secondary">8 Doctors</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Patients Treated</span>
                  <Badge variant="secondary">2,500+</Badge>
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

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">+1-555-0201</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Building A, Floor 3</span>
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

export default Cardiology;
