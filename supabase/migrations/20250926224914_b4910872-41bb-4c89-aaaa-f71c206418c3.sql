-- Desabilitar RLS completamente para onboarding_general já que é um formulário público
ALTER TABLE public.onboarding_general DISABLE ROW LEVEL SECURITY;

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "anonymous_can_insert" ON public.onboarding_general;
DROP POLICY IF EXISTS "allow_admin_select_onboarding" ON public.onboarding_general;
DROP POLICY IF EXISTS "allow_admin_update_onboarding" ON public.onboarding_general;