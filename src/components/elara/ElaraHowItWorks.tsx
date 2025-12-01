import React from "react";
import { Card } from "@/components/ui/card";
import { Target, Zap, Users, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ElaraHowItWorks = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.2);

  const steps = [
    {
      icon: Target,
      title: "Diagnóstico",
      description: "Entendemos seus desafios e objetivos para personalizar a Elara ao seu negócio"
    },
    {
      icon: Zap,
      title: "Implementação",
      description: "Configuramos e personalizamos a solução, integrando com seus sistemas"
    },
    {
      icon: Users,
      title: "Treinamento",
      description: "Ensinamos sua equipe a extrair o máximo da Elara e trabalhar em conjunto"
    },
    {
      icon: Rocket,
      title: "Suporte Contínuo",
      description: "Acompanhamos seus resultados e oferecemos suporte constante para evoluir"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${sectionVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground glow-text mb-4 animate-blur-reveal" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Como Funciona?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Do primeiro contato até o sucesso contínuo, estamos com você em cada etapa
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-300 ${sectionVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-glow transition-all duration-300 bg-card-gradient border-primary/20 hover:border-primary/40 group hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElaraHowItWorks;
