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

const OnboardingAIInfrastructure = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onboardingId = searchParams.get('id');
  const { elementRef: formRef, isVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    aiSolutionType: [] as string[],
    otherSolution: "",
    aiObjectives: "",
    dataSources: "",
    infrastructureRequirements: "",
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

  const solutionOptions = [
    "Machine Learning Personalizado",
    "Processamento de Linguagem Natural (NLP)",
    "Análise Preditiva e Forecasting",
    "Computer Vision e Análise de Imagens",
    "Sistemas de Recomendação",
    "Análise de Sentimentos",
    "Automação Inteligente de Decisões",
    "Assistente Virtual Corporativo"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSolutionChange = (solution: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      aiSolutionType: checked 
        ? [...prev.aiSolutionType, solution]
        : prev.aiSolutionType.filter(s => s !== solution)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const solutionsArray = [...formData.aiSolutionType];
      if (formData.otherSolution) {
        solutionsArray.push(`Outro: ${formData.otherSolution}`);
      }

      const { error } = await supabase
        .from('onboarding_ai_infrastructure')
        .insert({
          onboarding_general_id: onboardingId,
          ai_solution_type: solutionsArray,
          ai_objectives: formData.aiObjectives,
          data_sources: formData.dataSources || null,
          infrastructure_requirements: formData.infrastructureRequirements || null,
          system_integrations: formData.systemIntegrations || null,
          computational_resources: formData.computationalResources || null,
          data_volume_description: formData.dataVolumeDescription || null,
          expected_accuracy: formData.expectedAccuracy || null,
          deployment_timeline: formData.deploymentTimeline || null,
          compliance_requirements: formData.complianceRequirements || null
        });

      if (error) throw error;

      toast({
        title: "Detalhes da solução de IA enviados!",
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
            Excelente! Vamos criar uma solução de inteligência artificial robusta e escalável para o seu negócio. 
            Para isso, preciso entender seus objetivos, dados disponíveis e requisitos de infraestrutura.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção 1: Tipo de Solução */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Tipo de Solução de IA</h3>
              
              <div>
                <Label>Que tipo de solução de inteligência artificial você precisa? *</Label>
                <div className="mt-3 space-y-3">
                  {solutionOptions.map((solution) => (
                    <div key={solution} className="flex items-center space-x-2">
                      <Checkbox
                        id={solution}
                        checked={formData.aiSolutionType.includes(solution)}
                        onCheckedChange={(checked) => handleSolutionChange(solution, checked as boolean)}
                      />
                      <Label htmlFor={solution}>{solution}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherSolution"
                      checked={formData.otherSolution !== ""}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          setFormData(prev => ({ ...prev, otherSolution: "" }));
                        }
                      }}
                    />
                    <Label htmlFor="otherSolution">Outro:</Label>
                    <Input
                      value={formData.otherSolution}
                      onChange={(e) => handleInputChange('otherSolution', e.target.value)}
                      placeholder="Especifique"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="aiObjectives">
                  Descreva em detalhes quais problemas você quer resolver com IA e quais resultados espera *
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Aumentar conversões em 25%, automatizar análise de documentos, prever demanda de produtos
                </p>
                <Textarea
                  id="aiObjectives"
                  value={formData.aiObjectives}
                  onChange={(e) => handleInputChange('aiObjectives', e.target.value)}
                  required
                  rows={5}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Seção 2: Dados e Infraestrutura */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Dados e Infraestrutura</h3>
              
              <div>
                <Label htmlFor="dataSources">
                  Quais dados você tem disponíveis para treinar a IA?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Base de clientes, histórico de vendas, logs de sistema, imagens, textos, etc.
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
                  Qual o volume aproximado de dados que você possui?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: 100GB de dados históricos, 10 mil registros de clientes, 50 mil imagens
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
                  Você tem algum requisito específico de infraestrutura?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Deve rodar on-premise, precisa de alta disponibilidade, integração com cloud específica
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
                <Label>Qual seu conhecimento sobre recursos computacionais necessários?</Label>
                <RadioGroup 
                  value={formData.computationalResources} 
                  onValueChange={(value) => handleInputChange('computationalResources', value)}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no_knowledge" id="no_knowledge" />
                    <Label htmlFor="no_knowledge">Não tenho conhecimento técnico, preciso de orientação completa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic">Conhecimento básico, quero sugestões de configuração</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Conheço bem, posso discutir especificações técnicas</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Seção 3: Integrações e Requisitos */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Integrações e Requisitos</h3>
              
              <div>
                <Label htmlFor="systemIntegrations">
                  Com quais sistemas a solução de IA precisa se integrar?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: CRM, ERP, site/e-commerce, bancos de dados existentes, APIs
                </p>
                <Textarea
                  id="systemIntegrations"
                  value={formData.systemIntegrations}
                  onChange={(e) => handleInputChange('systemIntegrations', e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expectedAccuracy">
                  Qual nível de precisão você espera da IA?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Pelo menos 90% de acertos, tolerância a alguns erros, precisão máxima é crítica
                </p>
                <Input
                  id="expectedAccuracy"
                  value={formData.expectedAccuracy}
                  onChange={(e) => handleInputChange('expectedAccuracy', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="deploymentTimeline">
                  Qual o prazo ideal para implementação?
                </Label>
                <RadioGroup 
                  value={formData.deploymentTimeline} 
                  onValueChange={(value) => handleInputChange('deploymentTimeline', value)}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent_ai" />
                    <Label htmlFor="urgent_ai">Urgente (até 2 meses)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Padrão (2-6 meses)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="extended" id="extended" />
                    <Label htmlFor="extended">Projeto longo (6+ meses)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="flexible_ai" />
                    <Label htmlFor="flexible_ai">Flexível (sem prazo definido)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="complianceRequirements">
                  Você tem requisitos de compliance ou segurança específicos?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: LGPD, dados sensíveis, certificações necessárias, auditoria
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

export default OnboardingAIInfrastructure;