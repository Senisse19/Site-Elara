-- Fix RLS policy for anonymous form submissions
-- Drop existing insert policy
DROP POLICY IF EXISTS "allow_insert_onboarding" ON public.onboarding_general;

-- Create new policy that explicitly allows anonymous users to insert
CREATE POLICY "allow_anonymous_insert_onboarding" 
ON public.onboarding_general
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);