import { Button } from "@/components/ui/button";
import { ArrowDown, Linkedin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2);
  const { elementRef: imageRef, isVisible: imageVisible } = useScrollAnimation(0.3);

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
          <div 
            ref={heroRef}
            className={`lg:w-1/2 space-y-8 transition-all duration-700 ${
              heroVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground pt-8 md:pt-0">
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
                Conheça nossos Pacotes
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <span className="text-muted-foreground">Conecte-se:</span>
              <div className="flex gap-3">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:text-primary"
                  onClick={() => window.open("https://www.linkedin.com/in/victorsenisse/", "_blank")}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:text-primary"
                  onClick={() => window.open("https://www.instagram.com/victor.senisse/", "_blank")}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:text-primary"
                  onClick={() => window.open("https://www.tiktok.com/@victor.senisse?_t=ZM-90O5m3Zzlw8&_r=1", "_blank")}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div 
              ref={imageRef}
              className={`relative transition-all duration-1000 delay-300 ${
                imageVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
              }`}
            >
              <div className="absolute inset-0 bg-hero-gradient rounded-full blur-3xl opacity-20 scale-110"></div>
              <img
                src="/lovable-uploads/profile-photo-1.png"
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