-- Re-enable RLS on onboarding_general to fix security issue
ALTER TABLE public.onboarding_general ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous users) to insert into onboarding_general
-- This enables the public contact form to work
CREATE POLICY "Allow public form submissions" 
ON public.onboarding_general 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view the submitted data
CREATE POLICY "Only admins can view submissions" 
ON public.onboarding_general 
FOR SELECT 
USING (is_admin());

-- Only admins can update submissions
CREATE POLICY "Only admins can update submissions" 
ON public.onboarding_general 
FOR UPDATE 
USING (is_admin());

-- Only admins can delete submissions
CREATE POLICY "Only admins can delete submissions" 
ON public.onboarding_general 
FOR DELETE 
USING (is_admin());