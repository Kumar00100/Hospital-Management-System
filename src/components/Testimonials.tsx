import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "John Smith",
      condition: "Heart Surgery",
      rating: 5,
      review: "Dr. Sarah Johnson and her team provided exceptional care during my heart surgery. The staff was professional, caring, and made me feel comfortable throughout the entire process.",
      location: "New York"
    },
    {
      name: "Maria Garcia",
      condition: "Pediatric Care",
      rating: 5,
      review: "Dr. James Wilson has been taking care of my children for years. He's patient, knowledgeable, and always makes my kids feel at ease during their visits.",
      location: "California"
    },
    {
      name: "David Lee",
      condition: "Orthopedic Treatment",
      rating: 5,
      review: "After my sports injury, Dr. Emily Rodriguez helped me get back on my feet. The treatment was effective, and the recovery process was smooth. Highly recommend!",
      location: "Texas"
    },
    {
      name: "Sarah Wilson",
      condition: "Dental Care",
      rating: 4,
      review: "The dental department at Medicare Hospital is outstanding. Dr. Lisa Thompson performed my root canal treatment with minimal discomfort. Great facilities and staff!",
      location: "Florida"
    },
    {
      name: "Robert Johnson",
      condition: "Emergency Care",
      rating: 5,
      review: "When I had a medical emergency, the hospital staff acted quickly and efficiently. The 24/7 emergency services are truly reliable. Thank you for saving my life!",
      location: "Ohio"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-muted/30" id="testimonials">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-header">What Our Patients Say</h2>
          <p className="section-subtext">
            Real experiences from patients who trusted us with their healthcare needs
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="testimonial-card max-w-3xl mx-auto text-center">
                    <Quote className="testimonial-quote" />
                    <div className="mb-6">
                      {renderStars(testimonial.rating)}
                    </div>
                    <blockquote className="text-lg text-foreground mb-8 leading-relaxed italic">
                      "{testimonial.review}"
                    </blockquote>
                    <div className="border-t border-border pt-6">
                      <h4 className="font-semibold text-foreground text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-primary font-medium mb-1">
                        {testimonial.condition}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:shadow-lg rounded-full p-2 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:shadow-lg rounded-full p-2 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;