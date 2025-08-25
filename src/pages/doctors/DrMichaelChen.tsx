import DoctorProfile from "./DoctorProfile";

const DrMichaelChen = () => {
  return (
    <DoctorProfile
      name="Dr. Michael Chen"
      qualifications="MD, PhD"
      specialty="Neurology"
      experience="8 years"
      rating={4.7}
      reviews={89}
      availability="Tue, Thu, Sat: 10AM-6PM"
      location="Floor 2, Neurology Department"
      phone="+1 (555) 234-5678"
      email="michael.chen@medicare.com"
      bio="Dr. Michael Chen is a neurologist with a PhD in Neuroscience and extensive experience in treating neurological disorders. He specializes in stroke management, epilepsy treatment, and movement disorders. Dr. Chen is known for his compassionate approach and dedication to patient education."
      services={[
        "Stroke Management",
        "Epilepsy Treatment",
        "Movement Disorders",
        "Headache Management",
        "Neuropathy Treatment",
        "Cognitive Disorders"
      ]}
      education={[
        "MD, PhD - Stanford University School of Medicine",
        "Residency in Neurology - Massachusetts General Hospital",
        "Fellowship in Stroke Neurology - UCLA Medical Center"
      ]}
      certifications={[
        "Board Certified in Neurology",
        "Certified in Neurocritical Care",
        "Advanced Stroke Life Support"
      ]}
    />
  );
};

export default DrMichaelChen;
