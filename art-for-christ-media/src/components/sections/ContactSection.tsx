import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented with backend
  };

  return (
    <section id="contact" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Contact
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Restons en <span className="text-gradient-gold">Contact</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Vous souhaitez nous rejoindre, nous inviter pour une prestation,
                ou simplement en savoir plus ? N'hésitez pas à nous contacter !
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Adresse
                  </h3>
                  <p className="text-muted-foreground">
                    Église MEEC Centre
                    <br />
                    Yaoundé, Cameroun
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Email
                  </h3>
                  <p className="text-muted-foreground">
                    artpourchrist@meec-centre.org
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Téléphone
                  </h3>
                  <p className="text-muted-foreground">+237 6XX XXX XXX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <Card className="shadow-elevated">
            <CardHeader>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Envoyez-nous un message
              </h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Prénom
                    </label>
                    <Input placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Nom
                    </label>
                    <Input placeholder="Votre nom" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input type="email" placeholder="votre@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Sujet
                  </label>
                  <Input placeholder="L'objet de votre message" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    placeholder="Votre message..."
                    className="min-h-[120px] resize-none"
                  />
                </div>
                <Button type="submit" variant="gold" className="w-full">
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
