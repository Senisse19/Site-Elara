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
  HeadphonesIcon,
  MessageSquare,
  TrendingUp,
  Search,
  ClipboardList,
  Users,
  Star,
  Info
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AutomationForm from "@/components/forms/AutomationForm";
import SoftwareForm from "@/components/forms/SoftwareForm";
import AIAgentForm from "@/components/forms/AIAgentForm";
import ConsultingForm from "@/components/forms/ConsultingForm";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

type PackageType = 'automation' | 'software' | 'ai_agent' | 'consulting' | null;
type AIAgentType = 'atendimento' | 'social' | 'sdr' | 'bdr' | 'gestao' | 'combo' | null;

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageType>(null);
  const [selectedAgent, setSelectedAgent] = useState<AIAgentType>(null);
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { containerRef: packagesRef, visibleItems } = useStaggeredAnimation(4, 150);

  const aiAgents = [
    {
      id: 'atendimento' as AIAgentType,
      icon: HeadphonesIcon,
      title: "Agente de Atendimento (Recepcionista)",
      setup: "R$ 2.500",
      monthly: "R$ 590/mês",
      description: "Atua na linha de frente do seu negócio, disponível 24/7 para recepcionar clientes no WhatsApp e Instagram. Ele responde a perguntas frequentes, qualifica o atendimento inicial e direciona os clientes para a equipe correta, garantindo que nenhuma oportunidade seja perdida.",
      ideal: "Empresas que desejam oferecer respostas rápidas e eficientes a qualquer hora do dia."
    },
    {
      id: 'social' as AIAgentType,
      icon: MessageSquare,
      title: "Agente Social Media",
      setup: "R$ 3.000",
      monthly: "R$ 790/mês",
      description: "Gerencia a interação inicial nas suas redes sociais. Responde a comentários, direciona dúvidas recebidas por direct, interage com seguidores e ajuda a manter sua comunidade engajada, identificando oportunidades de negócio nas conversas.",
      ideal: "Negócios que querem manter uma presença online ativa e constante, transformando interações em vendas."
    },
    {
      id: 'sdr' as AIAgentType,
      icon: TrendingUp,
      title: "Agente SDR (Vendas)",
      setup: "R$ 5.000",
      monthly: "R$ 790/mês",
      description: "Seu pré-vendedor digital incansável. Ele qualifica os leads que chegam, entende as necessidades do cliente, responde dúvidas sobre produtos/serviços e agenda reuniões diretamente no calendário do seu time de vendas.",
      ideal: "Times de vendas que precisam focar no fechamento de negócios, deixando a qualificação para uma IA eficiente."
    },
    {
      id: 'bdr' as AIAgentType,
      icon: Search,
      title: "Agente BDR (Prospecção Ativa)",
      setup: "R$ 4.500",
      monthly: "R$ 890/mês",
      description: "Um especialista em encontrar novas oportunidades. O Agente BDR realiza a prospecção ativa de novos clientes, buscando e contatando perfis que se encaixem no seu cliente ideal de forma automatizada e personalizada.",
      ideal: "Empresas que desejam escalar a geração de leads e não depender apenas de quem chega até elas."
    },
    {
      id: 'gestao' as AIAgentType,
      icon: ClipboardList,
      title: "Assistente Interno de Gestão",
      setup: "R$ 3.800",
      monthly: "R$ 790/mês",
      description: "Otimiza a rotina da sua equipe. Este assistente automatiza tarefas administrativas, organiza agendas, envia lembretes de reuniões, compila relatórios básicos e ajuda na gestão de projetos, liberando tempo para atividades estratégicas.",
      ideal: "Empresas que buscam aumentar a produtividade interna e reduzir a carga de trabalho manual."
    },
    {
      id: 'combo' as AIAgentType,
      icon: Rocket,
      title: "COMBO - Agente de Prospecção e Vendas (BDR + SDR)",
      setup: "R$ 8.000",
      monthly: "R$ 1.490/mês",
      description: "A solução completa de vendas que combina prospecção ativa e qualificação de leads. Encontra novos clientes, qualifica oportunidades e agenda reuniões, criando um fluxo contínuo de vendas para sua empresa.",
      ideal: "Empresas que desejam uma solução completa e integrada para escalar suas vendas de forma automatizada.",
      isCombo: true
    }
  ];

  const packages = [
    {
      id: 'automation' as PackageType,
      icon: Settings,
      title: "Otimize sua Empresa: Automação de Processos",
      description: "Automatize tarefas repetitivas e aumente a eficiência operacional com ou sem IA.",
      price: "A partir de R$ 2.800",
      priceType: "Projeto Fechado",
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
      title: "Sua Empresa no Digital: Sites e Sistemas Sob Medida",
      description: "Sites, landing pages, e-commerce e sistemas personalizados para seu negócio.",
      price: "A partir de R$ 1.200",
      priceType: "Conforme o Projeto",
      features: [
        "Landing Page: A partir de R$ 1.200",
        "Blog: A partir de R$ 2.500",
        "Portfólio Pessoal: A partir de R$ 1.800",
        "E-commerce: A partir de R$ 8.000",
        "CRM ou Sistema Personalizado: A partir de R$ 15.000"
      ]
    },
    {
      id: 'ai_agent' as PackageType,
      icon: Bot,
      title: "Inteligência Artificial a seu Favor: Agentes Autônomos",
      description: "Agentes inteligentes para automatizar atendimento, vendas e gestão.",
      price: "A partir de R$ 590/mês",
      priceType: "Setup + Mensalidade",
      features: [
        "Disponíveis 24/7 sem pausas",
        "Integração com WhatsApp, Instagram e CRM",
        "Aprendizado contínuo",
        "Relatórios detalhados de performance"
      ],
      isSpecial: true
    },
    {
      id: 'consulting' as PackageType,
      icon: GraduationCap,
      title: "Estratégia e Direção: Consultoria Especializada",
      description: "Orientação estratégica para automação e transformação digital do seu negócio.",
      price: "A partir de R$ 1.500",
      priceType: "Pacote de Sessões",
      features: [
        "Auditoria de processos",
        "Planejamento estratégico",
        "Implementação supervisionada",
        "Treinamento de equipes"
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

  const handleOpenAgentInfo = (agentType: AIAgentType) => {
    setSelectedAgent(agentType);
  };

  const handleCloseAgentInfo = () => {
    setSelectedAgent(null);
  };

  const selectedAgentData = aiAgents.find(agent => agent.id === selectedAgent);

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

              <div className="text-primary font-bold text-xl mb-6">
                {pkg.price}
              </div>
              
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
                {pkg.id === 'ai_agent' ? 'Ver Agentes Disponíveis' : 'Solicitar Orçamento'}
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
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Depoimento do cliente será adicionado aqui após implementação."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-foreground">Nome do Cliente</p>
                    <p className="text-sm text-muted-foreground">Cargo, Empresa</p>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Agentes de IA Disponíveis</DialogTitle>
            <DialogDescription>
              Escolha o agente ideal para automatizar e escalar suas operações
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            {aiAgents.map((agent) => (
              <Card key={agent.id} className={`p-5 hover:shadow-md transition-all ${agent.isCombo ? 'border-primary border-2 bg-primary/5' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full flex-shrink-0">
                    <agent.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-semibold text-foreground">
                        {agent.title}
                      </h4>
                      <button
                        onClick={() => handleOpenAgentInfo(agent.id)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Ver detalhes"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                      {agent.isCombo && <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">MAIS COMPLETO</span>}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CRM Integration Block */}
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 mt-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full flex-shrink-0">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  Potencialize seus Agentes com Integração ao seu CRM
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Conecte seus Agentes de IA diretamente ao seu sistema de CRM (Pipedrive, RD Station, etc.). 
                  Centralize todas as informações, atualize dados de clientes automaticamente e tenha uma visão 360º 
                  da sua operação de vendas e atendimento.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    Soluções de integração a partir de R$ 2.000 (Setup)
                  </span>
                  <Button 
                    onClick={() => {
                      handleCloseForm();
                      const contactElement = document.getElementById('contato');
                      if (contactElement) {
                        contactElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Consultar Integração
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-6">
            <AIAgentForm onSuccess={handleCloseForm} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para detalhes do Agente */}
      <Dialog open={selectedAgent !== null} onOpenChange={handleCloseAgentInfo}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedAgentData && (
                <>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                    <selectedAgentData.icon className="h-6 w-6 text-primary" />
                  </div>
                  {selectedAgentData.title}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedAgentData && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div>
                  <span className="text-sm text-muted-foreground">Taxa de Implementação</span>
                  <p className="text-2xl font-bold text-primary">{selectedAgentData.setup}</p>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div>
                  <span className="text-sm text-muted-foreground">Mensalidade</span>
                  <p className="text-2xl font-bold text-foreground">{selectedAgentData.monthly}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">O que faz?</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedAgentData.description}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Ideal para:</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedAgentData.ideal}</p>
              </div>

              <Button 
                onClick={() => {
                  handleCloseAgentInfo();
                  handleOpenForm('ai_agent');
                }}
                className="w-full bg-hero-gradient text-primary-foreground hover:shadow-glow transition-all duration-300"
              >
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
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