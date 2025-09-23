import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
    budget: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      budget: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          budget: formData.budget,
          message: formData.message
        }]);

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Erro ao enviar",
          description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Retornarei em breve!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        budget: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "senissevictor@gmail.com",
      href: "mailto:senissevictor@gmail.com"
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "+55 (51) 98122-1324",
      href: "tel:+5551981221324"
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Porto Alegre, RS - Brasil",
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
      href: "https://www.linkedin.com/in/victorsenisse/",
      color: "hover:text-blue-600"
    },
    {
      icon: () => (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      label: "Instagram",
      href: "https://www.instagram.com/victor.senisse/",
      color: "hover:text-pink-600"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:senissevictor@gmail.com",
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
                      Faixa de Orçamento
                    </label>
                    <Select onValueChange={handleSelectChange} value={formData.budget}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma faixa de orçamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ate-1500">Até R$ 1.500</SelectItem>
                        <SelectItem value="1500-5000">De R$ 1.500 a R$ 5.000</SelectItem>
                        <SelectItem value="acima-5000">Acima de R$ 5.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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