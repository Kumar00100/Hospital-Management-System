import TopBar from "@/components/TopBar";
import ModernNavigation from "@/components/ModernNavigation";
import ModernHeroSlider from "@/components/ModernHeroSlider";
import ModernServices from "@/components/ModernServices";
import MissionVision from "@/components/MissionVision";
import Departments from "@/components/Departments";
import Doctors from "@/components/Doctors";
import Testimonials from "@/components/Testimonials";
import AppointmentBooking from "@/components/AppointmentBooking";
import ModernFooter from "@/components/ModernFooter";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <ModernNavigation />
      <ModernHeroSlider />
      <ModernServices />
      <MissionVision />
      <Departments />
      <Doctors />
      <Testimonials />
      <Gallery />
      <Contact />
      <AppointmentBooking />
      <ModernFooter />
    </div>
  );
};

export default Index;
