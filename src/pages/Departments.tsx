import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Brain, Bone, Baby, Smile } from "lucide-react";

const Departments = () => {
  const navigate = useNavigate();

  const departments = [
    {
      name: "Cardiology",
      icon: Heart,
      description: "Heart and cardiovascular care specialists",
      color: "text-red-500",
      bgColor: "bg-red-50",
      doctors: 8,
      location: "Building A, Floor 3"
    },
    {
      name: "Neurology",
      icon: Brain,
      description: "Brain and nervous system specialists",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      doctors: 6,
      location: "Building B, Floor 2"
    },
    {
      name: "Orthopedics",
      icon: Bone,
      description: "Bone and joint care specialists",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      doctors: 10,
      location: "Building A, Floor 2"
    },
    {
      name: "Pediatrics",
      icon: Baby,
      description: "Children's healthcare specialists",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      doctors: 12,
      location: "Building C, Floor 1"
    },
    {
      name: "Dental",
      icon: Smile,
      description: "Oral health and dentistry specialists",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      doctors: 5,
      location: "Building A, Floor 1"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Departments</h1>
          <p className="text-lg text-gray-600">
            Specialized medical departments with expert doctors and advanced facilities
          </p>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <Card 
                key={dept.name}
                className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/departments/${dept.name.toLowerCase()}`)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${dept.bgColor}`}>
                      <Icon className={`w-8 h-8 ${dept.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{dept.name}</CardTitle>
                      <p className="text-sm text-gray-500">{dept.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{dept.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {dept.doctors} Specialists Available
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Departments;
