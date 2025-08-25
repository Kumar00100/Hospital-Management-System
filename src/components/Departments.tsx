// import { 
//   Heart, 
//   Brain, 
//   Bone, 
//   Baby, 
//   Smile,
//   Eye,
//   Ear,
//   Scissors
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Departments = () => {
//   const departments = [
//     {
//       icon: Heart,
//       name: "Cardiology",
//       description: "Heart care and cardiovascular treatments",
//       color: "cardiology",
//       specialists: 8
//     },
//     {
//       icon: Brain,
//       name: "Neurology",
//       description: "Brain and nervous system specialists",
//       color: "neurology",
//       specialists: 6
//     },
//     {
//       icon: Bone,
//       name: "Orthopedics",
//       description: "Bone and joint care specialists",
//       color: "orthopedics",
//       specialists: 10
//     },
//     {
//       icon: Baby,
//       name: "Pediatrics",
//       description: "Comprehensive child healthcare",
//       color: "pediatrics",
//       specialists: 12
//     },
//     {
//       icon: Smile,
//       name: "Dental",
//       description: "Complete oral and dental care",
//       color: "dental",
//       specialists: 5
//     },
//     {
//       icon: Eye,
//       name: "Ophthalmology",
//       description: "Eye care and vision treatments",
//       color: "primary",
//       specialists: 4
//     },
//     {
//       icon: Ear,
//       name: "ENT",
//       description: "Ear, nose, and throat specialists",
//       color: "secondary",
//       specialists: 3
//     },
//     {
//       icon: Scissors,
//       name: "Surgery",
//       description: "Advanced surgical procedures",
//       color: "destructive",
//       specialists: 15
//     }
//   ];

//   return (
//     <section className="py-16 bg-muted/30" id="departments">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="section-header">Our Departments</h2>
//           <p className="section-subtext">
//             Specialized medical departments with expert doctors and advanced facilities
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {departments.map((dept, index) => {
//             const Icon = dept.icon;
//             return (
//               <div 
//                 key={index} 
//                 className="department-card group animate-scale-in"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div 
//                   className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
//                   style={{ 
//                     backgroundColor: `hsl(var(--${dept.color}) / 0.1)`,
//                     color: `hsl(var(--${dept.color}))`
//                   }}
//                 >
//                   <Icon className="w-8 h-8" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-foreground mb-2">
//                   {dept.name}
//                 </h3>
//                 <p className="text-muted-foreground mb-4 text-sm">
//                   {dept.description}
//                 </p>
//                 <p className="text-xs text-muted-foreground mb-4">
//                   {dept.specialists} Specialists Available
//                 </p>
//                 <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                   Know More
//                 </Button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Departments;

import { 
  Heart, Brain, Bone, Baby, Smile, Eye, Ear, Scissors 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();

  const departments = [
    { icon: Heart, name: "Cardiology", description: "Heart care and cardiovascular treatments", color: "cardiology", specialists: 8 },
    { icon: Brain, name: "Neurology", description: "Brain and nervous system specialists", color: "neurology", specialists: 6 },
    { icon: Bone, name: "Orthopedics", description: "Bone and joint care specialists", color: "orthopedics", specialists: 10 },
    { icon: Baby, name: "Pediatrics", description: "Comprehensive child healthcare", color: "pediatrics", specialists: 12 },
    { icon: Smile, name: "Dental", description: "Complete oral and dental care", color: "dental", specialists: 5 },
    { icon: Eye, name: "Ophthalmology", description: "Eye care and vision treatments", color: "primary", specialists: 4 },
    { icon: Ear, name: "ENT", description: "Ear, nose, and throat specialists", color: "secondary", specialists: 3 },
    { icon: Scissors, name: "Surgery", description: "Advanced surgical procedures", color: "destructive", specialists: 15 }
  ];

  return (
    <section className="py-16 bg-muted/30" id="departments">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-header">Our Departments</h2>
          <p className="section-subtext">
            Specialized medical departments with expert doctors and advanced facilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <div 
                key={index} 
                className="department-card group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ 
                    backgroundColor: `hsl(var(--${dept.color}) / 0.1)`,
                    color: `hsl(var(--${dept.color}))`
                  }}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {dept.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {dept.description}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {dept.specialists} Specialists Available
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={() => navigate(`/departments/${dept.name.toLowerCase()}`)}
                >
                  Know More
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Departments;
