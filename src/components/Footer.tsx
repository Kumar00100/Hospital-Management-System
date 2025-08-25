import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Departments", href: "#departments" },
    { name: "Doctors", href: "#doctors" },
    { name: "Services", href: "#services" },
    { name: "Book Appointment", href: "#appointment" },
    { name: "Contact Us", href: "#contact" }
  ];

  const services = [
    "Emergency Care",
    "Surgery",
    "Laboratory",
    "Radiology",
    "Pharmacy",
    "Ambulance"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hospital Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold">
                Medicare<span className="text-secondary-light">+</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Providing quality healthcare services with compassion and excellence. 
              Your health and well-being are our top priorities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-primary-foreground/80">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/80">
                    123 Medical Center Drive<br />
                    Healthcare City, HC 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/80">Emergency: (555) 911-0000</p>
                  <p className="text-primary-foreground/80">General: (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <p className="text-primary-foreground/80">info@medicarehospital.com</p>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/80">
                    Emergency: 24/7<br />
                    OPD: Mon-Sat, 8AM-8PM<br />
                    Sunday: 9AM-5PM
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-secondary-light hover:text-secondary transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="mt-12 mb-8">
          <div className="bg-muted/20 rounded-lg p-4 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-secondary-light" />
            <p className="text-primary-foreground/80">Interactive map would be embedded here</p>
            <p className="text-sm text-primary-foreground/60">Google Maps integration available upon request</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm mb-4 md:mb-0">
              © 2024 Medicare Hospital. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Medical Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;