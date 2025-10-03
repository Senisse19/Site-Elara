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

const OnboardingWebsite = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onboardingId = searchParams.get('id');
  const { elementRef: formRef, isVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    brandIdentityStatus: "",
    admiredWebsites: "",
    dislikedElements: "",
    brandKeywords: "",
    desiredPages: [] as string[],
    otherPage: "",
    contentReadiness: "",
    mainCallToAction: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!onboardingId) {
      navigate('/onboarding');
    }
  }, [onboardingId, navigate]);

  const pageOptions = [
    "Home",
    "Sobre Nós",
    "Serviços / Produtos",
    "Blog / Notícias",
    "Contato (com formulário)",
    "Depoimentos de Clientes",
    "Portfólio / Cases de Sucesso"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (page: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      desiredPages: checked 
        ? [...prev.desiredPages, page]
        : prev.desiredPages.filter(p => p !== page)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const pagesArray = [...formData.desiredPages];
      if (formData.otherPage) {
        pagesArray.push(`Outra: ${formData.otherPage}`);
      }

      const { error } = await supabase
        .from('onboarding_website')
        .insert({
          onboarding_general_id: onboardingId,
          brand_identity_status: formData.brandIdentityStatus || null,
          admired_websites: formData.admiredWebsites || null,
          disliked_elements: formData.dislikedElements || null,
          brand_keywords: formData.brandKeywords || null,
          desired_pages: pagesArray,
          content_readiness: formData.contentReadiness || null,
          main_call_to_action: formData.mainCallToAction
        });

      if (error) throw error;

      toast({
        title: "Detalhes do website enviados!",
        description: "Obrigado pelas informações detalhadas. Em breve entraremos em contato para discutir seu site personalizado.",
      });

      window.scrollTo(0, 0);
      navigate('/');
    } catch (error) {
      console.error('Error submitting website details:', error);
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
            Onboarding - Desenvolvimento de Site Personalizado
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            Excelente escolha! Seu site é a vitrine digital do seu negócio. Para criar uma experiência 
            única e que gere resultados, preciso entender sua visão, seu público e sua marca.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção 1: Identidade e Design */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Identidade e Design</h3>
              
              <div>
                <Label>Você já tem uma identidade visual definida (logotipo, paleta de cores, fontes)?</Label>
                <RadioGroup 
                  value={formData.brandIdentityStatus} 
                  onValueChange={(value) => handleInputChange('brandIdentityStatus', value)}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="complete_manual" id="complete_manual" />
                    <Label htmlFor="complete_manual">Sim, tenho tudo definido e um manual da marca</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="logo_only" id="logo_only" />
                    <Label htmlFor="logo_only">Tenho um logotipo, mas as cores e fontes são flexíveis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="need_help" id="need_help" />
                    <Label htmlFor="need_help">Não, preciso de ajuda para criar a identidade visual</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="admiredWebsites">
                  Por favor, liste 3 a 5 sites que você admira (sejam eles de concorrentes ou não) *
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  O que você gosta neles? (Ex: O design, a facilidade de uso, as funcionalidades)
                </p>
                <Textarea
                  id="admiredWebsites"
                  value={formData.admiredWebsites}
                  onChange={(e) => handleInputChange('admiredWebsites', e.target.value)}
                  required
                  rows={5}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dislikedElements">
                  Agora, liste algum site ou elemento de design que você NÃO gosta
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  O que te desagrada? Isso me ajuda a entender o que evitar.
                </p>
                <Textarea
                  id="dislikedElements"
                  value={formData.dislikedElements}
                  onChange={(e) => handleInputChange('dislikedElements', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="brandKeywords">
                  Que palavras-chave descrevem a sensação que seu site deve transmitir aos visitantes?
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Moderno, confiável, inovador, elegante, divertido, acolhedor
                </p>
                <Input
                  id="brandKeywords"
                  value={formData.brandKeywords}
                  onChange={(e) => handleInputChange('brandKeywords', e.target.value)}
                  placeholder="Separe as palavras por vírgula"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Seção 2: Estrutura e Conteúdo */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">Estrutura e Conteúdo</h3>
              
              <div>
                <Label>Quais páginas você imagina para o seu site?</Label>
                <div className="mt-3 space-y-3">
                  {pageOptions.map((page) => (
                    <div key={page} className="flex items-center space-x-2">
                      <Checkbox
                        id={page}
                        checked={formData.desiredPages.includes(page)}
                        onCheckedChange={(checked) => handlePageChange(page, checked as boolean)}
                      />
                      <Label htmlFor={page}>{page}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherPage"
                      checked={formData.otherPage !== ""}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          setFormData(prev => ({ ...prev, otherPage: "" }));
                        }
                      }}
                    />
                    <Label htmlFor="otherPage">Outra:</Label>
                    <Input
                      value={formData.otherPage}
                      onChange={(e) => handleInputChange('otherPage', e.target.value)}
                      placeholder="Especifique"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Você já tem o conteúdo (textos, imagens, vídeos) pronto para estas páginas?</Label>
                <RadioGroup 
                  value={formData.contentReadiness} 
                  onValueChange={(value) => handleInputChange('contentReadiness', value)}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ready" id="ready" />
                    <Label htmlFor="ready">Sim, todo o conteúdo está pronto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="partial" />
                    <Label htmlFor="partial">Tenho parte do conteúdo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="need_help" id="content_help" />
                    <Label htmlFor="content_help">Não, preciso de ajuda com a produção do conteúdo</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="mainCallToAction">
                  Qual é a principal ação que você quer que o visitante realize no seu site? *
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Ex: Preencher um formulário de contato, comprar um produto, agendar uma demonstração
                </p>
                <Input
                  id="mainCallToAction"
                  value={formData.mainCallToAction}
                  onChange={(e) => handleInputChange('mainCallToAction', e.target.value)}
                  required
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

export default OnboardingWebsite;