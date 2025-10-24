import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, CheckCircle, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
const About = () => {
  const {
    elementRef: titleRef,
    isVisible: titleVisible
  } = useScrollAnimation(0.2);
  const {
    elementRef: contentRef,
    isVisible: contentVisible
  } = useScrollAnimation(0.3);
  const {
    elementRef: statsRef,
    isVisible: statsVisible
  } = useScrollAnimation(0.2);
  const isMobile = useIsMobile();
  const [api, setApi] = React.useState<CarouselApi>();
  useEffect(() => {
    if (!api || !isMobile) return;
    const intervalId = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);
    return () => clearInterval(intervalId);
  }, [api, isMobile]);
  const stats = [{
    icon: Clock,
    value: "5+",
    label: "Anos de Experiência",
    description: "Desenvolvendo soluções"
  }, {
    icon: TrendingUp,
    value: "50+",
    label: "Processos Automatizados",
    description: "Eficiência comprovada"
  }, {
    icon: Users,
    value: "30+",
    label: "Clientes Atendidos",
    description: "Projetos entregues"
  }, {
    icon: CheckCircle,
    value: "100%",
    label: "Taxa de Sucesso",
    description: "Satisfação garantida"
  }];
  const technologies = ["Chatwoot", "Coolify", "n8n", "Google Gemini", "Claude", "ElevenLabs", "RetailAI", "Lovable", "OpenRouter", "Evolution API", "TypeScript", "Python", "Node.js", "JavaScript"];
  return <section id="sobre" className="py-12 sm:py-20 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
         <div ref={titleRef} className={`text-center mb-8 sm:mb-16 transition-all duration-700 ${titleVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground glow-text mb-4">
             Sobre Mim
           </h2>
           <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
             Com mais de 5 anos de experiência em automação e desenvolvimento, 
             ajudo empresas a transformar processos manuais em soluções eficientes.
           </p>
         </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Imagem - sempre visível */}
          <div className="w-full flex justify-center">
            <img src="/lovable-uploads/profile-photo-2.png" alt="Victor Senisse - Perfil Profissional" className="w-full max-w-[300px] sm:max-w-sm md:max-w-md rounded-2xl shadow-card object-cover" />
          </div>
          
          {/* Conteúdo de texto */}
          <div ref={contentRef} className={`w-full space-y-6 transition-all duration-700 ${contentVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                Transformando Ideias em Soluções
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Me chamo Victor, e com mais de 5 anos de experiência em desenvolvimento de software e gestão de automação, sou especializado em criar sistemas que otimizam processos empresariais e aumentam a produtividade das equipes.</p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Minha abordagem combina conhecimento técnico sólido com uma visão estratégica de negócios, 
                garantindo que cada solução desenvolvida gere valor real para os clientes.
              </p>
            </div>
            
            <div className="space-y-4 w-full overflow-hidden">
              <h4 className="text-base sm:text-lg font-semibold text-foreground">Principais Tecnologias:</h4>
              <div className="w-full overflow-hidden py-4">
                <div className="flex gap-3 sm:gap-4 animate-marquee-seamless">
                  {[...technologies, ...technologies].map((tech, index) => <Badge key={index} variant="secondary" className="text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground hover:from-primary hover:to-primary/90 hover:text-primary-foreground transition-all duration-300 whitespace-nowrap flex-shrink-0 shadow-lg hover:shadow-glow hover:scale-105 border border-primary/20">
                      {tech}
                    </Badge>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMobile ? <div ref={statsRef} className={`w-full space-y-6 transition-all duration-700 ${statsVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
            <Carousel setApi={setApi} opts={{
          align: "start",
          loop: true
        }} className="w-full max-w-full">
              <CarouselContent className="-ml-2">
                {stats.map((stat, index) => <CarouselItem key={index} className="pl-2 basis-full">
                    <Card className="p-6 text-center hover:shadow-glow transition-all duration-300 bg-card-gradient border-primary/20">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                      <div className="text-xs text-muted-foreground">{stat.description}</div>
                    </Card>
                  </CarouselItem>)}
              </CarouselContent>
            </Carousel>
            
            {/* Navigation arrows below */}
            <div className="flex justify-center items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-card border-primary/30 hover:bg-primary/10 hover:border-primary transition-all" onClick={() => api?.scrollPrev()}>
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-card border-primary/30 hover:bg-primary/10 hover:border-primary transition-all" onClick={() => api?.scrollNext()}>
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>
          </div> : <div ref={statsRef} className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${statsVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => <Card key={index} className="p-6 text-center hover:shadow-glow transition-all duration-300 hover:scale-105 bg-card-gradient border-primary/20">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </Card>)}
          </div>}
      </div>
    </section>;
};
export default About;