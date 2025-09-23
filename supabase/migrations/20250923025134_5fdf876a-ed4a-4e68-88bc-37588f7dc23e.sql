-- Create contacts table for form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact forms (public form)
CREATE POLICY "Anyone can submit contact forms" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin to view all contacts (you can adjust this later)
CREATE POLICY "Admin can view all contacts" 
ON public.contacts 
FOR SELECT 
USING (true);