import { 
  Pill, 
  TestTube, 
  Heart, 
  Ambulance, 
  Stethoscope, 
  Bed, 
  UserCheck,
  Shield 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Pill,
      title: "Pharmacy",
      description: "24/7 in-house pharmacy with all essential medications and prescriptions"
    },
    {
      icon: TestTube,
      title: "Lab Tests",
      description: "Comprehensive diagnostic testing with latest equipment and quick results"
    },
    {
      icon: Heart,
      title: "ICU Care",
      description: "Advanced intensive care unit with modern monitoring systems"
    },
    {
      icon: Ambulance,
      title: "Ambulance",
      description: "Emergency ambulance services available 24/7 for critical situations"
    },
    {
      icon: Stethoscope,
      title: "Consultation",
      description: "Expert medical consultation with experienced specialists"
    },
    {
      icon: Bed,
      title: "Inpatient Care",
      description: "Comfortable rooms with excellent nursing care and medical supervision"
    },
    {
      icon: UserCheck,
      title: "Health Checkup",
      description: "Comprehensive health packages for preventive care and early detection"
    },
    {
      icon: Shield,
      title: "Insurance",
      description: "Cashless treatment with major insurance providers and TPA services"
    }
  ];

  return (
    <section className="py-16 bg-muted/30" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-header">Our Services</h2>
          <p className="section-subtext">
            Comprehensive healthcare services designed to meet all your medical needs under one roof
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="service-card group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="medical-icon group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;