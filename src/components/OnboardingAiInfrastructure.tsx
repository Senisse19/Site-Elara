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

const OnboardingAiInfrastructure = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onboardingId = searchParams.get('id');
  const { elementRef: formRef, isVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    aiSolutionType: [] as string[],
    otherSolutionType: "",
    dataSources: "",
    infrastructureRequirements: "",
    aiObjectives: "",
    systemIntegrations: "",
    computationalResources: "",
    dataVolumeDescription: "",
    expectedAccuracy: "",
    deploymentTimeline: "",
    complianceRequirements: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!onboardingId) {
      navigate('/onboarding');
    }
  }, [onboardingId, navigate]);

  const solutionTypeOptions = [
    "Análise Preditiva e Forecasting",
    "Processamento de Linguagem Natural (NLP)",
    "Visão Computacional e Análise de Imagens",
    "Sistemas de Recomendação Inteligentes",
    "Automação de Decisões com Machine Learning",
    "Análise de Sentimentos e Mídias Sociais",
    "Otimização de Processos com IA"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSolutionTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      aiSolutionType: checked 
        ? [...prev.aiSolutionType, type]
        : prev.aiSolutionType.filter(t => t !== type)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const solutionTypesArray = [...formData.aiSolutionType];
      if (formData.otherSolutionType) {
        solutionTypesArray.push(`Outro: ${formData.otherSolutionType}`);
      }

      const { error } = await supabase
        .from('onboarding_ai_infrastructure')
        .insert({
          onboarding_general_id: onboardingId,
          ai_solution_type: solutionTypesArray,
          data_sources: formData.dataSources || null,
          infrastructure_requirements: formData.infrastructureRequirements || null,
          ai_objectives: formData.aiObjectives,
          system_integrations: formData.systemIntegrations || null,
          computational_resources: formData.computationalResources || null,
          data_volume_description: formData.dataVolumeDescription || null,
          expected_accuracy: formData.expectedAccuracy || null,
          deployment_timeline: formData.deploymentTimeline || null,
          compliance_requirements: formData.complianceRequirements || null
        });

      if (error) throw error;

      toast({
        title: "Detalhes de IA enviados com sucesso!",
        description: "Obrigado pelas informações detalhadas. Em breve entraremos em contato para discutir sua solução de IA personalizada.",
      });

      navigate('/');
    } catch (error) {
      console.error('Error submitting AI infrastructure details:', error);
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
            Onboarding - Solução de IA com Infraestrutura
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            Excelente! Vamos criar uma solução de inteligência artificial robusta para transformar seus dados em insights valiosos. 
            Para desenvolver a infraestrutura ideal, preciso entender seus objetivos e requisitos específicos.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção 1: Tipo de Solução de IA */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Tipo de Solução de IA</h3>
              
              <div>
                <Label>Que tipo de solução de IA você está interessado em implementar? *</Label>
                <div className="mt-3 space-y-3">
                  {solutionTypeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.aiSolutionType.includes(type)}
                        onCheckedChange={(checked) => handleSolutionTypeChange(type, checked as boolean)}
                      />
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherSolutionType"
                      checked={formData.otherSolutionType !== ""}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          setFormData(prev => ({ ...prev, otherSolutionType: "" }));
                        }
                      }}
                    />
                    <Label htmlFor="otherSolutionType">Outro:</Label>
                    <Input
                      value={formData.otherSolutionType}
                      onChange={(e) => handleInputChange('otherSolutionType', e.target.value)}
                      placeholder="Especifique"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="aiObjectives">
                  Quais são os principais objetivos que você espera alcançar com a implementação da IA? *
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Reduzir custos operacionais, melhorar precisão de previsões, automatizar análises, etc.
                </p>
                <Textarea
                  id="aiObjectives"
                  value={formData.aiObjectives}
                  onChange={(e) => handleInputChange('aiObjectives', e.target.value)}
                  required
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Seção 2: Dados e Infraestrutura */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Dados e Infraestrutura</h3>
              
              <div>
                <Label htmlFor="dataSources">
                  Que tipos de dados você possui e onde eles estão armazenados?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Dados de vendas em Excel, logs de sistema, imagens de produtos, dados de CRM, etc.
                </p>
                <Textarea
                  id="dataSources"
                  value={formData.dataSources}
                  onChange={(e) => handleInputChange('dataSources', e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dataVolumeDescription">
                  Qual é o volume aproximado de dados que você possui?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: 10GB de planilhas, 1 milhão de registros de transações, 50 mil imagens, etc.
                </p>
                <Textarea
                  id="dataVolumeDescription"
                  value={formData.dataVolumeDescription}
                  onChange={(e) => handleInputChange('dataVolumeDescription', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="infrastructureRequirements">
                  Você possui alguma infraestrutura computacional específica ou preferências?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Servidores próprios, preferência por cloud (AWS, Azure, Google Cloud), etc.
                </p>
                <Textarea
                  id="infrastructureRequirements"
                  value={formData.infrastructureRequirements}
                  onChange={(e) => handleInputChange('infrastructureRequirements', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Que recursos computacionais você está disposto a investir?</Label>
                <RadioGroup 
                  value={formData.computationalResources} 
                  onValueChange={(value) => handleInputChange('computationalResources', value)}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic">Básico - Soluções simples em nuvem</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediário - Maior poder de processamento</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Avançado - Infraestrutura robusta com GPUs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <Label htmlFor="enterprise">Empresarial - Infraestrutura dedicada escalável</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Seção 3: Integração e Requisitos */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Integração e Requisitos</h3>
              
              <div>
                <Label htmlFor="systemIntegrations">
                  A solução de IA precisará se integrar com quais sistemas existentes?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: ERP, CRM, sistema de e-commerce, banco de dados específico, APIs externas, etc.
                </p>
                <Textarea
                  id="systemIntegrations"
                  value={formData.systemIntegrations}
                  onChange={(e) => handleInputChange('systemIntegrations', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expectedAccuracy">
                  Qual nível de precisão/acurácia você espera dos resultados?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: 95% de precisão nas previsões, detecção de 99% dos casos, etc.
                </p>
                <Input
                  id="expectedAccuracy"
                  value={formData.expectedAccuracy}
                  onChange={(e) => handleInputChange('expectedAccuracy', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Em quanto tempo você gostaria de ver a solução funcionando?</Label>
                <RadioGroup 
                  value={formData.deploymentTimeline} 
                  onValueChange={(value) => handleInputChange('deploymentTimeline', value)}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-2_months" id="1-2_months" />
                    <Label htmlFor="1-2_months">1-2 meses - Prototipo funcional</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-6_months" id="3-6_months" />
                    <Label htmlFor="3-6_months">3-6 meses - Solução completa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6-12_months" id="6-12_months" />
                    <Label htmlFor="6-12_months">6-12 meses - Implementação robusta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="flexible" />
                    <Label htmlFor="flexible">Flexível - Focado na qualidade</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="complianceRequirements">
                  Existem requisitos específicos de conformidade, segurança ou regulamentação?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: LGPD, GDPR, regulamentações setoriais, auditoria interna, etc.
                </p>
                <Textarea
                  id="complianceRequirements"
                  value={formData.complianceRequirements}
                  onChange={(e) => handleInputChange('complianceRequirements', e.target.value)}
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

export default OnboardingAiInfrastructure;