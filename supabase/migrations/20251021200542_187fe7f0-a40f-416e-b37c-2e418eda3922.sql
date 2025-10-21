-- Add SELECT policy to restrict access to leads_central table
-- Only authenticated administrators can view lead records
CREATE POLICY "Only admins can view leads"
ON public.leads_central
FOR SELECT
TO authenticated
USING (public.is_admin());