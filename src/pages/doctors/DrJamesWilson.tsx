import DoctorProfile from "./DoctorProfile";

const DrJamesWilson = () => {
  return (
    <DoctorProfile
      name="Dr. James Wilson"
      qualifications="MD, FAAP"
      specialty="Pediatrics"
      experience="15 years"
      rating={4.6}
      reviews={178}
      availability="Mon-Fri: 9AM-5PM, Sat: 9AM-1PM"
      location="Floor 4, Pediatrics Department"
      phone="+1 (555) 456-7890"
      email="james.wilson@medicare.com"
      bio="Dr. James Wilson is a board-certified pediatrician with over 15 years of experience in child healthcare. He specializes in preventive care, childhood development, and managing chronic pediatric conditions. Dr. Wilson is known for his gentle approach with children and his dedication to family-centered care."
      services={[
        "Well-child Visits",
        "Vaccinations",
        "Childhood Development Monitoring",
        "Asthma Management",
        "Allergy Treatment",
        "Behavioral Health"
      ]}
      education={[
        "MD - University of Pennsylvania School of Medicine",
        "Residency in Pediatrics - Children's Hospital of Philadelphia",
        "Fellowship in Pediatric Allergy and Immunology"
      ]}
      certifications={[
        "Board Certified in Pediatrics",
        "Fellow of the American Academy of Pediatrics (FAAP)",
        "Pediatric Advanced Life Support (PALS)"
      ]}
    />
  );
};

export default DrJamesWilson;
