import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
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
    crmIntegration: false,
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
      setup: "A partir de R$ 3.000",
      monthly: "",
      ideal: "Ideal para negócios que precisam de atendimento 24/7 sem perder nenhum cliente. O agente centraliza WhatsApp e Instagram, transcreve áudios automaticamente e responde com voz humanizada. Agenda, confirma e reagenda compromissos no Google Calendar sem intervenção humana."
    },
    {
      value: "sdr",
      label: "Agente SDR (Vendas)",
      setup: "A partir de R$ 5.000",
      monthly: "",
      ideal: "Perfeito para equipes de vendas que não querem perder nenhuma oportunidade. Executa follow-ups automáticos em 1, 3 e 7 dias, analisa o histórico de conversas para personalizar mensagens, transcreve áudios e agenda reuniões quando detecta interesse do lead. Inclui plataforma centralizada para gestão de conversas do time."
    },
    {
      value: "bdr",
      label: "Agente BDR (Prospecção Ativa)",
      setup: "A partir de R$ 3.500",
      monthly: "",
      ideal: "Acelere seu crescimento com prospecção automatizada. Mapeia leads qualificados no Google Maps, analisa sites e informações públicas para criar mensagens ultra-personalizadas de primeiro contato. Aquece leads antes de passar para vendas. Inclui plataforma centralizada para gestão de conversas do time."
    },
    {
      value: "social_media",
      label: "Agente Social Media",
      setup: "A partir de R$ 5.000",
      monthly: "",
      ideal: "Mantenha presença constante nas redes sociais sem esforço. Cria posts, imagens e vídeos curtos por comando de texto, edita imagens seguindo sua identidade visual e agenda postagens automáticas no Instagram, X (Twitter) e TikTok."
    },
    {
      value: "internal_assistant",
      label: "Assistente Interno de Gestão",
      setup: "A partir de R$ 3.000",
      monthly: "",
      ideal: "Otimize a rotina administrativa da sua equipe. Gerencia agendas e lembretes, organiza tarefas, envia e resume e-mails automaticamente. Busca informações em documentos e planilhas, automatiza comunicação interna e envia relatórios."
    },
    {
      value: "combo_bdr_sdr",
      label: "COMBO - Prospecção e Vendas (BDR + SDR)",
      setup: "A partir de R$ 7.000",
      monthly: "",
      ideal: "A solução completa para seu processo comercial. O BDR encontra e aquece novos clientes, enquanto o SDR nutre e converte leads. Trabalham em harmonia perfeita. ECONOMIA: R$ 1.500 em relação à contratação separada + plataforma unificada de gerenciamento incluída.",
      isCombo: true
    },
    {
      value: "combo_reception_assistant",
      label: "COMBO - Atendimento e Gestão (Recepcionista + Assistente Interno)",
      setup: "A partir de R$ 5.000",
      monthly: "",
      ideal: "Integração perfeita entre atendimento externo e gestão interna. Quando o Assistente Interno desmarca uma reunião na agenda, o Recepcionista envia automaticamente uma mensagem ao cliente solicitando reagendamento. O Recepcionista captura novos compromissos e o Assistente organiza a agenda do time. ECONOMIA: R$ 1.000 em relação à contratação separada.",
      isCombo: true
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
            crm_integration: formData.crmIntegration,
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
              }`}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={agent.value} id={agent.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={agent.value} className="cursor-pointer font-medium text-base flex items-center gap-2">
                    {agent.label}
                    {agent.isCombo && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">MAIS COMPLETO</span>}
                  </Label>
                  {formData.agentType === agent.value && (
                    <div className="mt-3 space-y-2 animate-fade-in">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-semibold text-primary">
                          Setup: {agent.setup}
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

        <div className="space-y-4">
          <h4 className="font-semibold">Extras Disponíveis</h4>
          
          <div className="p-4 border border-primary/30 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 hover:bg-primary/10 transition-colors">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="crmIntegration"
                checked={formData.crmIntegration}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, crmIntegration: checked as boolean }))
                }
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="crmIntegration" className="cursor-pointer font-medium text-base flex items-center gap-2">
                  Integração com CRM
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">EXTRA</span>
                </Label>
                {formData.crmIntegration && (
                  <div className="mt-3 space-y-2 animate-fade-in">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-semibold text-primary">
                        Valor: A partir de R$ 2.000
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Conecte seu agente ao CRM (Pipedrive, Hubspot, etc.) para registro automático de interações. 
                      <br /><strong>Para BDR:</strong> O agente acessa sua lista de leads e realiza primeiro contato personalizado baseado no contexto.
                      <br /><strong>Para SDR:</strong> Continua as conversas iniciadas pelo BDR para qualificação e fechamento.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
