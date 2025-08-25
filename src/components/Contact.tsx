import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder submit; can be wired to backend or email service
    await new Promise((r) => setTimeout(r, 1000));
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  return (
    <section className="py-16 bg-muted/30" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-header">Contact Us</h2>
          <p className="section-subtext">We’re here to help and answer any questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="medical-card">
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-muted-foreground">123 Healthcare Ave, Medical District, City 12345</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div className="text-muted-foreground">+1 (555) 123-4567</div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div className="text-muted-foreground">info@medicareplus.com</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                Google Map embed can be placed here.
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="medical-card space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help you?" />
            </div>
            <div>
              <Button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;


