import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AIAgentFormProps {
  onSuccess: () => void;
}

const AIAgentForm = ({ onSuccess }: AIAgentFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      price: "R$ 1.490/mês"
    },
    { 
      value: "sdr", 
      label: "Agente SDR (Vendas)",
      price: "R$ 2.490/mês"
    },
    { 
      value: "internal_assistant", 
      label: "Assistente Interno de Gestão",
      price: "R$ 3.490/mês"
    },
    { 
      value: "social_media", 
      label: "Agente Social Media",
      price: "R$ 1.990/mês"
    },
    { 
      value: "bdr", 
      label: "Agente BDR (Prospecção Ativa)",
      price: "R$ 2.990/mês"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const agentInfo = agentTypes.find(t => t.value === formData.agentType);
      const packagePrice = agentInfo?.price.match(/\d+/)?.[0];
      
      const { data: leadData, error: leadError } = await supabase
        .from("leads")
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          package_type: "ai_agent",
          package_name: agentInfo?.label || formData.agentType,
          package_price: packagePrice ? parseInt(packagePrice) : null,
          additional_info: formData.additionalInfo
        })
        .select()
        .single();

      if (leadError) throw leadError;

      const { error: detailsError } = await supabase
        .from("ai_agent_leads")
        .insert({
          lead_id: leadData.id,
          agent_type: formData.agentType,
          current_solution: formData.currentSolution,
          monthly_volume: formData.monthlyVolume,
          integration_platforms: formData.integrationPlatforms,
          custom_requirements: formData.customRequirements
        });

      if (detailsError) throw detailsError;

      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato em breve para discutir seu projeto.",
      });

      onSuccess();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente.",
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
          />
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
          />
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
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-lg">Tipo de Agente</h3>
        
        <RadioGroup
          value={formData.agentType}
          onValueChange={(value) => setFormData(prev => ({ ...prev, agentType: value }))}
          className="space-y-3"
        >
          {agentTypes.map((type) => (
            <div key={type.value} className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={type.value} className="cursor-pointer font-medium">
                  {type.label}
                </Label>
                <p className="text-sm text-muted-foreground">{type.price}</p>
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

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
      </Button>
    </form>
  );
};

export default AIAgentForm;
