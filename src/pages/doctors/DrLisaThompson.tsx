import DoctorProfile from "./DoctorProfile";

const DrLisaThompson = () => {
  return (
    <DoctorProfile
      name="Dr. Lisa Thompson"
      qualifications="DDS, MS"
      specialty="Dental Surgery"
      experience="8 years"
      rating={4.8}
      reviews={145}
      availability="Mon-Wed-Fri: 8AM-5PM, Tue-Thu: 10AM-7PM"
      location="Floor 2, Dental Clinic"
      phone="+1 (555) 567-8901"
      email="lisa.thompson@medicare.com"
      bio="Dr. Lisa Thompson is a dental surgeon specializing in cosmetic and restorative dentistry. With a Master's in Oral Surgery, she provides comprehensive dental care with a focus on patient comfort and aesthetic results. Dr. Thompson is committed to helping patients achieve healthy, beautiful smiles."
      services={[
        "Cosmetic Dentistry",
        "Dental Implants",
        "Root Canal Treatment",
        "Teeth Whitening",
        "Oral Surgery",
        "Preventive Dentistry"
      ]}
      education={[
        "DDS - Harvard School of Dental Medicine",
        "MS in Oral Surgery - University of California, San Francisco",
        "Residency in Advanced General Dentistry"
      ]}
      certifications={[
        "Board Certified in Dental Surgery",
        "Fellow of the American College of Dentists",
        "Certified in Dental Implantology"
      ]}
    />
  );
};

export default DrLisaThompson;
