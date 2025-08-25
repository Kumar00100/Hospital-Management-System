import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Calendar, User, Clock, MapPin, Phone } from "lucide-react";

const Surgery = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialty: "General Surgeon",
      experience: "10 years",
      image: "/api/placeholder/100/100",
      availability: "Mon-Fri: 9AM-5PM",
      rating: 4.8,
      reviews: 150
    },
    {
      id: 2,
      name: "Dr. Jane Doe",
      specialty: "Orthopedic Surgeon",
      experience: "12 years",
      image: "/api/placeholder/100/100",
      availability: "Tue, Thu: 10AM-6PM",
      rating: 4.9,
      reviews: 200
    },
    {
      id: 3,
      name: "Dr. Emily White",
      specialty: "Cardiothoracic Surgeon",
      experience: "15 years",
      image: "/api/placeholder/100/100",
      availability: "Mon, Wed, Fri: 8AM-4PM",
      rating: 4.7,
      reviews: 180
    }
  ];

  const services = [
    "Laparoscopic Surgery",
    "Orthopedic Surgery",
    "Cardiac Surgery",
    "Bariatric Surgery",
    "General Surgery",
    "Pediatric Surgery",
    "Trauma Surgery",
    "Cosmetic Surgery"
  ];

  const handleBookAppointment = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    navigate('/appointment', { 
      state: { 
        doctor: doctorName,
        department: "Surgery"
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Surgery Department</h1>
            <p className="text-xl md:text-2xl mb-8">
              Advanced surgical procedures with expert care
            </p>
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={() => navigate('/appointment')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive surgical services for all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Scissors className="w-12 h-12 mx-auto mb-4 text-red-600" />
                  <h3 className="font-semibold text-lg mb-2">{service}</h3>
                  <p className="text-sm text-muted-foreground">
                    Expert care with advanced surgical techniques
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Surgeons</h2>
            <p className="text-lg text-muted-foreground">
              Experienced surgeons dedicated to your surgical health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-xl">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 inline mr-2" />
                      {doctor.experience} experience
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ⭐ {doctor.rating} ({doctor.reviews} reviews)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {doctor.availability}
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleBookAppointment(doctor.name)}
                    className="w-full"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Contact Surgery Department</CardTitle>
              <CardDescription>
                Get in touch with our surgical specialists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Phone className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 345-6789</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <h3 className="font-semibold mb-2">Hours</h3>
                  <p className="text-muted-foreground">Mon-Fri: 8AM-6PM</p>
                  <p className="text-muted-foreground">Sat: 9AM-1PM</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">Floor 1, Wing A</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Surgery;
