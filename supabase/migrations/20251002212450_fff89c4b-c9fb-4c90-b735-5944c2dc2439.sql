-- Add phone field to onboarding_general
ALTER TABLE public.onboarding_general 
ADD COLUMN phone text;

-- Make onboarding_general columns more descriptive (renaming for clarity)
COMMENT ON COLUMN public.onboarding_general.full_name IS 'Nome completo do lead';
COMMENT ON COLUMN public.onboarding_general.email IS 'Email de contato do lead';
COMMENT ON COLUMN public.onboarding_general.phone IS 'Telefone de contato do lead';
COMMENT ON COLUMN public.onboarding_general.company_name IS 'Nome da empresa do lead';
COMMENT ON COLUMN public.onboarding_general.job_title IS 'Cargo do lead na empresa';
COMMENT ON COLUMN public.onboarding_general.company_website IS 'Website da empresa';
COMMENT ON COLUMN public.onboarding_general.service_interest IS 'Tipo de serviço de interesse (automation, ai_infrastructure, chatbots, website, consultation)';
COMMENT ON COLUMN public.onboarding_general.challenge_description IS 'Descrição do desafio ou problema que o lead enfrenta';
COMMENT ON COLUMN public.onboarding_general.expected_result IS 'Resultado esperado pelo lead com o projeto';
COMMENT ON COLUMN public.onboarding_general.timeline IS 'Prazo desejado para implementação (urgent, flexible, planning)';
COMMENT ON COLUMN public.onboarding_general.budget_range IS 'Faixa de orçamento disponível';
COMMENT ON COLUMN public.onboarding_general.status IS 'Status do lead no funil';

-- Add comments to onboarding_automation for clarity
COMMENT ON COLUMN public.onboarding_automation.process_name IS 'Nome do processo a ser automatizado';
COMMENT ON COLUMN public.onboarding_automation.current_process_description IS 'Descrição detalhada do processo atual';
COMMENT ON COLUMN public.onboarding_automation.bottlenecks_description IS 'Descrição dos gargalos e problemas atuais';
COMMENT ON COLUMN public.onboarding_automation.systems_used IS 'Sistemas e ferramentas utilizados atualmente';
COMMENT ON COLUMN public.onboarding_automation.process_frequency IS 'Frequência de execução do processo';
COMMENT ON COLUMN public.onboarding_automation.input_data_description IS 'Descrição dos dados de entrada do processo';
COMMENT ON COLUMN public.onboarding_automation.expected_output IS 'Resultado esperado após automação';
COMMENT ON COLUMN public.onboarding_automation.onboarding_general_id IS 'ID do formulário geral - relacionamento com dados do lead';

-- Add comments to onboarding_chatbot for clarity
COMMENT ON COLUMN public.onboarding_chatbot.main_functions IS 'Principais funções desejadas para o chatbot';
COMMENT ON COLUMN public.onboarding_chatbot.platforms IS 'Plataformas onde o chatbot será utilizado';
COMMENT ON COLUMN public.onboarding_chatbot.personality_description IS 'Descrição da personalidade desejada para o chatbot';
COMMENT ON COLUMN public.onboarding_chatbot.frequent_questions IS 'Perguntas frequentes que o chatbot deve responder';
COMMENT ON COLUMN public.onboarding_chatbot.system_integrations IS 'Sistemas que precisam ser integrados com o chatbot';
COMMENT ON COLUMN public.onboarding_chatbot.human_transfer_criteria IS 'Critérios para transferência para atendimento humano';
COMMENT ON COLUMN public.onboarding_chatbot.onboarding_general_id IS 'ID do formulário geral - relacionamento com dados do lead';

-- Add comments to onboarding_website for clarity
COMMENT ON COLUMN public.onboarding_website.main_call_to_action IS 'Principal ação que visitantes devem realizar no site';
COMMENT ON COLUMN public.onboarding_website.desired_pages IS 'Páginas desejadas para o site';
COMMENT ON COLUMN public.onboarding_website.brand_identity_status IS 'Status da identidade visual da marca';
COMMENT ON COLUMN public.onboarding_website.admired_websites IS 'Sites admirados como referência';
COMMENT ON COLUMN public.onboarding_website.disliked_elements IS 'Elementos que não devem estar no site';
COMMENT ON COLUMN public.onboarding_website.brand_keywords IS 'Palavras-chave que representam a marca';
COMMENT ON COLUMN public.onboarding_website.content_readiness IS 'Status de prontidão do conteúdo (textos e imagens)';
COMMENT ON COLUMN public.onboarding_website.onboarding_general_id IS 'ID do formulário geral - relacionamento com dados do lead';

-- Add comments to onboarding_ai_infrastructure for clarity
COMMENT ON COLUMN public.onboarding_ai_infrastructure.ai_objectives IS 'Objetivos que a solução de IA deve alcançar';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.ai_solution_type IS 'Tipos de solução de IA desejados';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.data_sources IS 'Fontes de dados disponíveis';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.data_volume_description IS 'Descrição do volume de dados';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.system_integrations IS 'Sistemas que precisam ser integrados';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.infrastructure_requirements IS 'Requisitos de infraestrutura';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.computational_resources IS 'Recursos computacionais disponíveis ou necessários';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.compliance_requirements IS 'Requisitos de compliance e segurança';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.expected_accuracy IS 'Nível de precisão esperado';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.deployment_timeline IS 'Prazo para implementação';
COMMENT ON COLUMN public.onboarding_ai_infrastructure.onboarding_general_id IS 'ID do formulário geral - relacionamento com dados do lead';