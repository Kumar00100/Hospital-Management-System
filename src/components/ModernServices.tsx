import { 
  Pill, 
  TestTube, 
  Heart, 
  Ambulance, 
  Stethoscope, 
  Bed, 
  UserCheck,
  Shield,
  Sparkles
} from "lucide-react";

const ModernServices = () => {
  const services = [
    {
      icon: Pill,
      title: "Pharmacy",
      description: "24/7 in-house pharmacy with all essential medications and prescriptions",
      gradient: "from-blue-500 to-blue-600",
      delay: "0s"
    },
    {
      icon: TestTube,
      title: "Lab Tests",
      description: "Comprehensive diagnostic testing with latest equipment and quick results",
      gradient: "from-green-500 to-green-600",
      delay: "0.1s"
    },
    {
      icon: Heart,
      title: "ICU Care",
      description: "Advanced intensive care unit with modern monitoring systems",
      gradient: "from-red-500 to-red-600",
      delay: "0.2s"
    },
    {
      icon: Ambulance,
      title: "Ambulance",
      description: "Emergency ambulance services available 24/7 for critical situations",
      gradient: "from-orange-500 to-orange-600",
      delay: "0.3s"
    },
    {
      icon: Stethoscope,
      title: "Consultation",
      description: "Expert medical consultation with experienced specialists",
      gradient: "from-purple-500 to-purple-600",
      delay: "0.4s"
    },
    {
      icon: Bed,
      title: "Inpatient Care",
      description: "Comfortable rooms with excellent nursing care and medical supervision",
      gradient: "from-pink-500 to-pink-600",
      delay: "0.5s"
    },
    {
      icon: UserCheck,
      title: "Health Checkup",
      description: "Comprehensive health packages for preventive care and early detection",
      gradient: "from-cyan-500 to-cyan-600",
      delay: "0.6s"
    },
    {
      icon: Shield,
      title: "Insurance",
      description: "Cashless treatment with major insurance providers and TPA services",
      gradient: "from-teal-500 to-teal-600",
      delay: "0.7s"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare services designed to meet all your medical needs with excellence and care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="group relative"
              >
                <div 
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
                  style={{ animationDelay: service.delay }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">
                    {service.description}
                  </p>
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-200"></div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">5000+</div>
            <div className="text-gray-600">Happy Patients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">100+</div>
            <div className="text-gray-600">Expert Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Emergency Care</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">15+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernServices;
