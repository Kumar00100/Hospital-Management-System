import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/services/api';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, Award } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  department_name: string;
  qualification?: string;
  experience?: string;
  availability?: string;
  bio?: string;
  rating?: number;
}

const DoctorsList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        console.log('Fetching doctors from API...');
        const response = await apiService.getDoctors();
        console.log('API Response:', response);
        
        if (response.data) {
          console.log('Doctors data received:', response.data);
          setDoctors(response.data as Doctor[]);
        } else if (response.error) {
          console.error('API returned error:', response.error);
          throw new Error(response.error);
        } else {
          console.warn('No data received from API');
          // Add mock doctors as fallback
          const mockDoctors = [
            { id: 1, name: 'Dr. Sarah Johnson', department_name: 'Cardiology', qualification: 'MD, FACC', experience: '15', bio: 'Leading heart specialist with expertise in interventional cardiology', rating: 4.9 },
            { id: 2, name: 'Dr. Michael Chen', department_name: 'Neurology', qualification: 'MD, PhD', experience: '12', bio: 'Expert in treating complex neurological disorders and brain surgeries', rating: 4.8 },
            { id: 3, name: 'Dr. Emily Rodriguez', department_name: 'Orthopedics', qualification: 'MD, MS', experience: '10', bio: 'Specialist in joint replacement and sports injury treatments', rating: 4.7 },
            { id: 4, name: 'Dr. James Wilson', department_name: 'Pediatrics', qualification: 'MD, FAAP', experience: '18', bio: 'Compassionate care for children from newborn to adolescence', rating: 4.9 },
            { id: 5, name: 'Dr. Lisa Thompson', department_name: 'Dental', qualification: 'DDS, MS', experience: '8', bio: 'Advanced dental procedures and cosmetic dentistry expert', rating: 4.6 },
            { id: 6, name: 'Dr. Robert Davis', department_name: 'Surgery', qualification: 'MD, FACS', experience: '20', bio: 'Experienced in minimally invasive and robotic surgical techniques', rating: 4.8 },
            { id: 7, name: 'Dr. David Kim', department_name: 'Ophthalmology', qualification: 'MD', experience: '9', bio: 'Specialist in eye diseases and vision correction surgeries', rating: 4.7 },
            { id: 8, name: 'Dr. Jennifer Lee', department_name: 'ENT', qualification: 'MD, MS', experience: '11', bio: 'Expert in ear, nose and throat disorders and treatments', rating: 4.8 }
          ];
          console.log('Using mock doctors data:', mockDoctors);
          setDoctors(mockDoctors);
        }
      } catch (error) {
        console.error('Error loading doctors:', error);
        // Add mock doctors as fallback
        const mockDoctors = [
          { id: 1, name: 'Dr. Sarah Johnson', department_name: 'Cardiology', qualification: 'MD, FACC', experience: '15', bio: 'Leading heart specialist with expertise in interventional cardiology', rating: 4.9 },
          { id: 2, name: 'Dr. Michael Chen', department_name: 'Neurology', qualification: 'MD, PhD', experience: '12', bio: 'Expert in treating complex neurological disorders and brain surgeries', rating: 4.8 },
          { id: 3, name: 'Dr. Emily Rodriguez', department_name: 'Orthopedics', qualification: 'MD, MS', experience: '10', bio: 'Specialist in joint replacement and sports injury treatments', rating: 4.7 },
          { id: 4, name: 'Dr. James Wilson', department_name: 'Pediatrics', qualification: 'MD, FAAP', experience: '18', bio: 'Compassionate care for children from newborn to adolescence', rating: 4.9 },
          { id: 5, name: 'Dr. Lisa Thompson', department_name: 'Dental', qualification: 'DDS, MS', experience: '8', bio: 'Advanced dental procedures and cosmetic dentistry expert', rating: 4.6 },
          { id: 6, name: 'Dr. Robert Davis', department_name: 'Surgery', qualification: 'MD, FACS', experience: '20', bio: 'Experienced in minimally invasive and robotic surgical techniques', rating: 4.8 },
          { id: 7, name: 'Dr. David Kim', department_name: 'Ophthalmology', qualification: 'MD', experience: '9', bio: 'Specialist in eye diseases and vision correction surgeries', rating: 4.7 },
          { id: 8, name: 'Dr. Jennifer Lee', department_name: 'ENT', qualification: 'MD, MS', experience: '11', bio: 'Expert in ear, nose and throat disorders and treatments', rating: 4.8 }
        ];
        console.log('Using mock doctors data due to error:', mockDoctors);
        setDoctors(mockDoctors);
        toast({
          title: "Warning",
          description: "Using demo data. Could not connect to doctors database.",
          variant: "default"
        });
      }
    };

    loadDoctors();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Expert Doctors</h2>
          <p className="text-muted-foreground text-lg">
            Meet our team of highly qualified and experienced medical professionals
          </p>
        </div>

        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div 
                key={doctor.id} 
                className="doctor-card bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-24 h-24 bg-muted rounded-full mb-4 flex items-center justify-center">
                    <Award className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {doctor.name}
                  </h3>
                  {doctor.qualification && (
                    <p className="text-primary font-medium mb-2">{doctor.qualification}</p>
                  )}
                  <p className="text-secondary font-semibold mb-2">{doctor.department_name}</p>
                </div>

                <div className="space-y-3 mb-4">
                  {doctor.experience && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Experience:</span>
                      <span className="font-medium">{doctor.experience} years</span>
                    </div>
                  )}
                  {doctor.rating && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                  )}
                  {doctor.availability && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-medium text-green-600">{doctor.availability}</span>
                    </div>
                  )}
                </div>

                {doctor.bio && (
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {doctor.bio}
                  </p>
                )}

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      // Map doctor names to their specific profile routes
                      const doctorRoutes = {
                        "Dr. Sarah Johnson": "/doctors/dr-sarah-johnson",
                        "Dr. Michael Chen": "/doctors/dr-michael-chen",
                        "Dr. Emily Rodriguez": "/doctors/dr-emily-rodriguez",
                        "Dr. James Wilson": "/doctors/dr-james-wilson",
                        "Dr. Lisa Thompson": "/doctors/dr-lisa-thompson",
                        "Dr. Robert Davis": "/doctors/dr-robert-davis",
                        "Dr. David Kim": "/doctors/dr-david-kim",
                        "Dr. Jennifer Lee": "/doctors/dr-jennifer-lee"
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No doctors available at the moment.</p>
            <p className="text-muted-foreground text-sm mt-2">Please check back later or contact our reception.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsList;
