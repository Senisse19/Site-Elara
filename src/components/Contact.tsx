import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Clock,
  Send 
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, email e mensagem.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entrarei em contato em breve. Obrigado!"
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "victor.senisse@email.com",
      href: "mailto:victor.senisse@email.com"
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "+55 (11) 99999-9999",
      href: "tel:+5511999999999"
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "São Paulo, SP - Brasil",
      href: null
    },
    {
      icon: Clock,
      label: "Horário",
      value: "Seg - Sex: 9:00 - 18:00",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "#",
      color: "hover:text-blue-600"
    },
    {
      icon: Github,
      label: "GitHub", 
      href: "#",
      color: "hover:text-gray-900"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:victor.senisse@email.com",
      color: "hover:text-red-600"
    }
  ];

  return (
    <section id="contato" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pronto para transformar seus processos? Vamos conversar sobre como 
            posso ajudar a automatizar e otimizar seu negócio.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{info.label}</p>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Redes Sociais
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`inline-flex items-center justify-center w-10 h-10 bg-card rounded-full border hover:shadow-glow transition-all duration-300 ${social.color}`}
                    title={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">
                Resposta Rápida Garantida
              </h4>
              <p className="text-sm text-muted-foreground">
                Respondo todas as mensagens em até 24 horas. Para projetos urgentes, 
                entre em contato diretamente por telefone.
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-glow">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Nome completo *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Telefone
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Assunto
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Sobre o que você gostaria de conversar?"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Mensagem *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Conte-me mais sobre seu projeto ou necessidades..."
                    rows={5}
                    className="w-full resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-hero-gradient text-primary-foreground hover:shadow-glow transition-all duration-300"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;