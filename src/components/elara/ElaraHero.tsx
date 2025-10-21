import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import chatMockup from "@/assets/chat-mockup.png";
import DemoModal from "@/components/DemoModal";

const ElaraHero = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center bg-background relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div 
            ref={heroRef}
            className={`lg:w-1/2 space-y-8 transition-all duration-700 ${
              heroVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Powered by AI</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Coloque a{" "}
                <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Elara
                </span>
                , sua Atendente com IA, para trabalhar na sua empresa
              </h1>
            </div>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Treinamos e implementamos uma agente de IA generativa que fala com seus clientes, 
              automatiza processos, qualifica leads e resolve problemas 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-glow hover:scale-105 transition-all duration-300 text-white group"
              >
                Agendar Demonstração
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("capacidades")}
                className="border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all duration-300"
              >
                Conhecer Funcionalidades
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-8 opacity-70">
              <p className="text-sm text-muted-foreground">Apoiado por grandes empresas</p>
              <div className="flex gap-6 grayscale opacity-50">
                {/* Placeholder for company logos */}
              </div>
            </div>
          </div>
          
          {/* Chat Visual Mockup */}
          <div 
            className={`lg:w-1/2 flex justify-center w-full transition-all duration-700 delay-300 ${
              heroVisible ? 'animate-fade-in animate-scale-in' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative w-full max-w-md">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-3xl animate-pulse"></div>
              
              {/* Chat mockup image */}
              <div className="relative">
                <img 
                  src={chatMockup} 
                  alt="Simulação de chat com Elara" 
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </section>
  );
};

export default ElaraHero;
