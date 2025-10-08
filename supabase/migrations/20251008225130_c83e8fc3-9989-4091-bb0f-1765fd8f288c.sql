-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;

-- Add INSERT policy for profiles table
-- Only allow users to create their own profile or admins to create any profile
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Add DELETE policy for profiles table
-- Allow users to delete their own profile or admins to delete any profile
CREATE POLICY "Users can delete their own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = user_id OR public.is_admin());

-- Update handle_new_specialized_lead function to set search_path explicitly
CREATE OR REPLACE FUNCTION public.handle_new_specialized_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  lead_full_name TEXT;
  lead_email TEXT;
  lead_phone TEXT;
  lead_service_interest TEXT;
  general_data JSONB;
BEGIN
  SELECT
    full_name, email, phone, service_interest, to_jsonb(og)
  INTO
    lead_full_name, lead_email, lead_phone, lead_service_interest, general_data
  FROM
    public.onboarding_general og
  WHERE
    og.id = NEW.onboarding_general_id;

  INSERT INTO public.leads_central (full_name, email, phone, service_interest, source_table, lead_data)
  VALUES (
    lead_full_name,
    lead_email,
    lead_phone,
    lead_service_interest,
    TG_TABLE_NAME,
    jsonb_build_object('general_info', general_data, 'specific_info', to_jsonb(NEW))
  );
  
  RETURN NEW;
END;
$$;