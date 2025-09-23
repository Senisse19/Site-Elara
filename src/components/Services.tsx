import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Code2, 
  Database, 
  Workflow, 
  BarChart3, 
  Shield,
  ArrowRight 
} from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const Services = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { containerRef: servicesRef, visibleItems } = useStaggeredAnimation(6, 150);
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.3);

  const services = [
    {
      icon: Settings,
      title: "Automação de Processos",
      description: "Desenvolvimento de soluções RPA para automatizar tarefas repetitivas e aumentar a eficiência operacional.",
      features: ["RPA com Python/UiPath", "Integração de sistemas", "Redução de custos", "Maior precisão"]
    },
    {
      icon: Code2,
      title: "Desenvolvimento de Software",
      description: "Criação de aplicações web e sistemas customizados para atender necessidades específicas do negócio.",
      features: ["Aplicações web modernas", "APIs robustas", "Interfaces intuitivas", "Arquitetura escalável"]
    },
    {
      icon: Database,
      title: "Integração de Sistemas",
      description: "Conectar diferentes plataformas e sistemas para criar um ecossistema tecnológico integrado.",
      features: ["APIs REST/GraphQL", "Webhooks", "Sincronização em tempo real", "Migração de dados"]
    },
    {
      icon: Workflow,
      title: "Gestão de Fluxos",
      description: "Otimização e automatização de workflows empresariais para maior produtividade da equipe.",
      features: ["Mapeamento de processos", "Fluxos automatizados", "Aprovações digitais", "Notificações inteligentes"]
    },
    {
      icon: BarChart3,
      title: "Análise de Dados",
      description: "Transformar dados brutos em insights valiosos através de dashboards e relatórios automatizados.",
      features: ["Dashboards interativos", "Relatórios automatizados", "Business Intelligence", "Visualização de dados"]
    },
    {
      icon: Shield,
      title: "Consultoria Técnica",
      description: "Assessoria especializada para definir estratégias de automação e modernização tecnológica.",
      features: ["Auditoria de processos", "Planejamento estratégico", "Treinamento de equipes", "Suporte contínuo"]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="servicos" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que Eu Faço
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ofereço soluções completas em automação e desenvolvimento de software, 
            focando sempre na geração de valor real para o seu negócio.
          </p>
        </div>

        <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`p-6 hover:shadow-glow transition-all duration-500 group ${
                visibleItems.includes(index) 
                  ? 'animate-fade-in animate-scale-in' 
                  : 'opacity-0 translate-y-10 scale-95'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div 
            ref={ctaRef}
            className={`bg-card rounded-2xl p-8 shadow-card max-w-2xl mx-auto transition-all duration-700 ${
              ctaVisible ? 'animate-fade-in animate-scale-in' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Pronto para Automatizar seu Negócio?
            </h3>
            <p className="text-muted-foreground mb-6">
              Vamos conversar sobre como posso ajudar a otimizar seus processos e 
              impulsionar os resultados da sua empresa.
            </p>
            <Button 
              size="lg"
              onClick={() => scrollToContact()}
              className="bg-hero-gradient text-primary-foreground hover:shadow-glow transition-all duration-300"
            >
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;