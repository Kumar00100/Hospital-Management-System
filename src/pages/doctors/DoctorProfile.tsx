import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Star, Clock, MapPin, Phone, Mail } from "lucide-react";

interface DoctorProfileProps {
  name: string;
  qualifications: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  availability: string;
  location: string;
  phone: string;
  email: string;
  bio: string;
  services: string[];
  education: string[];
  certifications: string[];
}

const DoctorProfile = ({
  name,
  qualifications,
  specialty,
  experience,
  rating,
  reviews,
  availability,
  location,
  phone,
  email,
  bio,
  services,
  education,
  certifications
}: DoctorProfileProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {name}
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            {qualifications} | {specialty}
          </p>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-semibold">{rating}</span>
              <span className="text-muted-foreground ml-1">({reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-muted-foreground mr-1" />
              <span>{experience} experience</span>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/appointment', { 
              state: { doctor: name, department: specialty } 
            })}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About Dr. {name.split(' ')[1]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{bio}</p>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <li key={index} className="text-muted-foreground">• {service}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card>
              <CardHeader>
                <CardTitle>Education & Training</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {education.map((edu, index) => (
                    <li key={index} className="text-muted-foreground">• {edu}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Certifications Section */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {certifications.map((cert, index) => (
                    <li key={index} className="text-muted-foreground">• {cert}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-muted-foreground mr-3" />
                  <span className="text-muted-foreground">{phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-muted-foreground mr-3" />
                  <span className="text-muted-foreground">{email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
                  <span className="text-muted-foreground">{location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-muted-foreground mr-3" />
                  <span className="text-muted-foreground">{availability}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate('/appointment', { 
                    state: { doctor: name, department: specialty } 
                  })}
                  className="w-full mb-3"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full">
                  View Availability
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
