-- Drop existing policies for onboarding_general
DROP POLICY IF EXISTS "Anyone can submit onboarding forms" ON public.onboarding_general;
DROP POLICY IF EXISTS "Only admins can view onboarding submissions" ON public.onboarding_general;
DROP POLICY IF EXISTS "Only admins can update onboarding submissions" ON public.onboarding_general;

-- Create new policies that explicitly allow anonymous and authenticated users
CREATE POLICY "Allow anonymous and authenticated users to insert onboarding" 
ON public.onboarding_general
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (true);

CREATE POLICY "Only authenticated admins can view onboarding submissions" 
ON public.onboarding_general
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only authenticated admins can update onboarding submissions" 
ON public.onboarding_general
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Apply same pattern to other onboarding tables
DROP POLICY IF EXISTS "Anyone can submit automation details" ON public.onboarding_automation;
CREATE POLICY "Allow anonymous and authenticated users to insert automation" 
ON public.onboarding_automation
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit chatbot details" ON public.onboarding_chatbot;
CREATE POLICY "Allow anonymous and authenticated users to insert chatbot" 
ON public.onboarding_chatbot
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit website details" ON public.onboarding_website;
CREATE POLICY "Allow anonymous and authenticated users to insert website" 
ON public.onboarding_website
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (true);