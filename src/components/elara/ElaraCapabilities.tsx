import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mic, 
  Volume2, 
  Image, 
  Calculator, 
  BookOpen, 
  UserCheck, 
  FileText, 
  Database,
  MessageSquare,
  Smile,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Bell,
  Target,
  Phone,
  Bot,
  Clock
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

const ElaraCapabilities = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.2);
  const isMobile = useIsMobile();
  const [api, setApi] = React.useState<CarouselApi>();
  const [isHovered, setIsHovered] = React.useState(false);
  const [lastInteraction, setLastInteraction] = React.useState(Date.now());

  useEffect(() => {
    if (!api || !isMobile || isHovered) return;

    const intervalId = setInterval(() => {
      if (Date.now() - lastInteraction < 10000) return;
      
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [api, isMobile, isHovered, lastInteraction]);

  const capabilities = [
    {
      icon: Mic,
      title: "Ouvir e transcrever áudios",
      description: "Interpreta mensagens de voz do WhatsApp e responde automaticamente com precisão."
    },
    {
      icon: Volume2,
      title: "Responder com voz clonada ultra-realista",
      description: "Capaz de enviar respostas por áudio com voz natural e personalizada."
    },
    {
      icon: Image,
      title: "Analisar imagens",
      description: "Reconhece documentos, fotos de produtos, comprovantes e extrai informações relevantes."
    },
    {
      icon: Calculator,
      title: "Executar cálculos e lógica avançada",
      description: "Gera orçamentos, aplica regras de negócio e realiza cálculos complexos instantaneamente."
    },
    {
      icon: BookOpen,
      title: "Base de conhecimento",
      description: "Carregada com informações da sua empresa para tirar dúvidas e fornecer respostas precisas."
    },
    {
      icon: UserCheck,
      title: "Qualificar clientes",
      description: "Faz perguntas estratégicas, entende a necessidade do lead e tira dúvidas antes da conversão."
    },
    {
      icon: FileText,
      title: "Enviar arquivos",
      description: "Envia PDFs, catálogos, contratos ou links conforme a necessidade da conversa."
    },
    {
      icon: Database,
      title: "Integrar com CRM",
      description: "Conecta-se aos seus sistemas existentes para registrar, consultar e atualizar dados automaticamente."
    },
    {
      icon: MessageSquare,
      title: "Plataforma Unificada",
      description: "Caixas de entrada do Instagram e WhatsApp centralizadas em uma única plataforma (Chatwoot)."
    },
    {
      icon: Smile,
      title: "Reagir mensagens",
      description: "Reage a mensagens do WhatsApp com emojis selecionados, tornando as conversas mais naturais e engajadoras."
    },
    {
      icon: Calendar,
      title: "Gestão de Agenda",
      description: "A Elara pode agendar, reagendar e desmarcar reuniões diretamente no Google Agenda."
    },
    {
      icon: Bell,
      title: "Confirmação de Reunião",
      description: "Entra em contato com o cliente 24 horas antes da reunião, solicitando a confirmação de comparecimento para reduzir o não comparecimento (no-show)."
    },
    {
      icon: Target,
      title: "Prospecção Ativa e Qualificação",
      description: "Integra com sua lista de leads ou formulário, faz prospecção ativa e qualifica clientes. Cuida desde a prospecção até o agendamento, tudo automático."
    },
    {
      icon: Clock,
      title: "Follow-up Automático",
      description: "Entra em contato com leads que abandonaram a conversa ou ficaram sem responder por um período de tempo, mantendo o engajamento e aumentando as chances de conversão."
    },
    {
      icon: Bot,
      title: "Assistente Interno (Bônus)",
      description: "Gerencie sua agenda fazendo solicitações por mensagem ou áudio de forma automática. Exemplo: solicite o cancelamento de todas as agendas de terça-feira e o assistente cancela e envia mensagens personalizadas aos clientes."
    }
  ];

  return (
    <section id="capacidades" className="py-20 bg-section-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${
            sectionVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 glow-text">
            O que ela é capaz de fazer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Funcionalidades avançadas que transformam a Elara em uma verdadeira colaboradora digital
          </p>
        </div>

{isMobile ? (
          <div className="space-y-6">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className={`w-full transition-all duration-700 delay-300 ${
                sectionVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CarouselContent className="-ml-4">
                {capabilities.map((capability, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card 
                      className="p-6 h-full bg-card-gradient border-primary/20 hover:border-primary/40 hover:shadow-glow transition-all duration-300 group hover:scale-105 cursor-pointer"
                    >
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                        <capability.icon className="h-7 w-7 text-primary" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {capability.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {capability.description}
                      </p>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            <div className="flex justify-center items-center gap-4 pt-4">
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
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${
            sectionVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            {capabilities.map((capability, index) => (
              <Card 
                key={index}
                className="p-6 h-full bg-card-gradient border-primary/20 hover:border-primary/40 hover:shadow-glow transition-all duration-300 group hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <capability.icon className="h-7 w-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {capability.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ElaraCapabilities;
