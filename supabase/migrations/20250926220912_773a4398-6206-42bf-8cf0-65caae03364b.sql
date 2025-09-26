-- Create new tables for the onboarding process

-- Main onboarding table for general information
CREATE TABLE public.onboarding_general (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Contact Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  job_title TEXT,
  company_website TEXT,
  
  -- Service Interest
  service_interest TEXT NOT NULL CHECK (service_interest IN (
    'automation', 
    'ai_agents', 
    'chatbots', 
    'website', 
    'ai_infrastructure', 
    'consultation'
  )),
  
  -- Project Overview
  challenge_description TEXT NOT NULL,
  expected_result TEXT,
  timeline TEXT CHECK (timeline IN ('urgent', 'flexible', 'planning')),
  budget_range TEXT CHECK (budget_range IN ('up_to_5k', '5k_to_15k', '15k_to_30k', 'above_30k', 'prefer_meeting')),
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'completed'))
);

-- Automation processes details table
CREATE TABLE public.onboarding_automation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  onboarding_general_id UUID REFERENCES public.onboarding_general(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Process Mapping
  process_name TEXT NOT NULL,
  current_process_description TEXT NOT NULL,
  systems_used TEXT[], -- Array for multiple systems
  process_frequency TEXT CHECK (process_frequency IN ('multiple_daily', 'daily', 'weekly', 'monthly', 'on_demand')),
  
  -- Data and Challenges
  input_data_description TEXT,
  expected_output TEXT,
  bottlenecks_description TEXT
);

-- Chatbots and AI Agents details table
CREATE TABLE public.onboarding_chatbot (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  onboarding_general_id UUID REFERENCES public.onboarding_general(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Objective and Personality
  main_functions TEXT[], -- Array for multiple functions
  platforms TEXT[], -- Array for multiple platforms
  personality_description TEXT,
  
  -- Functionalities and Integrations
  frequent_questions TEXT,
  system_integrations TEXT,
  human_transfer_criteria TEXT
);

-- Custom websites details table
CREATE TABLE public.onboarding_website (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  onboarding_general_id UUID REFERENCES public.onboarding_general(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Identity and Design
  brand_identity_status TEXT CHECK (brand_identity_status IN ('complete_manual', 'logo_only', 'need_help')),
  admired_websites TEXT,
  disliked_elements TEXT,
  brand_keywords TEXT,
  
  -- Structure and Content
  desired_pages TEXT[], -- Array for multiple pages
  content_readiness TEXT CHECK (content_readiness IN ('ready', 'partial', 'need_help')),
  main_call_to_action TEXT NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.onboarding_general ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_automation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_chatbot ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_website ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- General table policies
CREATE POLICY "Anyone can submit onboarding forms" 
ON public.onboarding_general 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can view onboarding submissions" 
ON public.onboarding_general 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Only admins can update onboarding submissions" 
ON public.onboarding_general 
FOR UPDATE 
USING (is_admin());

-- Automation table policies
CREATE POLICY "Anyone can submit automation details" 
ON public.onboarding_automation 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can view automation details" 
ON public.onboarding_automation 
FOR SELECT 
USING (is_admin());

-- Chatbot table policies
CREATE POLICY "Anyone can submit chatbot details" 
ON public.onboarding_chatbot 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can view chatbot details" 
ON public.onboarding_chatbot 
FOR SELECT 
USING (is_admin());

-- Website table policies
CREATE POLICY "Anyone can submit website details" 
ON public.onboarding_website 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can view website details" 
ON public.onboarding_website 
FOR SELECT 
USING (is_admin());

-- Add triggers for updated_at
CREATE TRIGGER update_onboarding_general_updated_at
BEFORE UPDATE ON public.onboarding_general
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_onboarding_automation_updated_at
BEFORE UPDATE ON public.onboarding_automation
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_onboarding_chatbot_updated_at
BEFORE UPDATE ON public.onboarding_chatbot
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_onboarding_website_updated_at
BEFORE UPDATE ON public.onboarding_website
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();