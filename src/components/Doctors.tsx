import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, Calendar, Award } from "lucide-react";

const Doctors = () => {
  const navigate = useNavigate();
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      qualification: "MD, FACC",
      specialization: "Cardiologist",
      experience: 15,
      bio: "Leading heart specialist with expertise in interventional cardiology",
      rating: 4.9,
      image: "/api/placeholder/200/200"
    },
    {
      name: "Dr. Michael Chen",
      qualification: "MD, PhD",
      specialization: "Neurologist",
      experience: 12,
      bio: "Expert in treating complex neurological disorders and brain surgeries",
      rating: 4.8,
      image: "/api/placeholder/200/200"
    },
    {
      name: "Dr. Emily Rodriguez",
      qualification: "MD, MS",
      specialization: "Orthopedic Surgeon",
      experience: 10,
      bio: "Specialist in joint replacement and sports injury treatments",
      rating: 4.7,
      image: "/api/placeholder/200/200"
    },
    {
      name: "Dr. James Wilson",
      qualification: "MD, FAAP",
      specialization: "Pediatrician",
      experience: 18,
      bio: "Compassionate care for children from newborn to adolescence",
      rating: 4.9,
      image: "/api/placeholder/200/200"
    },
    {
      name: "Dr. Lisa Thompson",
      qualification: "DDS, MS",
      specialization: "Dental Surgeon",
      experience: 8,
      bio: "Advanced dental procedures and cosmetic dentistry expert",
      rating: 4.6,
      image: "/api/placeholder/200/200"
    },
    {
      name: "Dr. Robert Davis",
      qualification: "MD, FACS",
      specialization: "General Surgeon",
      experience: 20,
      bio: "Experienced in minimally invasive and robotic surgical techniques",
      rating: 4.8,
      image: "/api/placeholder/200/200"
    }
  ];

  return (
    <section className="py-16 bg-background" id="doctors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-header">Our Expert Doctors</h2>
          <p className="section-subtext">
            Meet our team of highly qualified and experienced medical professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div 
              key={index} 
              className="doctor-card animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-24 h-24 bg-muted rounded-full mb-4 flex items-center justify-center">
                  <Award className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium mb-2">{doctor.qualification}</p>
                <p className="text-secondary font-semibold mb-2">{doctor.specialization}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">{doctor.experience} years</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{doctor.rating}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {doctor.bio}
              </p>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    // Map doctor names to their specific route paths
                    const doctorRoutes = {
                      "Dr. Sarah Johnson": "/doctors/dr-sarah-johnson",
                      "Dr. Michael Chen": "/doctors/dr-michael-chen",
                      "Dr. Emily Rodriguez": "/doctors/dr-emily-rodriguez",
                      "Dr. James Wilson": "/doctors/dr-james-wilson",
                      "Dr. Lisa Thompson": "/doctors/dr-lisa-thompson",
                      "Dr. Robert Davis": "/doctors/dr-robert-davis"
                    };
                    
                    const route = doctorRoutes[doctor.name];
                    if (route) {
                      navigate(route);
                    } else {
                      // Fallback to generic doctor profile if specific route not found
                      navigate("/doctors/profile");
                    }
                  }}
                >
                  View Profile
                </Button>
                <Button 
                  className="btn-primary flex-1"
                  onClick={() => navigate("/appointment")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;