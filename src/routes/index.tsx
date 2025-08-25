import { ProtectedRoute } from "@/components/ProtectedRoute";
import AdminDashboard from "@/pages/AdminDashboard";
import RegisterUserDashboard from "@/pages/RegisterUserDashboard";
import AppointmentBookingPage from "@/pages/AppointmentBookingPage";
import { AdminLogin } from "@/pages/auth/AdminLogin";
import { DoctorLogin } from "@/pages/auth/DoctorLogin";
import { PatientLogin } from "@/pages/auth/PatientLogin";
import PatientRegister from "@/pages/auth/PatientRegister";
import { StaffLogin } from "@/pages/auth/StaffLogin";
import DashboardLinksPage from "@/pages/DashboardLinksPage";
import DoctorDashboard from "@/pages/DoctorDashboard";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import PatientDashboard from "@/pages/PatientDashboard";
import StaffDashboard from "@/pages/StaffDashboard";
import Departments from "@/pages/Departments";
import Cardiology from "@/pages/departments/Cardiology";
import Neurology from "@/pages/departments/Neurology";
import Orthopedics from "@/pages/departments/Orthopedics";
import Pediatrics from "@/pages/departments/Pediatrics";
import Dental from "@/pages/departments/Dental";
import Ophthalmology from "@/pages/departments/Ophthalmology";
import ENT from "@/pages/departments/ENT";
import Surgery from "@/pages/departments/Surgery";
import DrSarahJohnson from "@/pages/doctors/DrSarahJohnson";
import DrMichaelChen from "@/pages/doctors/DrMichaelChen";
import DrEmilyRodriguez from "@/pages/doctors/DrEmilyRodriguez";
import DrJamesWilson from "@/pages/doctors/DrJamesWilson";
import DrLisaThompson from "@/pages/doctors/DrLisaThompson";
import DrRobertDavis from "@/pages/doctors/DrRobertDavis";
import DrDavidKim from "@/pages/doctors/DrDavidKim";
import DrJenniferLee from "@/pages/doctors/DrJenniferLee";
import TestNavigation from "@/components/TestNavigation";
import { UserRole } from "@/types/user.types";
import { Route, Routes } from "react-router-dom";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  public?: boolean;
  allowedRoles?: UserRole[];
}

export const routes: RouteConfig[] = [
  // Public Routes
  { path: "/", element: <Index />, public: true },
  { path: "/login/admin", element: <AdminLogin />, public: true },
  { path: "/login/doctor", element: <DoctorLogin />, public: true },
  { path: "/login/staff", element: <StaffLogin />, public: true },
  { path: "/login/patient", element: <PatientLogin />, public: true },
  { path: "/register", element: <PatientRegister />, public: true },
  { path: "/user-dashboard", element: <RegisterUserDashboard />, public: true },
  { path: "/appointment", element: <AppointmentBookingPage />, public: true },
  { path: "/dashboards", element: <DashboardLinksPage />, public: true },
  
  // Department Routes
  { path: "/departments", element: <Departments />, public: true },
  { path: "/departments/cardiology", element: <Cardiology />, public: true },
  { path: "/departments/neurology", element: <Neurology />, public: true },
  { path: "/departments/orthopedics", element: <Orthopedics />, public: true },
  { path: "/departments/pediatrics", element: <Pediatrics />, public: true },
  { path: "/departments/dental", element: <Dental />, public: true },
  { path: "/departments/ophthalmology", element: <Ophthalmology />, public: true },
  { path: "/departments/ent", element: <ENT />, public: true },
  { path: "/departments/surgery", element: <Surgery />, public: true },
  { path: "/doctors/dr-sarah-johnson", element: <DrSarahJohnson />, public: true },
  { path: "/doctors/dr-michael-chen", element: <DrMichaelChen />, public: true },
  { path: "/doctors/dr-emily-rodriguez", element: <DrEmilyRodriguez />, public: true },
  { path: "/doctors/dr-james-wilson", element: <DrJamesWilson />, public: true },
  { path: "/doctors/dr-lisa-thompson", element: <DrLisaThompson />, public: true },
  { path: "/doctors/dr-robert-davis", element: <DrRobertDavis />, public: true },
  { path: "/doctors/dr-david-kim", element: <DrDavidKim />, public: true },
  { path: "/doctors/dr-jennifer-lee", element: <DrJenniferLee />, public: true },
  { path: "/test-navigation", element: <TestNavigation />, public: true },

  // Protected Dashboard Routes
  { path: "/admin/dashboard", element: <AdminDashboard />, allowedRoles: ['admin'] },
  { path: "/doctor/dashboard", element: <DoctorDashboard />, allowedRoles: ['doctor'] },
  { path: "/staff/dashboard", element: <StaffDashboard />, allowedRoles: ['staff'] },
  { path: "/patient/dashboard", element: <PatientDashboard />, allowedRoles: ['patient'] },
  
  // Protected User Management Routes
  { path: "/profile", element: <PatientDashboard />, allowedRoles: ['patient'] },
  { path: "/medical-records", element: <PatientDashboard />, allowedRoles: ['patient'] },
  { path: "/appointments/history", element: <PatientDashboard />, allowedRoles: ['patient'] },
  
  // Protected Staff Management Routes
  { path: "/staff/patients", element: <StaffDashboard />, allowedRoles: ['staff'] },
  { path: "/staff/appointments", element: <StaffDashboard />, allowedRoles: ['staff'] },
  
  // Protected Doctor Management Routes
  { path: "/doctor/schedule", element: <DoctorDashboard />, allowedRoles: ['doctor'] },
  { path: "/doctor/patients", element: <DoctorDashboard />, allowedRoles: ['doctor'] },
  { path: "/doctor/prescriptions", element: <DoctorDashboard />, allowedRoles: ['doctor'] },
  
  // Protected Admin Management Routes
  { path: "/admin/users", element: <AdminDashboard />, allowedRoles: ['admin'] },
  { path: "/admin/departments", element: <AdminDashboard />, allowedRoles: ['admin'] },
  { path: "/admin/reports", element: <AdminDashboard />, allowedRoles: ['admin'] },
  
  // Catch-all route
  { path: "*", element: <NotFound /> },
];

export const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const { path, element, allowedRoles } = route;
        if (allowedRoles) {
          return (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute allowedRoles={allowedRoles}>
                  {element}
                </ProtectedRoute>
              }
            />
          );
        }
        return <Route key={index} path={path} element={element} />;
      })}
    </Routes>
  );
};
