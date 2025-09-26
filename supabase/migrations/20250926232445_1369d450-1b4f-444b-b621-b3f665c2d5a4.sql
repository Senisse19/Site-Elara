-- Criar nova tabela para onboarding de IA Infrastructure
CREATE TABLE public.onboarding_ai_infrastructure (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  onboarding_general_id UUID,
  ai_solution_type TEXT[],
  data_sources TEXT,
  infrastructure_requirements TEXT,
  ai_objectives TEXT NOT NULL,
  system_integrations TEXT,
  computational_resources TEXT,
  data_volume_description TEXT,
  expected_accuracy TEXT,
  deployment_timeline TEXT,
  compliance_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar trigger para update automático do timestamp
CREATE TRIGGER update_ai_infrastructure_updated_at
BEFORE UPDATE ON public.onboarding_ai_infrastructure
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Desabilitar RLS para permitir submissões públicas
ALTER TABLE public.onboarding_ai_infrastructure DISABLE ROW LEVEL SECURITY;