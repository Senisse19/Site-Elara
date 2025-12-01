import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock, DollarSign, TrendingUp, Star, Zap, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TiltCard from "@/components/ui/TiltCard";
import CounterAnimation from "@/components/ui/CounterAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

const ElaraBenefits = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.2);
  const isMobile = useIsMobile();

  // Trigger stagger animation when section is visible (desktop only)
  useEffect(() => {
    if (sectionVisible && !isMobile) {
      const items = document.querySelectorAll('#beneficios .stagger-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 100);
      });
    }
  }, [sectionVisible, isMobile]);

  const benefits = [
    {
      icon: Clock,
      title: "Atendimento 24/7 no piloto automático",
      description: "Nunca mais perca um cliente por falta de disponibilidade. A Elara trabalha sem pausas, finais de semana ou feriados.",
      stat: "24/7",
      statLabel: "Disponível"
    },
    {
      icon: DollarSign,
      title: "Reduza custos operacionais",
      description: "Elimine tarefas repetitivas e libere sua equipe para o que realmente importa: decisões estratégicas e vendas.",
      stat: "70%",
      statLabel: "Redução de custos"
    },
    {
      icon: TrendingUp,
      title: "+180 horas/mês economizadas",
      description: "Recupere tempo valioso em tarefas repetitivas de atendimento. Tempo que você pode investir em crescimento.",
      stat: "180h+",
      statLabel: "Por mês"
    },
    {
      icon: Star,
      title: "98% de satisfação dos clientes",
      description: "Respostas rápidas, precisas e personalizadas elevam a experiência do cliente a um novo patamar.",
      stat: "98%",
      statLabel: "Satisfação"
    },
    {
      icon: Zap,
      title: "Aprende continuamente",
      description: "Cada interação melhora a performance. A Elara evolui com seu negócio, ficando mais eficiente com o tempo.",
      stat: "∞",
      statLabel: "Aprendizado"
    },
    {
      icon: Users,
      title: "Escale sem contratar",
      description: "Atenda 10x mais clientes sem aumentar sua equipe. A Elara multiplica sua capacidade operacional.",
      stat: "10x",
      statLabel: "Capacidade"
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${sectionVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground glow-text animate-blur-reveal" style={{ animationDelay: '0.2s', opacity: 0 }}>Seu atendimento, vendas e suporte </span>
            <span className="text-primary glow-text bg-clip-text bg-gradient-to-r from-primary to-blue-400 animate-blur-reveal" style={{ animationDelay: '0.4s', opacity: 0 }}>
              no piloto automático
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Imagine ter um assistente inteligente, disponível o tempo todo, que:
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-all duration-700 delay-300 ${sectionVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
          {benefits.map((benefit, index) => (
            <div key={index} className="stagger-item">
              <TiltCard glareEnable={true} maxTilt={8} scale={1.02}>
                <Card
                  className="p-6 bg-card-gradient border-primary/20 hover:shadow-glow transition-all duration-300 group h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      <benefit.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{benefit.stat}</div>
                      <div className="text-xs text-muted-foreground">{benefit.statLabel}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Por que a Elara? */}
        <div className="mt-20">
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/30">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground glow-text">
                Por que a Elara?
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Elara, criamos agentes de IA generativa sob medida, com infraestrutura segura e
                privativa, integração com +400 ferramentas e suporte contínuo para que seu atendimento
                evolua junto com o seu negócio.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    <CounterAnimation to={70} suffix="%" duration={2.5} />
                  </div>
                  <p className="text-sm text-muted-foreground">Redução no tempo médio de resposta no WhatsApp</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    <CounterAnimation to={180} suffix="h/mês" prefix="+" duration={2.5} />
                  </div>
                  <p className="text-sm text-muted-foreground">Economizadas em tarefas repetitivas de atendimento</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    <CounterAnimation to={98} suffix="%" duration={2.5} />
                  </div>
                  <p className="text-sm text-muted-foreground">De satisfação dos clientes atendidos pelos agentes de IA</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ElaraBenefits;
