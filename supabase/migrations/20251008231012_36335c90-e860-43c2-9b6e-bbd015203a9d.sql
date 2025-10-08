-- Enable RLS on leads_central table
ALTER TABLE public.leads_central ENABLE ROW LEVEL SECURITY;

-- Allow public (anonymous) users to insert leads
CREATE POLICY "Anyone can submit leads"
  ON public.leads_central
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view leads
CREATE POLICY "Only admins can view leads"
  ON public.leads_central
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only admins can update leads
CREATE POLICY "Only admins can update leads"
  ON public.leads_central
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admins can delete leads
CREATE POLICY "Only admins can delete leads"
  ON public.leads_central
  FOR DELETE
  TO authenticated
  USING (public.is_admin());