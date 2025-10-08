import { z } from "zod";

// Common field validations
const phoneRegex = /^[\d\s\-\+\(\)]+$/;
const emailSchema = z.string()
  .trim()
  .min(1, "Email é obrigatório")
  .email("Email inválido")
  .max(255, "Email muito longo");

const fullNameSchema = z.string()
  .trim()
  .min(2, "Nome deve ter pelo menos 2 caracteres")
  .max(100, "Nome muito longo")
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras");

const phoneSchema = z.string()
  .trim()
  .min(10, "Telefone inválido")
  .max(20, "Telefone muito longo")
  .regex(phoneRegex, "Telefone inválido");

// AI Agent Form Schema
export const aiAgentFormSchema = z.object({
  agentType: z.string().min(1, "Selecione um tipo de agente"),
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  currentSolution: z.string().trim().max(1000, "Texto muito longo").optional(),
  monthlyVolume: z.string().trim().max(500, "Texto muito longo").optional(),
  integrationPlatforms: z.string().trim().max(1000, "Texto muito longo").optional(),
  customRequirements: z.string().trim().max(2000, "Texto muito longo").optional(),
  additionalInfo: z.string().trim().max(2000, "Texto muito longo").optional(),
});

export type AIAgentFormData = z.infer<typeof aiAgentFormSchema>;

// Automation Form Schema
export const automationFormSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  currentProcess: z.string()
    .trim()
    .min(10, "Descreva o processo com mais detalhes")
    .max(2000, "Descrição muito longa"),
  systemsUsed: z.string().trim().max(1000, "Texto muito longo").optional(),
  processFrequency: z.string().trim().max(500, "Texto muito longo").optional(),
  painPoints: z.string().trim().max(2000, "Texto muito longo").optional(),
  expectedResults: z.string().trim().max(2000, "Texto muito longo").optional(),
  hasDataIntegration: z.boolean(),
  additionalInfo: z.string().trim().max(2000, "Texto muito longo").optional(),
});

export type AutomationFormData = z.infer<typeof automationFormSchema>;

// Consulting Form Schema
export const consultingFormSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  consultingType: z.string().min(1, "Selecione um tipo de consultoria"),
  companySize: z.string().min(1, "Selecione o tamanho da empresa"),
  currentChallenges: z.string()
    .trim()
    .min(10, "Descreva seus desafios com mais detalhes")
    .max(2000, "Descrição muito longa"),
  goals: z.string()
    .trim()
    .min(10, "Descreva seus objetivos com mais detalhes")
    .max(2000, "Descrição muito longa"),
  timeline: z.string().trim().max(500, "Texto muito longo").optional(),
  additionalInfo: z.string().trim().max(2000, "Texto muito longo").optional(),
});

export type ConsultingFormData = z.infer<typeof consultingFormSchema>;

// Software Form Schema
export const softwareFormSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  projectType: z.string().min(1, "Selecione um tipo de projeto"),
  hasDesign: z.boolean(),
  designReference: z.string().trim().max(1000, "Texto muito longo").optional(),
  requiredFeatures: z.string().trim().max(2000, "Texto muito longo").optional(),
  integrationsNeeded: z.string().trim().max(1000, "Texto muito longo").optional(),
  timeline: z.string().trim().max(500, "Texto muito longo").optional(),
  additionalInfo: z.string().trim().max(2000, "Texto muito longo").optional(),
});

export type SoftwareFormData = z.infer<typeof softwareFormSchema>;
