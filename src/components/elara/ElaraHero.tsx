import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ElaraHero = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2);

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
                onClick={() => scrollToSection("contato")}
                className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-glow transition-all duration-300 text-white group"
              >
                Agendar Demonstração
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("capacidades")}
                className="border-primary/30 hover:bg-primary/10"
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
          <div className="lg:w-1/2 flex justify-center w-full">
            <div className="relative w-full max-w-md">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl"></div>
              
              {/* Chat container */}
              <div className="relative bg-card/50 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 space-y-4">
                {/* Chat messages */}
                <div className="flex justify-end">
                  <div className="bg-primary/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">Gostaria de conhecer o catálogo de vocês.</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-accent rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <span className="text-xs text-primary font-medium">Seu agente Elara</span>
                    </div>
                    <p className="text-sm text-foreground">Claro, José! Vou te enviar um PDF que contém...</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-primary/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">O horário das 17h não está disponível. Posso te sugerir outro?</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-accent rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <span className="text-xs text-primary font-medium">Seu agente Elara</span>
                    </div>
                    <p className="text-sm text-foreground">Claro, posso ajudar com o agendamento da sua consulta.</p>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex justify-start">
                  <div className="bg-accent rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElaraHero;
