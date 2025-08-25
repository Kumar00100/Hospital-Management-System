import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Phone, Award } from "lucide-react";
import heroImage1 from "@/assets/hospital-hero-1.jpg";
import heroImage2 from "@/assets/hospital-hero-2.jpg";
import heroImage3 from "@/assets/hospital-hero-3.jpg";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroImage1,
      title: "Book Appointment Online",
      subtitle: "Schedule your visit with our expert doctors from the comfort of your home",
      buttonText: "Book Now",
      icon: Calendar
    },
    {
      image: heroImage2,
      title: "24x7 Emergency Services",
      subtitle: "Round-the-clock emergency care with state-of-the-art medical facilities",
      buttonText: "Emergency Contact",
      icon: Phone
    },
    {
      image: heroImage3,
      title: "Modern Operation Theatres",
      subtitle: "Advanced surgical facilities with experienced medical professionals",
      buttonText: "Learn More",
      icon: Award
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
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => {
        const Icon = slide.icon;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay w-full h-full flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                  <div className="mb-6">
                    <Icon className="w-16 h-16 mx-auto mb-4 text-white" />
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 animate-fade-up opacity-90 max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>
                  <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-scale-in">
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;