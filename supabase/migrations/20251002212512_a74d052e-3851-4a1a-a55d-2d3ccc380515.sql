-- Enable RLS on onboarding_general
ALTER TABLE public.onboarding_general ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert into onboarding_general
CREATE POLICY "Allow anonymous and authenticated users to insert general onboarding"
ON public.onboarding_general
FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can view general onboarding details
CREATE POLICY "Only admins can view general onboarding details"
ON public.onboarding_general
FOR SELECT
TO authenticated
USING (is_admin());

-- Enable RLS on onboarding_ai_infrastructure
ALTER TABLE public.onboarding_ai_infrastructure ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert into onboarding_ai_infrastructure
CREATE POLICY "Allow anonymous and authenticated users to insert ai infrastructure"
ON public.onboarding_ai_infrastructure
FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can view ai infrastructure details
CREATE POLICY "Only admins can view ai infrastructure details"
ON public.onboarding_ai_infrastructure
FOR SELECT
TO authenticated
USING (is_admin());