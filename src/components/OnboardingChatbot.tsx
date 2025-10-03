import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate, useSearchParams } from "react-router-dom";

const OnboardingChatbot = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onboardingId = searchParams.get('id');
  const { elementRef: formRef, isVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    mainFunctions: [] as string[],
    otherFunction: "",
    platforms: [] as string[],
    otherPlatform: "",
    personalityDescription: "",
    frequentQuestions: "",
    systemIntegrations: "",
    humanTransferCriteria: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!onboardingId) {
      navigate('/onboarding');
    }
  }, [onboardingId, navigate]);

  const functionOptions = [
    "Atendimento ao Cliente (SAC)",
    "Qualificação de Leads (Vendas)",
    "Suporte Técnico Primário",
    "Assistente Interno para a equipe",
    "Agendamento de Reuniões/Serviços"
  ];

  const platformOptions = [
    "Website da empresa",
    "WhatsApp",
    "Instagram",
    "Slack / Microsoft Teams"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'mainFunctions' | 'platforms', item: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], item]
        : prev[field].filter(i => i !== item)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const functionsArray = [...formData.mainFunctions];
      if (formData.otherFunction) {
        functionsArray.push(`Outro: ${formData.otherFunction}`);
      }

      const platformsArray = [...formData.platforms];
      if (formData.otherPlatform) {
        platformsArray.push(`Outro: ${formData.otherPlatform}`);
      }

      const { error } = await supabase
        .from('onboarding_chatbot')
        .insert({
          onboarding_general_id: onboardingId,
          main_functions: functionsArray,
          platforms: platformsArray,
          personality_description: formData.personalityDescription || null,
          frequent_questions: formData.frequentQuestions || null,
          system_integrations: formData.systemIntegrations || null,
          human_transfer_criteria: formData.humanTransferCriteria || null
        });

      if (error) throw error;

      toast({
        title: "Detalhes do chatbot enviados!",
        description: "Obrigado pelas informações detalhadas. Em breve entraremos em contato para discutir seu assistente de IA personalizado.",
      });

      window.scrollTo(0, 0);
      navigate('/');
    } catch (error) {
      console.error('Error submitting chatbot details:', error);
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
            Onboarding - Inteligência Artificial Conversacional
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            Perfeito! Um assistente de IA pode revolucionar a forma como você interage com seus clientes 
            e gerencia informações. Vamos definir a personalidade e as tarefas do seu novo agente ou chatbot.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção 1: Objetivo e Personalidade */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Objetivo e Personalidade</h3>
              
              <div>
                <Label>Qual será a principal função do seu chatbot/agente de IA? *</Label>
                <div className="mt-3 space-y-3">
                  {functionOptions.map((func) => (
                    <div key={func} className="flex items-center space-x-2">
                      <Checkbox
                        id={func}
                        checked={formData.mainFunctions.includes(func)}
                        onCheckedChange={(checked) => handleArrayChange('mainFunctions', func, checked as boolean)}
                      />
                      <Label htmlFor={func}>{func}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherFunction"
                      checked={formData.otherFunction !== ""}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          setFormData(prev => ({ ...prev, otherFunction: "" }));
                        }
                      }}
                    />
                    <Label htmlFor="otherFunction">Outro:</Label>
                    <Input
                      value={formData.otherFunction}
                      onChange={(e) => handleInputChange('otherFunction', e.target.value)}
                      placeholder="Especifique"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Onde o chatbot irá operar?</Label>
                <div className="mt-3 space-y-3">
                  {platformOptions.map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox
                        id={platform}
                        checked={formData.platforms.includes(platform)}
                        onCheckedChange={(checked) => handleArrayChange('platforms', platform, checked as boolean)}
                      />
                      <Label htmlFor={platform}>{platform}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherPlatform"
                      checked={formData.otherPlatform !== ""}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          setFormData(prev => ({ ...prev, otherPlatform: "" }));
                        }
                      }}
                    />
                    <Label htmlFor="otherPlatform">Outro:</Label>
                    <Input
                      value={formData.otherPlatform}
                      onChange={(e) => handleInputChange('otherPlatform', e.target.value)}
                      placeholder="Especifique"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="personalityDescription">
                  Descreva a "personalidade" que você imagina para o seu assistente de IA
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ele deve ser mais formal, casual, divertido, técnico?
                </p>
                <Textarea
                  id="personalityDescription"
                  value={formData.personalityDescription}
                  onChange={(e) => handleInputChange('personalityDescription', e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Seção 2: Funcionalidades e Integrações */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Funcionalidades e Integrações</h3>
              
              <div>
                <Label htmlFor="frequentQuestions">
                  Quais são as 5 perguntas mais frequentes que este chatbot deveria saber responder?
                </Label>
                <Textarea
                  id="frequentQuestions"
                  value={formData.frequentQuestions}
                  onChange={(e) => handleInputChange('frequentQuestions', e.target.value)}
                  rows={5}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="systemIntegrations">
                  O chatbot precisará se conectar a algum outro sistema para buscar ou registrar informações?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Consultar o status de um pedido em seu e-commerce, registrar um novo lead no seu CRM. Se sim, quais sistemas?
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
                <Label htmlFor="humanTransferCriteria">
                  Em que momento do diálogo você gostaria que o chatbot transferisse a conversa para um atendente humano?
                </Label>
                <Textarea
                  id="humanTransferCriteria"
                  value={formData.humanTransferCriteria}
                  onChange={(e) => handleInputChange('humanTransferCriteria', e.target.value)}
                  rows={4}
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

export default OnboardingChatbot;