-- Grant explicit permissions to anon role
GRANT INSERT ON public.onboarding_general TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- Drop and recreate the policy with explicit permissions
DROP POLICY IF EXISTS "allow_anonymous_insert_onboarding" ON public.onboarding_general;

-- Create a policy that definitely allows anonymous inserts
CREATE POLICY "anonymous_can_insert" 
ON public.onboarding_general
FOR INSERT 
TO anon
WITH CHECK (true);