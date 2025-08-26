import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import{Link}from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, UserPlus, LogIn, Calendar, User, LogOut, Settings } from "lucide-react";
import React from "react";
import DashboardNavigation from "./DashboardNavigation";
import { useAuth } from "@/contexts/AuthContext";

// Mock data that would typically come from an API
const departments = [
  { name: "Cardiology", href: "cardiology", },
  { name: "Neurology", href: "neurology" },
  { name: "Orthopedics", href: "orthopedics" },
  { name: "Pediatrics", href: "pediatrics" },
  { name: "Dental", href: "dental" },
  { name: "Ophthalmology", href: "ophthalmology" },
  { name: "ENT", href: "ent" },
  { name: "Surgery", href: "surgery" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              Medicare<span className="text-secondary">+</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="#home" 
                    className="font-medium hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink href="#about" className="font-medium hover:text-primary">
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {/* ✅ Departments Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Departments</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      {/* {departments.map((dept) => (
                        <NavigationMenuLink
                          key={dept.name}
                          href={`/departments/${dept.name.toLowerCase()}`}
                          className="block p-3 rounded-md hover:bg-accent transition-colors"
                        >
                          <div className="font-medium">{dept.name}</div>
                        </NavigationMenuLink>
                      ))} */}
                      {departments.map((dept) => (
                        <NavigationMenuLink
                          asChild
                          key={dept.name}
                        >
                          <Link
                            to={`/departments/${dept.href}`}
                            className="block p-3 rounded-md hover:bg-accent transition-colors text-left w-full"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="font-medium">{dept.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                          
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/doctors" 
                    className="font-medium hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/doctors');
                    }}
                  >
                    Doctors
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#services" className="font-medium hover:text-primary">
                    Services
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#testimonials" className="font-medium hover:text-primary">
                    Testimonials
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <DashboardNavigation />
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#contact" className="font-medium hover:text-primary">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/profile')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <Button 
                  className="btn-primary"
                  onClick={() => navigate('/appointment')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/login/patient')}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <a 
                href="#home" 
                className="p-2 hover:bg-accent rounded"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsOpen(false);
                }}
              >
                Home
              </a>
              <a href="#about" className="p-2 hover:bg-accent rounded">About Us</a>
              <div className="p-2 font-medium">Departments</div>
              {departments.map((dept) => (
                <a 
                  key={dept.name}
                  href={`/departments/${dept.href}`}
                  className="pl-6 p-2 hover:bg-accent rounded text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/departments/${dept.href}`);
                    setIsOpen(false);
                  }}
                >
                  {dept.name}
                </a>
              ))}
              <a 
                href="/doctors" 
                className="p-2 hover:bg-accent rounded"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/doctors');
                  setIsOpen(false);
                }}
              >
                Doctors
              </a>
              <a href="#services" className="p-2 hover:bg-accent rounded">Services</a>
              <a href="#testimonials" className="p-2 hover:bg-accent rounded">Testimonials</a>
              <a href="/dashboards" className="p-2 hover:bg-accent rounded">Dashboards</a>
              <a href="#contact" className="p-2 hover:bg-accent rounded">Contact</a>
              <div className="flex flex-col space-y-2 pt-4">
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/profile')}
                    >
                      Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                    <Button 
                      className="btn-primary"
                      onClick={() => navigate('/appointment')}
                    >
                      Book Appointment
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/login/patient')}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/register')}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;