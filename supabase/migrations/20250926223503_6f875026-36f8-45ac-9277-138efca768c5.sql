-- Drop all existing policies first
DROP POLICY IF EXISTS "Allow anonymous and authenticated users to insert onboarding" ON public.onboarding_general;
DROP POLICY IF EXISTS "Public can insert onboarding forms" ON public.onboarding_general;
DROP POLICY IF EXISTS "Only authenticated admins can view onboarding submissions" ON public.onboarding_general;
DROP POLICY IF EXISTS "Only authenticated admins can update onboarding submissions" ON public.onboarding_general;
DROP POLICY IF EXISTS "Admins can view onboarding submissions" ON public.onboarding_general;
DROP POLICY IF EXISTS "Admins can update onboarding submissions" ON public.onboarding_general;

-- Disable RLS temporarily 
ALTER TABLE public.onboarding_general DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE public.onboarding_general ENABLE ROW LEVEL SECURITY;

-- Create simple, working policies
CREATE POLICY "allow_insert_onboarding" 
ON public.onboarding_general
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "allow_admin_select_onboarding" 
ON public.onboarding_general
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "allow_admin_update_onboarding" 
ON public.onboarding_general
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);