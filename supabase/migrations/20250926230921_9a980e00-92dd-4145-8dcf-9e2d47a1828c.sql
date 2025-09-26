-- Drop the existing INSERT policy and create a more explicit one
DROP POLICY IF EXISTS "Allow public form submissions" ON public.onboarding_general;

-- Create a new policy that explicitly allows anonymous users to insert
CREATE POLICY "Allow anonymous form submissions" 
ON public.onboarding_general 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);