import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  DollarSign, 
  Calendar,
  LogOut,
  Shield,
  Users,
  Building2,
  Globe
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OnboardingGeneral {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  company_name?: string;
  job_title?: string;
  company_website?: string;
  service_interest: string;
  challenge_description: string;
  expected_result?: string;
  timeline?: string;
  budget_range?: string;
  status?: string;
}

interface OnboardingAutomation {
  id: string;
  created_at: string;
  process_name: string;
  current_process_description: string;
  systems_used?: string[];
  process_frequency?: string;
  input_data_description?: string;
  expected_output?: string;
  bottlenecks_description?: string;
}

interface OnboardingChatbot {
  id: string;
  created_at: string;
  main_functions?: string[];
  platforms?: string[];
  personality_description?: string;
  frequent_questions?: string;
  system_integrations?: string;
  human_transfer_criteria?: string;
}

interface OnboardingWebsite {
  id: string;
  created_at: string;
  brand_identity_status?: string;
  admired_websites?: string;
  disliked_elements?: string;
  brand_keywords?: string;
  desired_pages?: string[];
  content_readiness?: string;
  main_call_to_action: string;
}

export default function AdminDashboard() {
  const [generalForms, setGeneralForms] = useState<OnboardingGeneral[]>([]);
  const [automationForms, setAutomationForms] = useState<OnboardingAutomation[]>([]);
  const [chatbotForms, setChatbotForms] = useState<OnboardingChatbot[]>([]);
  const [websiteForms, setWebsiteForms] = useState<OnboardingWebsite[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!isAdmin) {
      toast.error('Acesso negado. Apenas administradores podem acessar esta página.');
      navigate('/');
      return;
    }

    fetchAllData();
  }, [user, isAdmin, navigate]);

  const fetchAllData = async () => {
    try {
      const [generalRes, automationRes, chatbotRes, websiteRes] = await Promise.all([
        supabase.from('onboarding_general').select('*').order('created_at', { ascending: false }),
        supabase.from('onboarding_automation').select('*').order('created_at', { ascending: false }),
        supabase.from('onboarding_chatbot').select('*').order('created_at', { ascending: false }),
        supabase.from('onboarding_website').select('*').order('created_at', { ascending: false })
      ]);

      if (generalRes.error) throw generalRes.error;
      if (automationRes.error) throw automationRes.error;
      if (chatbotRes.error) throw chatbotRes.error;
      if (websiteRes.error) throw websiteRes.error;

      setGeneralForms(generalRes.data || []);
      setAutomationForms(automationRes.data || []);
      setChatbotForms(chatbotRes.data || []);
      setWebsiteForms(websiteRes.data || []);
    } catch (error) {
      toast.error('Erro ao carregar dados.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBudgetColor = (budget?: string) => {
    if (!budget) return 'secondary';
    if (budget.includes('30k')) return 'default';
    if (budget.includes('15k')) return 'destructive';
    if (budget.includes('5k')) return 'outline';
    return 'secondary';
  };

  const getServiceBadgeVariant = (service: string) => {
    switch (service) {
      case 'automation': return 'default';
      case 'ai_agents':
      case 'chatbots': return 'secondary';
      case 'website': return 'outline';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  const totalForms = generalForms.length;
  const todayForms = generalForms.filter(f => 
    new Date(f.created_at).toDateString() === new Date().toDateString()
  ).length;
  const highBudgetForms = generalForms.filter(f => 
    f.budget_range?.includes('30k') || f.budget_range?.includes('15k')
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Painel Administrativo</h1>
              <p className="text-muted-foreground">Gerencie formulários de onboarding</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Voltar ao Site
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Leads</p>
                  <p className="text-2xl font-bold">{totalForms}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hoje</p>
                  <p className="text-2xl font-bold">{todayForms}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alto Orçamento</p>
                  <p className="text-2xl font-bold">{highBudgetForms}</p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Formulários Detalhados</p>
                  <p className="text-2xl font-bold">{automationForms.length + chatbotForms.length + websiteForms.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forms Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Geral ({generalForms.length})</TabsTrigger>
            <TabsTrigger value="automation">Automação ({automationForms.length})</TabsTrigger>
            <TabsTrigger value="chatbot">Chatbot ({chatbotForms.length})</TabsTrigger>
            <TabsTrigger value="website">Website ({websiteForms.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Formulários Gerais de Onboarding
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generalForms.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum formulário encontrado.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {generalForms.map((form) => (
                      <div
                        key={form.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{form.full_name}</h3>
                              <Badge variant={getServiceBadgeVariant(form.service_interest)}>
                                {form.service_interest}
                              </Badge>
                              {form.budget_range && (
                                <Badge variant={getBudgetColor(form.budget_range)}>
                                  {form.budget_range.replace('_', '-')}
                                </Badge>
                              )}
                              {form.timeline && (
                                <Badge variant="outline">
                                  {form.timeline}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                <a 
                                  href={`mailto:${form.email}`}
                                  className="hover:text-primary"
                                >
                                  {form.email}
                                </a>
                              </div>
                              
                              {form.company_name && (
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  {form.company_name}
                                </div>
                              )}

                              {form.company_website && (
                                <div className="flex items-center gap-1">
                                  <Globe className="w-4 h-4" />
                                  <a 
                                    href={form.company_website}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-primary"
                                  >
                                    Website
                                  </a>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(form.created_at)}
                              </div>
                            </div>
                            
                            {form.job_title && (
                              <p className="font-medium text-sm">
                                Cargo: {form.job_title}
                              </p>
                            )}
                            
                            <div className="text-sm bg-muted/50 p-3 rounded space-y-2">
                              <p><strong>Desafio:</strong> {form.challenge_description}</p>
                              {form.expected_result && (
                                <p><strong>Resultado Esperado:</strong> {form.expected_result}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Formulários de Automação</CardTitle>
              </CardHeader>
              <CardContent>
                {automationForms.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum formulário de automação encontrado.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {automationForms.map((form) => (
                      <div key={form.id} className="border rounded-lg p-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{form.process_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(form.created_at)}
                          </p>
                          <p className="text-sm bg-muted/50 p-3 rounded">
                            {form.current_process_description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chatbot" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Formulários de Chatbot</CardTitle>
              </CardHeader>
              <CardContent>
                {chatbotForms.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum formulário de chatbot encontrado.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {chatbotForms.map((form) => (
                      <div key={form.id} className="border rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm text-muted-foreground">
                              {formatDate(form.created_at)}
                            </span>
                          </div>
                          {form.personality_description && (
                            <p className="text-sm bg-muted/50 p-3 rounded">
                              <strong>Personalidade:</strong> {form.personality_description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="website" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Formulários de Website</CardTitle>
              </CardHeader>
              <CardContent>
                {websiteForms.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum formulário de website encontrado.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {websiteForms.map((form) => (
                      <div key={form.id} className="border rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            <span className="text-sm text-muted-foreground">
                              {formatDate(form.created_at)}
                            </span>
                          </div>
                          <p className="text-sm bg-muted/50 p-3 rounded">
                            <strong>Call to Action:</strong> {form.main_call_to_action}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}