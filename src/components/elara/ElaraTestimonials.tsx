import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const ElaraTestimonials = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.2);
  const isMobile = useIsMobile();
  const [api, setApi] = React.useState<CarouselApi>();
  const [isHovered, setIsHovered] = React.useState(false);
  const [lastInteraction, setLastInteraction] = React.useState(Date.now());

  useEffect(() => {
    if (!api || !isMobile || isHovered) return;

    const intervalId = setInterval(() => {
      if (Date.now() - lastInteraction < 12000) return; // Wait 12s after interaction
      
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 12000);

    return () => clearInterval(intervalId);
  }, [api, isMobile, isHovered, lastInteraction]);

  const testimonials = [
    { 
      img: "/lovable-uploads/client-1.png", 
      name: "Gabriel Branchi", 
      role: "Empresário",
      testimonial: "Desde que implementamos a Elara, nosso tempo de resposta no WhatsApp é instantâneo, 24/7. Os clientes adoram o atendimento rápido e conseguimos qualificar leads mesmo fora do horário comercial. Nossa taxa de conversão aumentou 45% no primeiro mês."
    },
    { 
      img: "/lovable-uploads/client-2.png", 
      name: "Maurício Caetano", 
      role: "Gestor Comercial",
      testimonial: "Conseguimos qualificar 3x mais leads sem aumentar a equipe. A Elara faz as perguntas certas, entende o perfil do cliente e só passa para nosso time os contatos realmente prontos para fechar. Isso economizou +180 horas/mês da equipe."
    },
    { 
      img: "/lovable-uploads/client-3.png", 
      name: "Ana Carolina Tavares", 
      role: "Empreendedora",
      testimonial: "A Elara resolve 92% das dúvidas comuns automaticamente. Perguntas sobre produtos, horários, preços e agendamentos são resolvidos na hora. Nossa equipe agora foca apenas no que realmente precisa de toque humano. A satisfação dos clientes subiu para 98%."
    }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-section-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${
            sectionVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground glow-text mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Histórias reais de transformação digital com a Elara
          </p>
        </div>

        {isMobile ? (
          <div className={`space-y-6 transition-all duration-700 delay-300 ${
            sectionVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((item, index) => (
                  <CarouselItem key={index} className="pl-4">
                    <Card className="p-6 flex flex-col h-full bg-card-gradient border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-base text-muted-foreground mb-6 italic flex-grow leading-relaxed">
                        "{item.testimonial}"
                      </p>
                      <div className="flex items-center gap-3 mt-auto">
                        <img 
                          src={item.img} 
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-primary/20"
                        />
                        <div className="flex flex-col justify-center min-w-0">
                          <p className="font-semibold text-foreground leading-tight">{item.name}</p>
                          <p className="text-sm text-muted-foreground leading-tight truncate">{item.role}</p>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Navigation arrows below */}
            <div className="flex justify-center items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-card border-primary/30 hover:bg-primary/10 hover:border-primary transition-all"
                onClick={() => {
                  api?.scrollPrev();
                  setLastInteraction(Date.now());
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-card border-primary/30 hover:bg-primary/10 hover:border-primary transition-all"
                onClick={() => {
                  api?.scrollNext();
                  setLastInteraction(Date.now());
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${
            sectionVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            {testimonials.map((item, index) => (
              <Card 
                key={index} 
                className="p-6 flex flex-col h-full bg-card-gradient border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-base text-muted-foreground mb-6 italic flex-grow leading-relaxed">
                  "{item.testimonial}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-primary/20"
                  />
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="font-semibold text-foreground leading-tight">{item.name}</p>
                    <p className="text-sm text-muted-foreground leading-tight truncate">{item.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ElaraTestimonials;
