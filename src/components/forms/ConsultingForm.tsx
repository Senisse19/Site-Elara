import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { consultingFormSchema } from "@/lib/validations/forms";

interface ConsultingFormProps {
  onSuccess: () => void;
}

const ConsultingForm = ({ onSuccess }: ConsultingFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    consultingType: "",
    companySize: "",
    currentChallenges: "",
    goals: "",
    timeline: "",
    additionalInfo: ""
  });

  const consultingTypes = [
    { value: "strategy", label: "Estratégia de Automação" },
    { value: "implementation", label: "Implementação Supervisionada" },
    { value: "training", label: "Treinamento de Equipes" },
    { value: "audit", label: "Auditoria de Processos" }
  ];

  const companySizes = [
    { value: "micro", label: "Microempresa (até 9 funcionários)" },
    { value: "small", label: "Pequena (10-49 funcionários)" },
    { value: "medium", label: "Média (50-249 funcionários)" },
    { value: "large", label: "Grande (250+ funcionários)" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    // Validate form data
    const validation = consultingFormSchema.safeParse(formData);
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
      const consultingLabel = consultingTypes.find(t => t.value === formData.consultingType)?.label;
      
      const { error: leadError } = await supabase
        .from("leads_central")
        .insert({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          source: "consultoria",
          details: {
            consulting_type: formData.consultingType,
            consulting_label: consultingLabel,
            company_size: formData.companySize,
            current_challenges: formData.currentChallenges,
            goals: formData.goals,
            timeline: formData.timeline,
            additional_info: formData.additionalInfo
          }
        });

      if (leadError) throw leadError;

      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato em breve para agendar uma conversa.",
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
        <h3 className="font-semibold text-lg">Tipo de Consultoria</h3>
        
        <RadioGroup
          value={formData.consultingType}
          onValueChange={(value) => setFormData(prev => ({ ...prev, consultingType: value }))}
          className="space-y-2"
        >
          {consultingTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value} className="cursor-pointer font-normal">
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div>
          <Label>Tamanho da Empresa</Label>
          <RadioGroup
            value={formData.companySize}
            onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
            className="mt-2 space-y-2"
          >
            {companySizes.map((size) => (
              <div key={size.value} className="flex items-center space-x-2">
                <RadioGroupItem value={size.value} id={size.value} />
                <Label htmlFor={size.value} className="cursor-pointer font-normal">
                  {size.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="currentChallenges">Principais desafios atuais *</Label>
          <Textarea
            id="currentChallenges"
            name="currentChallenges"
            value={formData.currentChallenges}
            onChange={handleInputChange}
            rows={3}
            required
            placeholder="Descreva os principais problemas que sua empresa enfrenta..."
            className={validationErrors.currentChallenges ? "border-destructive" : ""}
          />
          {validationErrors.currentChallenges && (
            <p className="text-sm text-destructive mt-1">{validationErrors.currentChallenges}</p>
          )}
        </div>

        <div>
          <Label htmlFor="goals">Objetivos com a consultoria *</Label>
          <Textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleInputChange}
            rows={3}
            required
            placeholder="O que você espera alcançar?"
            className={validationErrors.goals ? "border-destructive" : ""}
          />
          {validationErrors.goals && (
            <p className="text-sm text-destructive mt-1">{validationErrors.goals}</p>
          )}
        </div>

        <div>
          <Label htmlFor="timeline">Prazo para implementação</Label>
          <Input
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            placeholder="Ex: Imediato, 3 meses, 6 meses..."
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
          Agende uma conversa estratégica sem compromisso
        </p>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Agendar Conversa com Victor"}
        </Button>
      </div>
    </form>
  );
};

export default ConsultingForm;
