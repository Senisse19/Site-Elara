import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { aiAgentFormSchema } from "@/lib/validations/forms";

interface AIAgentFormProps {
  onSuccess: () => void;
}

const AIAgentForm = ({ onSuccess }: AIAgentFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agentType: "",
    currentSolution: "",
    monthlyVolume: "",
    integrationPlatforms: "",
    customRequirements: "",
    additionalInfo: ""
  });

  const agentTypes = [
    {
      value: "receptionist",
      label: "Agente de Atendimento (Recepcionista)",
      setup: "A partir de R$ 2.500",
      monthly: "",
      ideal: "Ideal para negócios que precisam de um atendimento impecável e 24/7. Diferenciais: Centraliza WhatsApp e Instagram em um único fluxo de atendimento. Compreende e transcreve mensagens de áudio para agilizar a resposta, e consegue responder com voz gerada por IA 100% humanizada, podendo clonar uma voz real. Agenda, confirma e reagenda horários diretamente no Google Calendar."
    },
    {
      value: "sdr",
      label: "Agente SDR (Vendas)",
      setup: "A partir de R$ 5.000",
      monthly: "",
      ideal: "Ideal para equipes de vendas que não querem deixar nenhum lead esfriar. Diferenciais: Executa uma cadência de follow-up inteligente (1, 3 e 7 dias) para reengajar leads. Usa IA para analisar o histórico da conversa e criar mensagens de follow-up personalizadas. Compreende e transcreve mensagens de áudio, e consegue responder com voz gerada por IA 100% humanizada, podendo clonar uma voz real. Qualifica leads e agenda reuniões automaticamente quando o interesse é confirmado."
    },
    {
      value: "bdr",
      label: "Agente BDR (Prospecção Ativa)",
      setup: "A partir de R$ 4.500",
      monthly: "",
      ideal: "Ideal para empresas que buscam crescimento acelerado com a prospecção de novos clientes. Diferenciais: Mapeia e captura leads qualificados de fontes como o Google Maps. Analisa o site e as informações públicas do prospect para criar uma mensagem de primeiro contato ultra-personalizada. Aquece o lead antes de passá-lo para a equipe de vendas, aumentando a taxa de conversão."
    },
    {
      value: "social_media",
      label: "Agente Social Media",
      setup: "A partir de R$ 3.000",
      monthly: "",
      ideal: "Ideal para marcas que desejam ter uma produção de conteúdo consistente e automatizada. Diferenciais: Cria posts, imagens e vídeos curtos a partir de simples comandos de texto. Edita imagens para adequá-las à identidade visual da marca. Agenda e realiza postagens automáticas no Instagram, X (Twitter) e TikTok."
    },
    {
      value: "internal_assistant",
      label: "Assistente Interno de Gestão",
      setup: "A partir de R$ 2.500",
      monthly: "",
      ideal: "Ideal para gestores e equipes que precisam otimizar tarefas administrativas. Diferenciais: Gerencia agendas, cria lembretes, organiza tarefas, envia, responde e resume e-mails. Busca informações em documentos e planilhas para fornecer respostas rápidas. Automatiza a comunicação interna e o envio de relatórios."
    },
    {
      value: "combo_bdr_sdr",
      label: "COMBO - Agente de Prospecção e Vendas (BDR + SDR)",
      setup: "A partir de R$ 8.000",
      monthly: "",
      ideal: "A solução definitiva para o seu processo comercial. Um agente encontra e qualifica novos clientes (BDR), enquanto o outro nutre e converte (SDR), trabalhando em perfeita harmonia.",
      isCombo: true
    },
    {
      value: "crm_integration",
      label: "Integração com CRM",
      setup: "A partir de R$ 2.000",
      monthly: "",
      ideal: "Conectamos seu agente de IA diretamente ao seu CRM (Pipedrive, Hubspot, etc.) para registrar interações, atualizar contatos e manter seu funil de vendas sempre organizado.",
      isExtra: true
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    // Validate form data
    const validation = aiAgentFormSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((error) => {
        if (error.path[0]) {
          errors[error.path[0].toString()] = error.message;
        }
      });
      setValidationErrors(errors);
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os campos destacados",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const agentInfo = agentTypes.find(t => t.value === formData.agentType);
      
      const { error: leadError } = await supabase
        .from("leads_central")
        .insert({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          source: "agente_ia",
          details: {
            agent_type: formData.agentType,
            agent_label: agentInfo?.label,
            agent_setup: agentInfo?.setup,
            agent_monthly: agentInfo?.monthly,
            current_solution: formData.currentSolution,
            monthly_volume: formData.monthlyVolume,
            integration_platforms: formData.integrationPlatforms,
            custom_requirements: formData.customRequirements,
            additional_info: formData.additionalInfo
          }
        });

      if (leadError) throw leadError;

      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato em breve para discutir seu projeto.",
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nome Completo *</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className={validationErrors.fullName ? "border-destructive" : ""}
            />
            {validationErrors.fullName && (
              <p className="text-sm text-destructive mt-1">{validationErrors.fullName}</p>
            )}
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={validationErrors.email ? "border-destructive" : ""}
            />
            {validationErrors.email && (
              <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>
            )}
        </div>

        <div>
          <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={validationErrors.phone ? "border-destructive" : ""}
            />
            {validationErrors.phone && (
              <p className="text-sm text-destructive mt-1">{validationErrors.phone}</p>
            )}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-lg">Tipo de Agente *</h3>
        
        <RadioGroup
          value={formData.agentType}
          onValueChange={(value) => setFormData(prev => ({ ...prev, agentType: value }))}
          className="space-y-2"
        >
          {agentTypes.map((agent) => (
            <div 
              key={agent.value} 
              className={`p-4 border rounded-lg hover:bg-accent/50 transition-colors ${
                agent.isCombo ? 'border-primary bg-primary/5' : ''
              } ${
                agent.isExtra ? 'border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={agent.value} id={agent.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={agent.value} className="cursor-pointer font-medium text-base flex items-center gap-2">
                    {agent.label}
                    {agent.isCombo && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">MAIS COMPLETO</span>}
                    {agent.isExtra && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">EXTRA</span>}
                  </Label>
                  {formData.agentType === agent.value && (
                    <div className="mt-3 space-y-2 animate-fade-in">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-semibold text-primary">
                          {agent.isExtra ? 'Valor:' : 'Setup:'} {agent.setup}
                        </span>
                        {agent.monthly && <span className="font-bold text-foreground">{agent.monthly}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        <strong>Ideal para:</strong> {agent.ideal}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>

        <div>
          <Label htmlFor="currentSolution">Solução atual de atendimento/vendas</Label>
          <Input
            id="currentSolution"
            name="currentSolution"
            value={formData.currentSolution}
            onChange={handleInputChange}
            placeholder="Ex: Atendimento manual, chatbot básico..."
          />
        </div>

        <div>
          <Label htmlFor="monthlyVolume">Volume mensal estimado</Label>
          <Input
            id="monthlyVolume"
            name="monthlyVolume"
            value={formData.monthlyVolume}
            onChange={handleInputChange}
            placeholder="Ex: 500 conversas/mês, 100 leads/mês..."
          />
        </div>

        <div>
          <Label htmlFor="integrationPlatforms">Plataformas para integração</Label>
          <Input
            id="integrationPlatforms"
            name="integrationPlatforms"
            value={formData.integrationPlatforms}
            onChange={handleInputChange}
            placeholder="Ex: WhatsApp, Instagram, CRM, etc."
          />
        </div>

        <div>
          <Label htmlFor="customRequirements">Requisitos personalizados</Label>
          <Textarea
            id="customRequirements"
            name="customRequirements"
            value={formData.customRequirements}
            onChange={handleInputChange}
            rows={3}
            placeholder="Funcionalidades específicas que você precisa..."
          />
        </div>

        <div>
          <Label htmlFor="additionalInfo">Informações Adicionais</Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-center text-muted-foreground">
          Configure seu agente ideal e fale com Victor sobre a implementação
        </p>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Falar com Victor sobre este Agente"}
        </Button>
      </div>
    </form>
  );
};

export default AIAgentForm;
