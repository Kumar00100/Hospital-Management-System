import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserPlus, LogIn, Calendar, Heart, ChevronDown } from "lucide-react";

const ModernNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const navigate = useNavigate();

  // Simple departments list
  const departments = [
    "Cardiology",
    "Neurology", 
    "Orthopedics",
    "Pediatrics",
    "Dental",
    "Ophthalmology",
    "ENT",
    "Surgery"
  ];

  const handleDepartmentClick = (dept: string) => {
    setIsDepartmentsOpen(false);
    navigate(`/departments/${dept.toLowerCase()}`);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-lg">
      <div className="w-full px-5">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 ml-0">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 rounded-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Medicare+
              </div>
              <div className="text-xs text-gray-500 font-medium">Healthcare Excellence</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5">
            <a 
              href="#home" 
              className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 py-2 rounded-lg hover:bg-blue-50"
            >
              Home
            </a>
            
            <a 
              href="#about" 
              className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 py-2 rounded-lg hover:bg-blue-50"
            >
              About Us
            </a>

            {/* Departments Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                onBlur={() => setTimeout(() => setIsDepartmentsOpen(false), 150)}
                className="font-semibold text-gray-700 hover:text-blue-600 bg-transparent hover:bg-blue-50 px-2 py-2 rounded-lg border-0 flex items-center space-x-1"
              >
                <span>Departments</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDepartmentsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDepartmentsOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => handleDepartmentClick(dept)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a 
              href="#doctors" 
              className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 py-2 rounded-lg hover:bg-blue-50"
            >
              Doctors
            </a>

            <a 
              href="#services" 
              className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 py-2 rounded-lg hover:bg-blue-50"
            >
              Services
            </a>

            <a 
              href="#gallery" 
              className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 py-2 rounded-lg hover:bg-blue-50"
            >
              Gallery
            </a>

            <a 
              href="#testimonials" 
              className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              Testimonials
            </a>

            <a 
              href="#contact" 
              className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              Contact
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/login/patient')}
              className="font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/register')}
              className="border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => navigate('/appointment')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 bg-white border-t border-gray-100">
            <div className="flex flex-col space-y-1 pt-4">
              <a href="#home" className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">Home</a>
              <a href="#about" className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">About Us</a>
              
              {/* Mobile Departments */}
              <div className="px-4 py-3">
                <div className="text-gray-700 font-medium mb-2">Departments</div>
                <div className="flex flex-col space-y-1">
                  {departments.map((dept) => (
                    <button 
                      key={dept}
                      onClick={() => {
                        setIsOpen(false);
                        handleDepartmentClick(dept);
                      }}
                      className="px-4 py-2 text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
              
              <a href="#doctors" className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">Doctors</a>
              <a href="#services" className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">Services</a>
              <a href="#contact" className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">Contact</a>
              
              <div className="flex flex-col space-y-2 pt-4 px-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/login/patient')}
                  className="justify-center"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="justify-center border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white justify-center"
                  onClick={() => navigate('/appointment')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ModernNavigation;
