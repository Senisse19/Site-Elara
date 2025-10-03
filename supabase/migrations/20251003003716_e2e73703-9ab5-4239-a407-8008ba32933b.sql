-- Add UPDATE and DELETE policies restricted to admins only for all onboarding tables
-- This prevents unauthorized modification or deletion of customer data

-- onboarding_general table
CREATE POLICY "Only admins can update general onboarding"
ON public.onboarding_general
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete general onboarding"
ON public.onboarding_general
FOR DELETE
TO authenticated
USING (public.is_admin());

-- onboarding_automation table
CREATE POLICY "Only admins can update automation"
ON public.onboarding_automation
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete automation"
ON public.onboarding_automation
FOR DELETE
TO authenticated
USING (public.is_admin());

-- onboarding_chatbot table
CREATE POLICY "Only admins can update chatbot"
ON public.onboarding_chatbot
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete chatbot"
ON public.onboarding_chatbot
FOR DELETE
TO authenticated
USING (public.is_admin());

-- onboarding_website table
CREATE POLICY "Only admins can update website"
ON public.onboarding_website
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete website"
ON public.onboarding_website
FOR DELETE
TO authenticated
USING (public.is_admin());

-- onboarding_ai_infrastructure table
CREATE POLICY "Only admins can update ai infrastructure"
ON public.onboarding_ai_infrastructure
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete ai infrastructure"
ON public.onboarding_ai_infrastructure
FOR DELETE
TO authenticated
USING (public.is_admin());