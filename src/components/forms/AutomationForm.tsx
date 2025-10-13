import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { automationFormSchema } from "@/lib/validations/forms";

interface AutomationFormProps {
  onSuccess: () => void;
}

const AutomationForm = ({ onSuccess }: AutomationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentProcess: "",
    systemsUsed: "",
    processFrequency: "",
    painPoints: "",
    expectedResults: "",
    hasDataIntegration: false,
    investmentRange: "",
    additionalInfo: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    // Validate form data
    const validation = automationFormSchema.safeParse(formData);
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
      const { error: leadError } = await supabase
        .from("leads_central")
        .insert({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          source: "automacao",
          details: {
            current_process: formData.currentProcess,
            systems_used: formData.systemsUsed,
            process_frequency: formData.processFrequency,
            pain_points: formData.painPoints,
            expected_results: formData.expectedResults,
            has_data_integration: formData.hasDataIntegration,
            investment_range: formData.investmentRange,
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
        <h3 className="font-semibold text-lg">Detalhes do Processo</h3>
        
        <div>
          <Label htmlFor="currentProcess">Descreva o processo atual que deseja automatizar *</Label>
          <Textarea
            id="currentProcess"
            name="currentProcess"
            value={formData.currentProcess}
            onChange={handleInputChange}
            rows={4}
            required
            className={validationErrors.currentProcess ? "border-destructive" : ""}
          />
          {validationErrors.currentProcess && (
            <p className="text-sm text-destructive mt-1">{validationErrors.currentProcess}</p>
          )}
        </div>

        <div>
          <Label htmlFor="systemsUsed">Quais sistemas/ferramentas você utiliza atualmente?</Label>
          <Input
            id="systemsUsed"
            name="systemsUsed"
            value={formData.systemsUsed}
            onChange={handleInputChange}
            placeholder="Ex: Excel, SAP, CRM, etc."
          />
        </div>

        <div>
          <Label htmlFor="processFrequency">Com que frequência este processo é executado?</Label>
          <Input
            id="processFrequency"
            name="processFrequency"
            value={formData.processFrequency}
            onChange={handleInputChange}
            placeholder="Ex: Diariamente, semanalmente..."
          />
        </div>

        <div>
          <Label htmlFor="painPoints">Quais são os principais problemas/gargalos?</Label>
          <Textarea
            id="painPoints"
            name="painPoints"
            value={formData.painPoints}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="expectedResults">Quais resultados você espera com a automação?</Label>
          <Textarea
            id="expectedResults"
            name="expectedResults"
            value={formData.expectedResults}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasDataIntegration"
            checked={formData.hasDataIntegration}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, hasDataIntegration: checked as boolean }))
            }
          />
          <Label htmlFor="hasDataIntegration" className="cursor-pointer">
            Necessita integração com outros sistemas/dados
          </Label>
        </div>

        <div>
          <Label htmlFor="investmentRange">Faixa de Investimento (Opcional)</Label>
          <Select
            value={formData.investmentRange}
            onValueChange={(value) => setFormData(prev => ({ ...prev, investmentRange: value }))}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Selecione uma faixa" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="ate-2000">Até R$ 2.000</SelectItem>
              <SelectItem value="2000-5000">Entre R$ 2.000 e R$ 5.000</SelectItem>
              <SelectItem value="5000-10000">Entre R$ 5.000 e R$ 10.000</SelectItem>
              <SelectItem value="acima-10000">Acima de R$ 10.000</SelectItem>
            </SelectContent>
          </Select>
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
          Preencha para receber sua análise personalizada gratuita
        </p>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Solicitar Análise Gratuita"}
        </Button>
      </div>
    </form>
  );
};

export default AutomationForm;
