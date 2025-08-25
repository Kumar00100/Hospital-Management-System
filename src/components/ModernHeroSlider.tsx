import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Phone, Award, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import hospital images
import hospitalHero1 from "@/assets/hospital-hero-1.jpg";
import hospitalHero2 from "@/assets/hospital-hero-2.jpg";
import hospitalHero3 from "@/assets/hospital-hero-3.jpg";

const ModernHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Your Health, Our Priority",
      subtitle: "Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities",
      buttonText: "Book Appointment",
      icon: Calendar,
      gradient: "from-blue-600 to-blue-500",
      image: hospitalHero1,
      overlay: "bg-gradient-to-r from-blue-600/60 to-blue-500/60"
    },
    {
      title: "24/7 Emergency Care",
      subtitle: "Immediate medical attention when you need it most. Our emergency team is always ready to help",
      buttonText: "Emergency Contact",
      icon: Phone,
      gradient: "from-red-600 to-red-500",
      image: hospitalHero2,
      overlay: "bg-gradient-to-r from-red-600/60 to-red-500/60"
    },
    {
      title: "Advanced Medical Technology",
      subtitle: "Cutting-edge equipment and innovative treatments for better health outcomes",
      buttonText: "Learn More",
      icon: Award,
      gradient: "from-green-600 to-green-500",
      image: hospitalHero3,
      overlay: "bg-gradient-to-r from-green-600/60 to-green-500/60"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[700px] overflow-hidden">
      {slides.map((slide, index) => {
        const Icon = slide.icon;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            >
              {/* Overlay with gradient */}
              <div className={`absolute inset-0 ${slide.overlay}`}></div>
              
              {/* Additional dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Centered Content Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up drop-shadow-lg">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xl md:text-2xl mb-8 animate-fade-up opacity-95 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  
                  <Button 
                    size="lg" 
                    className={`bg-gradient-to-r ${slide.gradient} hover:scale-105 transform transition-all duration-300 text-lg px-8 py-6 rounded-xl shadow-2xl animate-scale-in backdrop-blur-sm border border-white/20`}
                    onClick={() => navigate('/appointment')}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300 backdrop-blur-sm z-20 border border-white/30"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300 backdrop-blur-sm z-20 border border-white/30"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border border-white/30 ${
              index === currentSlide 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white border border-white/20">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="font-semibold">5000+</span>
            <span className="text-sm opacity-80">Happy Patients</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHeroSlider;
