import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ElaraFAQ = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      question: "O que é um agente de IA da Elara?",
      answer: "A Elara é uma agente de IA generativa treinada especificamente para o seu negócio. Ela é capaz de entender mensagens (texto, áudio e imagem), acessar sua base de conhecimento, executar tarefas complexas como cálculos e envio de arquivos, e se integrar com seus sistemas como CRM. Funciona 24/7 atendendo clientes no WhatsApp, Instagram e outros canais de forma autônoma e personalizada."
    },
    {
      question: "O agente substitui minha equipe?",
      answer: "Não! A Elara é projetada para complementar sua equipe, não substituí-la. Ela cuida das tarefas repetitivas e de baixa complexidade (responder perguntas frequentes, qualificar leads, agendar compromissos, enviar materiais), liberando seu time para focar em relacionamento estratégico, vendas complexas e decisões que realmente exigem o toque humano. Pense nela como uma assistente incansável que trabalha ao lado da sua equipe."
    },
    {
      question: "Em quais canais o agente pode atuar?",
      answer: "A Elara atende principalmente via WhatsApp e Instagram (Direct). Além disso, pode se conectar com diversos outros canais através da plataforma Chatwoot (que centraliza todas as conversas) e integrar com CRMs, sistemas de agendamento, planilhas e mais de 400 ferramentas via API e webhooks. Isso permite que ela acesse e atualize informações em tempo real em todos os seus sistemas."
    },
    {
      question: "É possível personalizar o comportamento?",
      answer: "Sim, totalmente! Personalizamos o tom de voz, o tipo de resposta, as regras de negócio, os fluxos de atendimento e até quando a Elara deve transferir o atendimento para um humano. Você pode ajustar desde o \"jeito de falar\" (formal, descontraído, técnico) até ações específicas como \"enviar orçamento se o lead mostrar interesse em produto X\". A personalização é feita durante o treinamento e pode ser refinada ao longo do tempo."
    },
    {
      question: "O agente aprende sozinho?",
      answer: "A Elara não aprende automaticamente sem supervisão, mas aprende de forma assistida. Isso significa que, conforme ela interage e recebemos feedbacks, podemos refinar e atualizar o treinamento dela para que fique cada vez melhor. Essa abordagem garante controle total sobre o que ela aprende, evitando comportamentos indesejados. É como ter uma assistente que sempre passa por treinamentos regulares para melhorar."
    },
    {
      question: "Como funciona a segurança e privacidade dos dados?",
      answer: "Levamos segurança a sério. Todos os dados trafegam por conexões criptografadas, e seguimos as melhores práticas de proteção de informações. Você mantém controle total sobre quais dados a Elara pode acessar e como ela pode utilizá-los. Não compartilhamos suas informações com terceiros, e você pode definir políticas de retenção de dados conforme as necessidades do seu negócio."
    },
    {
      question: "Quanto tempo leva para implementar?",
      answer: "O tempo varia conforme a complexidade, mas geralmente em 2-4 semanas a Elara está pronta e operando. O processo inclui: diagnóstico inicial (entender seu negócio e necessidades), configuração e treinamento da IA (carregar conhecimento, definir fluxos), integração com seus sistemas, testes e ajustes, e treinamento da sua equipe para trabalhar com a Elara."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-section-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* CTA antes do FAQ */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Pronto para ter um agente de IA trabalhando por você?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nós criamos, treinamos e entregamos seu agente pronto para atender.
          </p>
          <Button 
            size="lg"
            onClick={scrollToContact}
            className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-glow transition-all duration-300 text-white group"
          >
            Agendar uma demonstração
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Perguntas Frequentes
          </h3>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ElaraFAQ;
