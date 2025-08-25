import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Calendar, User, Clock, MapPin, Phone } from "lucide-react";

const Ophthalmology = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Ophthalmologist",
      experience: "12 years",
      image: "/api/placeholder/100/100",
      availability: "Mon, Wed, Fri: 9AM-5PM",
      rating: 4.8,
      reviews: 156,
      profileSlug: "dr-sarah-johnson"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Retina Specialist",
      experience: "8 years",
      image: "/api/placeholder/100/100",
      availability: "Tue, Thu, Sat: 10AM-6PM",
      rating: 4.7,
      reviews: 89,
      profileSlug: "dr-michael-chen"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Cornea Specialist",
      experience: "10 years",
      image: "/api/placeholder/100/100",
      availability: "Mon-Fri: 8AM-4PM",
      rating: 4.9,
      reviews: 203,
      profileSlug: "dr-emily-rodriguez"
    }
  ];

  const services = [
    "Comprehensive Eye Exams",
    "Cataract Surgery",
    "LASIK & Refractive Surgery",
    "Glaucoma Treatment",
    "Retinal Diseases",
    "Cornea Transplants",
    "Diabetic Eye Care",
    "Pediatric Ophthalmology"
  ];

  const handleBookAppointment = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    navigate('/appointment', { 
      state: { 
        doctor: doctorName,
        department: "Ophthalmology"
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ophthalmology Department</h1>
            <p className="text-xl md:text-2xl mb-8">
              Advanced eye care and vision treatments with cutting-edge technology
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
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
              Comprehensive eye care services for all your vision needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold text-lg mb-2">{service}</h3>
                  <p className="text-sm text-muted-foreground">
                    Expert care with state-of-the-art equipment
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Ophthalmologists</h2>
            <p className="text-lg text-muted-foreground">
              Experienced eye care specialists dedicated to your vision health
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
                  <div className="space-y-2">
                    <Button 
                      onClick={() => handleBookAppointment(doctor.name)}
                      className="w-full"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                    {doctor.profileSlug && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={() => navigate(`/doctors/${doctor.profileSlug}`)}
                      >
                        View Profile
                      </Button>
                    )}
                  </div>
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
              <CardTitle className="text-2xl">Contact Ophthalmology Department</CardTitle>
              <CardDescription>
                Get in touch with our eye care specialists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Phone className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold mb-2">Hours</h3>
                  <p className="text-muted-foreground">Mon-Fri: 8AM-6PM</p>
                  <p className="text-muted-foreground">Sat: 9AM-2PM</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">Floor 3, Wing B</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Ophthalmology;
