import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";

const OnboardingGeneral = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { elementRef: formRef, isVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    jobTitle: "",
    companyWebsite: "",
    serviceInterest: "",
    challengeDescription: "",
    expectedResult: "",
    timeline: "",
    budgetRange: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('onboarding_general')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          company_name: formData.companyName || null,
          job_title: formData.jobTitle || null,
          company_website: formData.companyWebsite || null,
          service_interest: formData.serviceInterest,
          challenge_description: formData.challengeDescription,
          expected_result: formData.expectedResult || null,
          timeline: formData.timeline || null,
          budget_range: formData.budgetRange || null
        })
        .select()
        .single();

      if (error) throw error;

      // Don't show success toast here - only show after final form submission

      // Redirect based on service interest
      const redirectMap: { [key: string]: string } = {
        'automation': '/onboarding/automation',
        'ai_infrastructure': '/onboarding/ai-infrastructure',
        'chatbots': '/onboarding/chatbot',
        'website': '/onboarding/website',
        'consultation': '/contact'
      };

      const redirectPath = redirectMap[formData.serviceInterest];
      if (redirectPath && redirectPath !== '/contact') {
        // Remove toast from here - it will be shown only in the final form
        navigate(`${redirectPath}?id=${data.id}`);
      } else {
        // Show toast for consultation since it doesn't have a follow-up form
        toast({
          title: "Formulário enviado com sucesso!",
          description: "Obrigado pelo seu interesse. Em breve entraremos em contato.",
        });
        
        // Reset form for consultation
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          jobTitle: "",
          companyWebsite: "",
          serviceInterest: "",
          challengeDescription: "",
          expectedResult: "",
          timeline: "",
          budgetRange: ""
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Tente novamente ou entre em contato diretamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <Card 
        ref={formRef}
        className={`max-w-4xl mx-auto transform transition-all duration-1000 shadow-2xl ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Vamos Começar a Transformação Digital do seu Negócio!
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            Olá! Meu nome é Victor de Almeida Senisse e estou animado para explorarmos juntos 
            o potencial da automação e da inteligência artificial para o seu negócio. Este formulário 
            inicial nos ajudará a entender seus objetivos. Por favor, preencha com o máximo de detalhes possível.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção 1: Informações de Contato */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Informações de Contato</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Label htmlFor="fullName">Seu nome completo *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Seu melhor e-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="companyName">Nome da sua empresa</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="jobTitle">Seu cargo na empresa</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="companyWebsite">Website da empresa (se houver)</Label>
                <Input
                  id="companyWebsite"
                  type="url"
                  placeholder="https://"
                  value={formData.companyWebsite}
                  onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Seção 2: Objetivo Principal */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Qual é o seu principal objetivo?</h3>
              
              <div>
                <Label>Qual dos meus serviços mais lhe interessa neste momento? *</Label>
                <RadioGroup 
                  value={formData.serviceInterest} 
                  onValueChange={(value) => handleInputChange('serviceInterest', value)}
                  className="mt-3 space-y-3"
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="automation" id="automation" />
                    <Label htmlFor="automation">Automação de Processos (RPA & Workflows)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ai_infrastructure" id="ai_infrastructure" />
                    <Label htmlFor="ai_infrastructure">Solução de IA com Infraestrutura</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chatbots" id="chatbots" />
                    <Label htmlFor="chatbots">Criação de Chatbots com Inteligência Artificial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="website" id="website" />
                    <Label htmlFor="website">Desenvolvimento de Site Personalizado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consultation" id="consultation" />
                    <Label htmlFor="consultation">Ainda não tenho certeza, preciso de uma consultoria</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Seção 3: Visão Geral do Projeto */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Visão Geral do Projeto</h3>
              
              <div>
                <Label htmlFor="challengeDescription">
                  Descreva em poucas palavras o desafio que você está enfrentando ou o que você gostaria de alcançar *
                </Label>
                <Textarea
                  id="challengeDescription"
                  value={formData.challengeDescription}
                  onChange={(e) => handleInputChange('challengeDescription', e.target.value)}
                  required
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expectedResult">
                  Qual é o principal resultado que você espera alcançar com este projeto? 
                  (Ex: Reduzir custos, aumentar a produtividade da equipe, melhorar a experiência do cliente, etc.)
                </Label>
                <Textarea
                  id="expectedResult"
                  value={formData.expectedResult}
                  onChange={(e) => handleInputChange('expectedResult', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Label htmlFor="timeline">Você tem um prazo em mente para a implementação deste projeto?</Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgente (próximas 4 semanas)</SelectItem>
                      <SelectItem value="flexible">Flexível (próximos 3 meses)</SelectItem>
                      <SelectItem value="planning">Ainda estou planejando (sem prazo definido)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Qual é a faixa de orçamento que você está considerando para este projeto?</Label>
                  <RadioGroup 
                    value={formData.budgetRange} 
                    onValueChange={(value) => handleInputChange('budgetRange', value)}
                    className="mt-3 space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="up_to_5k" id="up_to_5k" />
                      <Label htmlFor="up_to_5k" className="text-sm">Até R$ 5.000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5k_to_15k" id="5k_to_15k" />
                      <Label htmlFor="5k_to_15k" className="text-sm">Entre R$ 5.001 e R$ 15.000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="15k_to_30k" id="15k_to_30k" />
                      <Label htmlFor="15k_to_30k" className="text-sm">Entre R$ 15.001 e R$ 30.000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="above_30k" id="above_30k" />
                      <Label htmlFor="above_30k" className="text-sm">Acima de R$ 30.000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer_meeting" id="prefer_meeting" />
                      <Label htmlFor="prefer_meeting" className="text-sm">Prefiro discutir em uma reunião</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar e Continuar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingGeneral;