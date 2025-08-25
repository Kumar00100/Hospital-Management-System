import DoctorProfile from "./DoctorProfile";

const DrEmilyRodriguez = () => {
  return (
    <DoctorProfile
      name="Dr. Emily Rodriguez"
      qualifications="MD, MS"
      specialty="Orthopedic Surgery"
      experience="10 years"
      rating={4.9}
      reviews={203}
      availability="Mon-Fri: 8AM-4PM"
      location="Floor 1, Orthopedics Wing"
      phone="+1 (555) 345-6789"
      email="emily.rodriguez@medicare.com"
      bio="Dr. Emily Rodriguez is an orthopedic surgeon specializing in sports medicine and joint replacement. With a Master's in Biomechanics, she brings a unique approach to orthopedic care. Dr. Rodriguez is committed to helping patients regain mobility and return to their active lifestyles."
      services={[
        "Joint Replacement Surgery",
        "Sports Medicine",
        "Arthroscopic Surgery",
        "Fracture Care",
        "Spinal Surgery",
        "Rehabilitation Planning"
      ]}
      education={[
        "MD - Yale School of Medicine",
        "MS in Biomechanics - Columbia University",
        "Residency in Orthopedic Surgery - Hospital for Special Surgery",
        "Fellowship in Sports Medicine - Andrews Sports Medicine Center"
      ]}
      certifications={[
        "Board Certified in Orthopedic Surgery",
        "Fellow of the American Academy of Orthopedic Surgeons",
        "Sports Medicine Specialist"
      ]}
    />
  );
};

export default DrEmilyRodriguez;
