import DoctorProfile from "./DoctorProfile";

const DrSarahJohnson = () => {
  return (
    <DoctorProfile
      name="Dr. Sarah Johnson"
      qualifications="MD, FACC"
      specialty="Cardiology"
      experience="12 years"
      rating={4.8}
      reviews={156}
      availability="Mon-Fri: 9AM-5PM"
      location="Floor 3, Cardiology Wing"
      phone="+1 (555) 123-4567"
      email="sarah.johnson@medicare.com"
      bio="Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in cardiovascular medicine. She specializes in preventive cardiology, heart failure management, and interventional cardiology procedures. Dr. Johnson is committed to providing personalized care and staying at the forefront of cardiac treatment advancements."
      services={[
        "Cardiac Catheterization",
        "Echocardiography",
        "Stress Testing",
        "Heart Failure Management",
        "Preventive Cardiology",
        "Coronary Angioplasty"
      ]}
      education={[
        "MD - Harvard Medical School",
        "Residency in Internal Medicine - Johns Hopkins Hospital",
        "Fellowship in Cardiology - Mayo Clinic"
      ]}
      certifications={[
        "Board Certified in Cardiology",
        "Fellow of the American College of Cardiology (FACC)",
        "Advanced Cardiac Life Support (ACLS)"
      ]}
    />
  );
};

export default DrSarahJohnson;
