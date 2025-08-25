import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, Mail, Star, Award, GraduationCap, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DrDavidKim = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/appointment', { 
      state: { 
        doctor: "Dr. David Kim",
        department: "Orthopedics"
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center text-orange-600 text-2xl font-bold">
                  DK
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Dr. David Kim</h1>
              <p className="text-xl opacity-90">Sports Medicine Specialist</p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-300 fill-current" />
                  <span className="text-lg">4.8/5</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-none">
                  12 years experience
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Doctor */}
            <Card>
              <CardHeader>
                <CardTitle>About Dr. David Kim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Dr. David Kim is a board-certified sports medicine specialist with over 12 years of experience 
                  in treating athletes and active individuals. He specializes in non-surgical treatments for 
                  sports-related injuries and focuses on helping patients return to their optimal performance levels.
                </p>
                <p className="text-gray-600">
                  Dr. Kim completed his fellowship in Sports Medicine at the prestigious Johns Hopkins Hospital 
                  and has worked with professional athletes from various sports organizations. His approach combines 
                  evidence-based medicine with personalized treatment plans tailored to each patient's specific needs.
                </p>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle>Qualifications & Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Medical Degree</h4>
                    <p className="text-gray-600">Harvard Medical School, MD</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Residency</h4>
                    <p className="text-gray-600">Orthopedic Surgery - Massachusetts General Hospital</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Briefcase className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Fellowship</h4>
                    <p className="text-gray-600">Sports Medicine - Johns Hopkins Hospital</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Board Certifications</h4>
                    <p className="text-gray-600">American Board of Orthopedic Surgery</p>
                    <p className="text-gray-600">Sports Medicine Subspecialty Certification</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Sports Injury Management",
                    "Concussion Treatment",
                    "Performance Enhancement",
                    "Rehabilitation Therapy",
                    "Preventive Sports Medicine",
                    "Musculoskeletal Ultrasound"
                  ].map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Appointment Booking */}
            <Card>
              <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Mon, Wed, Fri: 9AM-5PM</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Building A, Floor 2</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={handleBookAppointment}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
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
                  <span className="text-sm">+1 (555) 234-5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">david.kim@hospital.com</span>
                </div>
              </CardContent>
            </Card>

            {/* Department Info */}
            <Card>
              <CardHeader>
                <CardTitle>Orthopedics Department</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">
                  Specializing in bone and joint care with advanced surgical techniques and comprehensive rehabilitation services.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => navigate('/departments/orthopedics')}
                >
                  View Department
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrDavidKim;
