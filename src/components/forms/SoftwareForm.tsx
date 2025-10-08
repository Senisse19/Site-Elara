import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SoftwareFormProps {
  onSuccess: () => void;
}

const SoftwareForm = ({ onSuccess }: SoftwareFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "",
    hasDesign: false,
    designReference: "",
    requiredFeatures: "",
    integrationsNeeded: "",
    timeline: "",
    additionalInfo: ""
  });

  const projectTypes = [
    { value: "landing_page", label: "Landing Page", price: "A partir de R$ 1.200" },
    { value: "blog", label: "Blog", price: "A partir de R$ 2.500" },
    { value: "portfolio", label: "Portfólio Pessoal", price: "A partir de R$ 1.800" },
    { value: "ecommerce", label: "E-commerce", price: "A partir de R$ 8.000" },
    { value: "system", label: "CRM ou Sistema Personalizado", price: "A partir de R$ 15.000" },
    { value: "other", label: "Outro", price: "Sob consulta" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectTypeLabel = projectTypes.find(t => t.value === formData.projectType)?.label || formData.projectType;
      
      const { data: leadData, error: leadError } = await supabase
        .from("leads")
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          package_type: "software",
          package_name: `Desenvolvimento - ${projectTypeLabel}`,
          additional_info: formData.additionalInfo
        })
        .select()
        .single();

      if (leadError) throw leadError;

      const { error: detailsError } = await supabase
        .from("software_leads")
        .insert({
          lead_id: leadData.id,
          project_type: formData.projectType,
          has_design: formData.hasDesign,
          design_reference: formData.designReference,
          required_features: formData.requiredFeatures,
          integrations_needed: formData.integrationsNeeded,
          timeline: formData.timeline
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
        <h3 className="font-semibold text-lg">Detalhes do Projeto</h3>
        
        <div>
          <Label>Tipo de Projeto *</Label>
          <RadioGroup
            value={formData.projectType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}
            className="mt-2 space-y-2"
          >
            {projectTypes.map((type) => (
              <div key={type.value} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <div className="flex-1">
                    <Label htmlFor={type.value} className="cursor-pointer font-medium">
                      {type.label}
                    </Label>
                    {formData.projectType === type.value && (
                      <p className="text-sm font-semibold text-primary mt-1 animate-fade-in">
                        {type.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasDesign"
            checked={formData.hasDesign}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, hasDesign: checked as boolean }))
            }
          />
          <Label htmlFor="hasDesign" className="cursor-pointer">
            Já possui design/identidade visual
          </Label>
        </div>

        <div>
          <Label htmlFor="designReference">Sites de referência ou inspiração</Label>
          <Textarea
            id="designReference"
            name="designReference"
            value={formData.designReference}
            onChange={handleInputChange}
            rows={2}
            placeholder="URLs de sites que você admira"
          />
        </div>

        <div>
          <Label htmlFor="requiredFeatures">Principais funcionalidades necessárias</Label>
          <Textarea
            id="requiredFeatures"
            name="requiredFeatures"
            value={formData.requiredFeatures}
            onChange={handleInputChange}
            rows={3}
            placeholder="Ex: Formulário de contato, área de membros, pagamento online..."
          />
        </div>

        <div>
          <Label htmlFor="integrationsNeeded">Integrações necessárias</Label>
          <Input
            id="integrationsNeeded"
            name="integrationsNeeded"
            value={formData.integrationsNeeded}
            onChange={handleInputChange}
            placeholder="Ex: Google Analytics, Stripe, WhatsApp..."
          />
        </div>

        <div>
          <Label htmlFor="timeline">Prazo desejado</Label>
          <Input
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            placeholder="Ex: 30 dias, 2 meses..."
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

export default SoftwareForm;
