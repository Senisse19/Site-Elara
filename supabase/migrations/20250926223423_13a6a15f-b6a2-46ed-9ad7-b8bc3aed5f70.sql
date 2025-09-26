-- Temporarily disable RLS to allow anonymous submissions
ALTER TABLE public.onboarding_general DISABLE ROW LEVEL SECURITY;

-- Or create a more permissive policy that definitely works
DROP POLICY IF EXISTS "Allow anonymous and authenticated users to insert onboarding" ON public.onboarding_general;

-- Enable RLS back
ALTER TABLE public.onboarding_general ENABLE ROW LEVEL SECURITY;

-- Create the most permissive policy possible for INSERT
CREATE POLICY "Public can insert onboarding forms" 
ON public.onboarding_general
FOR INSERT 
WITH CHECK (true);

-- Keep admin-only policies for SELECT and UPDATE
CREATE POLICY "Admins can view onboarding submissions" 
ON public.onboarding_general
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update onboarding submissions" 
ON public.onboarding_general
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);