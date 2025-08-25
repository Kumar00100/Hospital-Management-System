import DoctorProfile from "./DoctorProfile";

const DrRobertDavis = () => {
  return (
    <DoctorProfile
      name="Dr. Robert Davis"
      qualifications="MD, FACS"
      specialty="General Surgery"
      experience="12 years"
      rating={4.7}
      reviews={189}
      availability="Mon-Fri: 8AM-6PM"
      location="Floor 1, Surgical Suite"
      phone="+1 (555) 678-9012"
      email="robert.davis@medicare.com"
      bio="Dr. Robert Davis is a general surgeon and Fellow of the American College of Surgeons with extensive experience in minimally invasive and laparoscopic procedures. He specializes in gastrointestinal surgery, hernia repair, and emergency general surgery. Dr. Davis is known for his technical expertise and compassionate patient care."
      services={[
        "Laparoscopic Surgery",
        "Gastrointestinal Surgery",
        "Hernia Repair",
        "Appendectomy",
        "Gallbladder Surgery",
        "Emergency General Surgery"
      ]}
      education={[
        "MD - Johns Hopkins School of Medicine",
        "Residency in General Surgery - Massachusetts General Hospital",
        "Fellowship in Minimally Invasive Surgery - Cleveland Clinic"
      ]}
      certifications={[
        "Board Certified in General Surgery",
        "Fellow of the American College of Surgeons (FACS)",
        "Advanced Trauma Life Support (ATLS)"
      ]}
    />
  );
};

export default DrRobertDavis;
