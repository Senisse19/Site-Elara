import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Code2, 
  Bot, 
  GraduationCap,
  ArrowRight,
  Check
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      title: "Automação de Processos",
      description: "Automatize tarefas repetitivas e aumente a eficiência operacional com ou sem IA.",
      price: "A partir de R$ 2.500",
      features: [
        "Análise detalhada do processo atual",
        "Desenvolvimento de solução personalizada",
        "Integração com sistemas existentes",
        "Treinamento e suporte"
      ]
    },
    {
      id: 'software' as PackageType,
      icon: Code2,
      title: "Desenvolvimento de Software",
      description: "Sites, landing pages, e-commerce e sistemas personalizados para seu negócio.",
      price: "A partir de R$ 3.000",
      features: [
        "E-commerce completo",
        "Landing pages de alta conversão",
        "Portfólio profissional",
        "Sistemas customizados"
      ]
    },
    {
      id: 'ai_agent' as PackageType,
      icon: Bot,
      title: "Agentes de IA",
      description: "Agentes inteligentes para automatizar atendimento, vendas e gestão.",
      price: "A partir de R$ 1.490/mês",
      features: [
        "Agente de Atendimento (Recepcionista)",
        "Agente SDR (Vendas)",
        "Assistente Interno de Gestão",
        "Agente Social Media",
        "Agente BDR (Prospecção)"
      ]
    },
    {
      id: 'consulting' as PackageType,
      icon: GraduationCap,
      title: "Consultoria / Mentoria",
      description: "Orientação estratégica para automação e transformação digital do seu negócio.",
      price: "A partir de R$ 1.000",
      features: [
        "Auditoria de processos",
        "Planejamento estratégico",
        "Implementação supervisionada",
        "Treinamento de equipes"
      ]
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

        <div ref={packagesRef} className="grid md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`p-8 hover:shadow-glow transition-all duration-500 group ${
                visibleItems.includes(index) 
                  ? 'animate-fade-in animate-scale-in' 
                  : 'opacity-0 translate-y-10 scale-95'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                <pkg.icon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                {pkg.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {pkg.description}
              </p>

              <div className="text-primary font-bold text-xl mb-6">
                {pkg.price}
              </div>
              
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm text-muted-foreground">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleOpenForm(pkg.id)}
                className="w-full bg-hero-gradient text-primary-foreground hover:shadow-glow transition-all duration-300"
              >
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Modais dos formulários */}
      <Dialog open={selectedPackage === 'automation'} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Automação de Processos</DialogTitle>
          </DialogHeader>
          <AutomationForm onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>

      <Dialog open={selectedPackage === 'software'} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Desenvolvimento de Software</DialogTitle>
          </DialogHeader>
          <SoftwareForm onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>

      <Dialog open={selectedPackage === 'ai_agent'} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agentes de IA</DialogTitle>
          </DialogHeader>
          <AIAgentForm onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>

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
