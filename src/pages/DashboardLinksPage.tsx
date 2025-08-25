import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Stethoscope, User, UserCog } from "lucide-react";
import { Link } from "react-router-dom";

const dashboards = [
  {
    role: "Admin",
    path: "/login/admin",
    icon: Shield,
    description: "Full system control and management.",
  },
  {
    role: "Doctor",
    path: "/login/doctor",
    icon: Stethoscope,
    description: "Manage appointments and patient records.",
  },
  {
    role: "Staff",
    path: "/login/staff",
    icon: UserCog,
    description: "Handle patient registration and scheduling.",
  },
  {
    role: "Patient",
    path: "/login/patient",
    icon: User,
    description: "Access your health records and appointments.",
  },
];

const DashboardLinksPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Dashboards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {dashboards.map((dashboard) => {
          const Icon = dashboard.icon;
          return (
            <Card key={dashboard.role} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <Icon className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>{dashboard.role}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{dashboard.description}</p>
                <Button asChild className="w-full">
                  <Link to={dashboard.path}>Go to {dashboard.role} Login</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardLinksPage;
