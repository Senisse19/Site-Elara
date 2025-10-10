import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Code2, 
  Bot, 
  GraduationCap,
  ArrowRight,
  Check,
  Zap,
  Rocket,
  Target,
  Users,
  Star
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AutomationForm from "@/components/forms/AutomationForm";
import SoftwareForm from "@/components/forms/SoftwareForm";
import AIAgentForm from "@/components/forms/AIAgentForm";
import ConsultingForm from "@/components/forms/ConsultingForm";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

type PackageType = 'automation' | 'software' | 'ai_agent' | 'consulting' | null;

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageType>(null);
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { containerRef: packagesRef, visibleItems } = useStaggeredAnimation(4, 150);

  const packages = [
    {
      id: 'automation' as PackageType,
      icon: Settings,
      title: "Otimize sua Empresa: Automação de Processos",
      description: "Automatize tarefas repetitivas e aumente a eficiência operacional com ou sem IA.",
      price: "A partir de R$ 2.800",
      hasMonthlyMaintenance: true,
      features: [
        "Análise detalhada do processo atual",
        "Desenvolvimento de solução personalizada",
        "Integração com sistemas existentes"
      ]
    },
    {
      id: 'software' as PackageType,
      icon: Code2,
      title: "Sua Empresa no Digital: Sites e Sistemas Sob Medida",
      description: "Sites, landing pages, e-commerce e sistemas personalizados para seu negócio.",
      price: "",
      hasMonthlyMaintenance: true,
      features: [
        "Design profissional e responsivo",
        "Integração com ferramentas existentes",
        "Suporte e manutenção"
      ]
    },
    {
      id: 'ai_agent' as PackageType,
      icon: Bot,
      title: "Inteligência Artificial a seu Favor: Agentes Autônomos",
      description: "Agentes inteligentes para automatizar atendimento, vendas e gestão.",
      price: "",
      hasMonthlyMaintenance: true,
      features: [
        "Disponíveis 24/7 sem pausas",
        "Integração com WhatsApp, Instagram e CRM",
        "Aprendizado contínuo"
      ],
      isSpecial: true
    },
    {
      id: 'consulting' as PackageType,
      icon: GraduationCap,
      title: "Estratégia e Direção: Consultoria Especializada",
      description: "Orientação estratégica para automação e transformação digital do seu negócio.",
      price: "A partir de R$ 1.500",
      hasMonthlyMaintenance: false,
      features: [
        "Auditoria de processos",
        "Planejamento estratégico",
        "Implementação supervisionada"
      ]
    }
  ];

  const howItWorks = [
    {
      icon: Target,
      title: "Diagnóstico",
      description: "Entendemos seus desafios e objetivos"
    },
    {
      icon: Zap,
      title: "Implementação",
      description: "Configuramos e personalizamos a solução escolhida"
    },
    {
      icon: Users,
      title: "Treinamento",
      description: "Ensinamos sua equipe a extrair o máximo da nova ferramenta"
    },
    {
      icon: Rocket,
      title: "Suporte Contínuo",
      description: "Acompanhamos seus resultados e oferecemos suporte constante"
    }
  ];

  const handleOpenForm = (packageType: PackageType) => {
    setSelectedPackage(packageType);
  };

  const handleCloseForm = () => {
    setSelectedPackage(null);
  };

  return (
    <section id="pacotes" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nossos Pacotes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Escolha o pacote ideal para transformar seu negócio com tecnologia e automação.
          </p>
        </div>

        <div ref={packagesRef} className="grid md:grid-cols-2 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`p-8 hover:shadow-glow transition-all duration-500 group flex flex-col ${
                visibleItems.includes(index) 
                  ? 'animate-fade-in animate-scale-in' 
                  : 'opacity-0 translate-y-10 scale-95'
              } ${pkg.isSpecial ? 'border-primary border-2' : ''}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                <pkg.icon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                {pkg.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {pkg.description}
              </p>

              {pkg.price && (
                <div className="mb-6">
                  <div className="text-primary font-bold text-xl mb-1">
                    {pkg.price}
                  </div>
                  {pkg.hasMonthlyMaintenance && (
                    <p className="text-xs text-muted-foreground">
                      + Assinatura Mensal
                    </p>
                  )}
                </div>
              )}
              
              <ul className="space-y-3 mb-6 flex-grow">
                {pkg.features.slice(0, 3).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm text-muted-foreground">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleOpenForm(pkg.id)}
                className="w-full bg-hero-gradient text-primary-foreground hover:shadow-glow transition-all duration-300 mt-auto"
              >
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Seção Como Funciona */}
        <div className="my-20">
          <h3 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-12">
            Como Funciona?
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>


        {/* Seção Prova Social */}
        <div className="my-20">
          <h3 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-12">
            O que nossos clientes dizem
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                img: "/lovable-uploads/client-1.png", 
                name: "Gabriel Branchi", 
                role: "Gestor de Tráfego",
                testimonial: "A automação de gestão de tráfego mudou completamente minha rotina! Antes eu passava horas ajustando campanhas manualmente. Agora, o sistema monitora performance em tempo real, otimiza lances automaticamente e me alerta apenas quando preciso tomar decisões estratégicas. Consegui escalar minhas operações sem precisar contratar mais pessoas, e o ROI dos meus clientes aumentou em média 35%."
              },
              { 
                img: "/lovable-uploads/client-2.png", 
                name: "Maurício Caetano", 
                role: "Editor de Vídeos",
                testimonial: "O agente de Social Media foi um divisor de águas! Como editor, eu sempre tive dificuldade com a parte estratégica e criação de legendas. Agora ele gera ideias criativas de conteúdo, cria variações de copy, sugere hashtags relevantes e até adapta o tom de voz para cada plataforma. Minha produtividade triplicou e consigo entregar conteúdo muito mais estratégico para meus clientes."
              },
              { 
                img: "/lovable-uploads/client-3.png", 
                name: "Ana Carolina Tavares", 
                role: "Estrategista Digital e Social Media",
                testimonial: "Trabalhar com os agentes de IA revolucionou minha agência! O agente de Social Media cria calendários de conteúdo completos alinhados com as estratégias dos clientes, enquanto o agente de prospecção ativa busca leads qualificados no Google Maps e agenda reuniões automaticamente. Consegui aumentar minha carteira em 60% no último trimestre sem aumentar minha equipe. É como ter dois colaboradores especialistas trabalhando 24/7!"
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic flex-grow">
                  "{item.testimonial}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-foreground leading-tight">{item.name}</p>
                    <p className="text-sm text-muted-foreground leading-tight">{item.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para Automação */}
      <Dialog open={selectedPackage === 'automation'} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Automação de Processos</DialogTitle>
          </DialogHeader>
          <AutomationForm onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>

      {/* Modal para Software */}
      <Dialog open={selectedPackage === 'software'} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Desenvolvimento de Software</DialogTitle>
          </DialogHeader>
          <SoftwareForm onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>

      {/* Modal para Agentes de IA */}
      <Dialog open={selectedPackage === 'ai_agent'} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure seu Agente de IA</DialogTitle>
            <DialogDescription>
              Escolha o tipo de agente ideal para automatizar suas operações
            </DialogDescription>
          </DialogHeader>
          <AIAgentForm onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>

      {/* Modal para Consultoria */}
      <Dialog open={selectedPackage === 'consulting'} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Consultoria / Mentoria</DialogTitle>
          </DialogHeader>
          <ConsultingForm onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PackagesSection;