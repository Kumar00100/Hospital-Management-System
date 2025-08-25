import { Phone, Mail, Clock, Globe, ChevronDown, LogOut, User, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const TopBar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const languages = [
    { code: "en", name: "English", flag: "🇮🇳" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "or", name: "Oriya", flag: "🇮🇳" }
  ];

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
    console.log(`Language changed to: ${language}`);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-500';
      case 'doctor': return 'text-blue-500';
      case 'staff': return 'text-green-500';
      case 'patient': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 relative z-[1000]">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center space-x-6">
          <h1 className="font-semibold">Medicare Hospital</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span className="font-medium">Emergency: (555) 911-0000</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>info@medicarehospital.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>24/7 Emergency Services</span>
          </div>
          
          {/* Authentication Status */}
          {isAuthenticated && user && (
            <div className="flex items-center space-x-3 border-l border-primary-foreground/20 pl-4">
              <div className="flex items-center space-x-2">
                <Shield className={`w-4 h-4 ${getRoleColor(user.role)}`} />
                <span className={`font-medium ${getRoleColor(user.role)}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{user.name}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-primary-foreground hover:bg-primary-foreground/10">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          
          {/* Language Selector */}
          <div className="relative z-[1001]">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center space-x-2 hover:bg-primary-foreground/10 px-3 py-1 rounded transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {isLanguageOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg min-w-[150px] z-[9999]">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.name)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 ${
                      selectedLanguage === language.name 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close language dropdown */}
      {isLanguageOpen && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => setIsLanguageOpen(false)}
        />
      )}
    </div>
  );
};

export default TopBar;
