import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate, useSearchParams } from "react-router-dom";

const OnboardingAutomation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onboardingId = searchParams.get('id');
  const { elementRef: formRef, isVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    processName: "",
    currentProcessDescription: "",
    systemsUsed: [] as string[],
    otherSystem: "",
    processFrequency: "",
    inputDataDescription: "",
    expectedOutput: "",
    bottlenecksDescription: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!onboardingId) {
      navigate('/onboarding');
    }
  }, [onboardingId, navigate]);

  const systemOptions = [
    "Planilhas (Excel, Google Sheets)",
    "E-mail (Gmail, Outlook)",
    "Sistema de CRM (Salesforce, Hubspot, etc.)",
    "Sistema de ERP (SAP, TOTVS, etc.)",
    "Ferramentas de Comunicação (Slack, Teams)"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSystemChange = (system: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      systemsUsed: checked 
        ? [...prev.systemsUsed, system]
        : prev.systemsUsed.filter(s => s !== system)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const systemsArray = [...formData.systemsUsed];
      if (formData.otherSystem) {
        systemsArray.push(`Outro: ${formData.otherSystem}`);
      }

      const { error } = await supabase
        .from('onboarding_automation')
        .insert({
          onboarding_general_id: onboardingId,
          process_name: formData.processName,
          current_process_description: formData.currentProcessDescription,
          systems_used: systemsArray,
          process_frequency: formData.processFrequency || null,
          input_data_description: formData.inputDataDescription || null,
          expected_output: formData.expectedOutput || null,
          bottlenecks_description: formData.bottlenecksDescription || null
        });

      if (error) throw error;

      toast({
        title: "Detalhes de automação enviados!",
        description: "Obrigado pelas informações detalhadas. Em breve entraremos em contato para discutir sua solução personalizada.",
      });

      window.scrollTo(0, 0);
      navigate('/');
    } catch (error) {
      console.error('Error submitting automation details:', error);
      toast({
        title: "Erro ao enviar detalhes",
        description: "Tente novamente ou entre em contato diretamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card 
        ref={formRef}
        className={`max-w-4xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Onboarding - Automação de Processos
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            Ótimo! Fico feliz em ajudar a otimizar suas operações. Para que eu possa desenhar 
            a melhor solução de automação, preciso entender em detalhes o processo que você deseja automatizar.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção 1: Mapeamento do Processo */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Mapeamento do Processo</h3>
              
              <div>
                <Label htmlFor="processName">
                  Qual é o nome do processo que você quer automatizar? *
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Emissão de notas fiscais, Onboarding de novos colaboradores, Geração de relatórios financeiros
                </p>
                <Input
                  id="processName"
                  value={formData.processName}
                  onChange={(e) => handleInputChange('processName', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="currentProcessDescription">
                  Descreva o passo a passo deste processo como ele é feito hoje, manualmente *
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Por favor, seja o mais detalhado possível.
                </p>
                <Textarea
                  id="currentProcessDescription"
                  value={formData.currentProcessDescription}
                  onChange={(e) => handleInputChange('currentProcessDescription', e.target.value)}
                  required
                  rows={6}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Quais softwares, sites ou sistemas são utilizados neste processo?</Label>
                <div className="mt-3 space-y-3">
                  {systemOptions.map((system) => (
                    <div key={system} className="flex items-center space-x-2">
                      <Checkbox
                        id={system}
                        checked={formData.systemsUsed.includes(system)}
                        onCheckedChange={(checked) => handleSystemChange(system, checked as boolean)}
                      />
                      <Label htmlFor={system}>{system}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="other"
                      checked={formData.otherSystem !== ""}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          setFormData(prev => ({ ...prev, otherSystem: "" }));
                        }
                      }}
                    />
                    <Label htmlFor="other">Outro:</Label>
                    <Input
                      value={formData.otherSystem}
                      onChange={(e) => handleInputChange('otherSystem', e.target.value)}
                      placeholder="Especifique"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Com que frequência este processo é executado?</Label>
                <RadioGroup 
                  value={formData.processFrequency} 
                  onValueChange={(value) => handleInputChange('processFrequency', value)}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multiple_daily" id="multiple_daily" />
                    <Label htmlFor="multiple_daily">Várias vezes ao dia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Diariamente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Semanalmente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Mensalmente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="on_demand" id="on_demand" />
                    <Label htmlFor="on_demand">Sob demanda</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Seção 2: Dados e Desafios */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Dados e Desafios</h3>
              
              <div>
                <Label htmlFor="inputDataDescription">
                  Que tipo de dados são inseridos no início do processo e de onde eles vêm?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Dados de um formulário online, anexo de um e-mail, etc.
                </p>
                <Textarea
                  id="inputDataDescription"
                  value={formData.inputDataDescription}
                  onChange={(e) => handleInputChange('inputDataDescription', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expectedOutput">
                  Qual é o resultado final esperado do processo?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Um relatório em PDF enviado por e-mail, um cadastro atualizado no sistema X, etc.
                </p>
                <Textarea
                  id="expectedOutput"
                  value={formData.expectedOutput}
                  onChange={(e) => handleInputChange('expectedOutput', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bottlenecksDescription">
                  Quais são os maiores "gargalos" ou fontes de erro no processo atual?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Onde as coisas costumam atrasar ou dar errado?
                </p>
                <Textarea
                  id="bottlenecksDescription"
                  value={formData.bottlenecksDescription}
                  onChange={(e) => handleInputChange('bottlenecksDescription', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/onboarding')}
                className="flex-1"
              >
                Voltar
              </Button>
              <Button 
                type="submit" 
                className="flex-1 py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Finalizar Onboarding"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingAutomation;