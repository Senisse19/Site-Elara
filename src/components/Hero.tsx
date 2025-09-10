import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center bg-section-gradient">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
                Olá, eu sou
                <span className="text-primary block">Victor Senisse</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                Gestor de Automação & Engenheiro de Software
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Transformo processos complexos em soluções automatizadas eficientes, 
              desenvolvendo sistemas que impulsionam a produtividade e o crescimento dos negócios.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => scrollToSection("servicos")}
                className="bg-hero-gradient text-primary-foreground hover:shadow-glow transition-all duration-300"
              >
                Conheça meus serviços
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contato")}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Vamos conversar
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <span className="text-muted-foreground">Conecte-se:</span>
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Github className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-hero-gradient rounded-full blur-3xl opacity-20 scale-110"></div>
              <img
                src="/lovable-uploads/c0cd82a0-4b17-4f64-8383-756072bbade9.png"
                alt="Victor de Almeida Senisse"
                className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-glow"
              />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-20">
          <Button
            variant="ghost"
            onClick={() => scrollToSection("sobre")}
            className="animate-bounce text-muted-foreground hover:text-primary"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;