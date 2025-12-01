import { useState, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import DemoModal from "@/components/DemoModal";
import elaraLogo from "@/assets/elara-logo-white.png";

// Extracted for performance (static allocation) and Clean Code
const AnimatedChar = memo(({ char, index, baseIndex, className }: { char: string, index: number, baseIndex: number, className: string }) => (
  <span
    className={`letter-reveal ${className}`}
    style={{ animationDelay: `${(baseIndex + index) * 0.03}s` }}
  >
    {char === ' ' ? '\u00A0' : char}
  </span>
));

AnimatedChar.displayName = "AnimatedChar";

const AnimatedLine = memo(({ text, baseIndex, className = "text-foreground glow-text" }: { text: string, baseIndex: number, className?: string }) => (
  <>
    {text.split('').map((char, i) => (
      <AnimatedChar key={`${baseIndex}-${i}`} char={char} index={i} baseIndex={baseIndex} className={className} />
    ))}
  </>
));

AnimatedLine.displayName = "AnimatedLine";

const ChatMockup = memo(({ isVisible }: { isVisible: boolean }) => (
  <div className={`lg:w-1/2 flex justify-center w-full transition-all duration-700 delay-300 ${isVisible ? 'animate-fade-in animate-scale-in' : 'opacity-0 scale-95'}`}>
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl animate-pulse"></div>
      <div className="relative glassmorphism rounded-3xl border border-primary/30 shadow-2xl p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-primary/10">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center p-1.5">
              <img src={elaraLogo} alt="Elara" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Clínica Vida & Saúde</p>
              <p className="text-xs text-muted-foreground">Atendente IA • Online</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex gap-2 animate-[slideInLeft_0.5s_ease-out]">
              <div className="bg-primary/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
                <p className="text-sm text-foreground">Olá! Bem-vindo à Clínica Vida & Saúde 👋</p>
              </div>
            </div>
            <div className="flex gap-2 animate-[slideInLeft_0.5s_ease-out_0.5s_backwards]">
              <div className="bg-primary/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                <p className="text-sm text-foreground">Como posso ajudar você hoje?</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end animate-[slideInRight_0.5s_ease-out_1s_backwards]">
              <div className="bg-primary rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                <p className="text-sm text-primary-foreground">Gostaria de agendar uma consulta</p>
              </div>
            </div>
            <div className="flex gap-2 animate-[slideInLeft_0.5s_ease-out_1.5s_backwards]">
              <div className="bg-primary/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[90%]">
                <p className="text-sm text-foreground">Perfeito! Temos horários disponíveis para esta semana. Qual especialidade você precisa? 🏥</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs pt-2 animate-[fadeIn_0.5s_ease-out_2s_backwards]">
            <MessageCircle className="h-3 w-3" />
            <span className="typing-text">Elara está digitando</span>
            <span className="typing-dots">
              <span className="animate-[bounce_1s_infinite]">.</span>
              <span className="animate-[bounce_1s_infinite_0.2s]">.</span>
              <span className="animate-[bounce_1s_infinite_0.4s]">.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

ChatMockup.displayName = "ChatMockup";

const ElaraHero = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section id="inicio" className="min-h-screen flex items-center bg-background relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.png"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.45]"
        style={{ filter: 'brightness(0.8) saturate(1.1)', zIndex: 0 }}
      >
        <source src="/backgroundHero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" style={{ zIndex: 2 }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-24 md:py-20 relative z-10 max-w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div ref={heroRef} className={`lg:w-1/2 space-y-8 transition-all duration-700 flex flex-col items-center lg:items-start text-center lg:text-left ${heroVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Powered by AI</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight break-words">
                <AnimatedLine text="Coloque a Elara" baseIndex={0} />
                <br />
                <AnimatedLine text="para trabalhar" baseIndex={14} />
                <br />
                <AnimatedLine text="na sua empresa" baseIndex={29} />
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold break-words">
                <AnimatedLine
                  text="Atendente com IA • 24/7"
                  baseIndex={44}
                  className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent glow-text"
                />
              </p>
            </div>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-blur-reveal" style={{ animationDelay: '1.5s', opacity: 0 }}>
              Implementamos um agente de IA que <strong className="text-foreground">conversa com seus clientes</strong>,
              automatiza processos, <strong className="text-foreground">qualifica leads</strong> e resolve problemas
              <strong className="text-foreground"> sem parar</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto sm:justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '1.8s', opacity: 0 }}>
              <Button size="lg" onClick={() => setIsDemoModalOpen(true)} className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-glow hover:scale-105 transition-all duration-300 text-white group">
                Agendar Demonstração
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("capacidades")} className="border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all duration-300">
                Conhecer Funcionalidades
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-8 opacity-70">
              <div className="flex gap-6 grayscale opacity-50">
                {/* Placeholder for company logos */}
              </div>
            </div>
          </div>

          <ChatMockup isVisible={heroVisible} />
        </div>
      </div>
      <DemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </section>
  );
};

export default ElaraHero;