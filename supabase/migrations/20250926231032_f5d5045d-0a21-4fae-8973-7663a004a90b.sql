-- Desabilitar RLS na tabela onboarding_general para permitir submissões públicas
ALTER TABLE public.onboarding_general DISABLE ROW LEVEL SECURITY;

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.onboarding_general;
DROP POLICY IF EXISTS "Only admins can view submissions" ON public.onboarding_general;
DROP POLICY IF EXISTS "Only admins can update submissions" ON public.onboarding_general;
DROP POLICY IF EXISTS "Only admins can delete submissions" ON public.onboarding_general;