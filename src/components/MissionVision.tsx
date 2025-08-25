import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="medical-card text-center animate-fade-up">
            <div className="medical-icon bg-primary/10">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To provide affordable, accessible, and quality healthcare services to all patients, 
              ensuring compassionate care delivered by skilled professionals using state-of-the-art 
              medical technology and evidence-based treatment approaches.
            </p>
          </div>

          {/* Vision */}
          <div className="medical-card text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="medical-icon bg-secondary/10">
              <Eye className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To become the most trusted healthcare provider in the region, recognized for excellence 
              in patient care, medical innovation, and community health improvement while maintaining 
              the highest standards of ethical practice and patient safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;