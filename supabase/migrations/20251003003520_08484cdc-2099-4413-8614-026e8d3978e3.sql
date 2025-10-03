-- Add SELECT policy to onboarding_general table to restrict access to admins only
-- This protects sensitive customer data (emails, phone numbers, names, company info)
CREATE POLICY "Only admins can view general onboarding details"
ON public.onboarding_general
FOR SELECT
TO authenticated
USING (public.is_admin());