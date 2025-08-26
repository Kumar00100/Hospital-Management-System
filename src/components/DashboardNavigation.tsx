import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LayoutDashboard, Shield, Stethoscope, User, UserCog } from "lucide-react";
import { Link } from "react-router-dom";

const dashboards = [
  {
    role: "Admin",
    path: "/admin/dashboard",
    icon: Shield,
    description: "Full system control.",
  },
  {
    role: "Doctor",
    path: "/login/doctor",
    icon: Stethoscope,
    description: "Manage appointments.",
  },
  {
    role: "Staff",
    path: "/login/staff",
    icon: UserCog,
    description: "Patient registration.",
  },
  {
    role: "Patient",
    path: "/login/patient",
    icon: User,
    description: "Access your records.",
  },
];

const DashboardNavigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dashboards</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {dashboards.map((dashboard) => {
                const Icon = dashboard.icon;
                return (
                  <NavigationMenuLink key={dashboard.role} asChild>
                    <Link
                      to={dashboard.path}
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <Icon className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {dashboard.role}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {dashboard.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                );
              })}
            </div>
            <div className="p-4 text-center">
                <Link to="/dashboards" className="text-sm font-medium text-primary hover:underline">
                    View All Dashboards
                </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DashboardNavigation;
