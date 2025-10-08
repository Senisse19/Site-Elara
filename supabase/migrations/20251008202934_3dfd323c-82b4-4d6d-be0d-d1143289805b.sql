-- Criar tabela principal de leads
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  package_type TEXT NOT NULL, -- 'automation', 'software', 'ai_agent', 'consulting'
  package_name TEXT NOT NULL,
  package_price NUMERIC,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para leads de automação de processos
CREATE TABLE public.automation_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  current_process TEXT NOT NULL,
  systems_used TEXT,
  process_frequency TEXT,
  pain_points TEXT,
  expected_results TEXT,
  has_data_integration BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para leads de desenvolvimento de software
CREATE TABLE public.software_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  project_type TEXT NOT NULL, -- 'ecommerce', 'landing_page', 'portfolio', 'blog', 'system', 'other'
  has_design BOOLEAN DEFAULT false,
  design_reference TEXT,
  required_features TEXT,
  integrations_needed TEXT,
  timeline TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para leads de agentes de IA
CREATE TABLE public.ai_agent_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL, -- 'receptionist', 'sdr', 'internal_assistant', 'social_media', 'bdr'
  current_solution TEXT,
  monthly_volume TEXT,
  integration_platforms TEXT,
  custom_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para leads de consultoria
CREATE TABLE public.consulting_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  consulting_type TEXT NOT NULL, -- 'strategy', 'implementation', 'training', 'audit'
  company_size TEXT,
  current_challenges TEXT,
  goals TEXT,
  timeline TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.software_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_agent_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consulting_leads ENABLE ROW LEVEL SECURITY;

-- Políticas de INSERT para permitir leads anônimos
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Anyone can insert automation leads"
ON public.automation_leads
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Anyone can insert software leads"
ON public.software_leads
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Anyone can insert ai agent leads"
ON public.ai_agent_leads
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Anyone can insert consulting leads"
ON public.consulting_leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Políticas de SELECT apenas para admins
CREATE POLICY "Only admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can view automation leads"
ON public.automation_leads
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can view software leads"
ON public.software_leads
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can view ai agent leads"
ON public.ai_agent_leads
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can view consulting leads"
ON public.consulting_leads
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Políticas de UPDATE e DELETE apenas para admins
CREATE POLICY "Only admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Trigger para atualizar updated_at
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();