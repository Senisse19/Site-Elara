export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      onboarding_ai_infrastructure: {
        Row: {
          ai_objectives: string
          ai_solution_type: string[] | null
          compliance_requirements: string | null
          computational_resources: string | null
          created_at: string
          data_sources: string | null
          data_volume_description: string | null
          deployment_timeline: string | null
          expected_accuracy: string | null
          id: string
          infrastructure_requirements: string | null
          onboarding_general_id: string | null
          system_integrations: string | null
          updated_at: string
        }
        Insert: {
          ai_objectives: string
          ai_solution_type?: string[] | null
          compliance_requirements?: string | null
          computational_resources?: string | null
          created_at?: string
          data_sources?: string | null
          data_volume_description?: string | null
          deployment_timeline?: string | null
          expected_accuracy?: string | null
          id?: string
          infrastructure_requirements?: string | null
          onboarding_general_id?: string | null
          system_integrations?: string | null
          updated_at?: string
        }
        Update: {
          ai_objectives?: string
          ai_solution_type?: string[] | null
          compliance_requirements?: string | null
          computational_resources?: string | null
          created_at?: string
          data_sources?: string | null
          data_volume_description?: string | null
          deployment_timeline?: string | null
          expected_accuracy?: string | null
          id?: string
          infrastructure_requirements?: string | null
          onboarding_general_id?: string | null
          system_integrations?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      onboarding_automation: {
        Row: {
          bottlenecks_description: string | null
          created_at: string
          current_process_description: string
          expected_output: string | null
          id: string
          input_data_description: string | null
          onboarding_general_id: string | null
          process_frequency: string | null
          process_name: string
          systems_used: string[] | null
          updated_at: string
        }
        Insert: {
          bottlenecks_description?: string | null
          created_at?: string
          current_process_description: string
          expected_output?: string | null
          id?: string
          input_data_description?: string | null
          onboarding_general_id?: string | null
          process_frequency?: string | null
          process_name: string
          systems_used?: string[] | null
          updated_at?: string
        }
        Update: {
          bottlenecks_description?: string | null
          created_at?: string
          current_process_description?: string
          expected_output?: string | null
          id?: string
          input_data_description?: string | null
          onboarding_general_id?: string | null
          process_frequency?: string | null
          process_name?: string
          systems_used?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_automation_onboarding_general_id_fkey"
            columns: ["onboarding_general_id"]
            isOneToOne: false
            referencedRelation: "onboarding_general"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_chatbot: {
        Row: {
          created_at: string
          frequent_questions: string | null
          human_transfer_criteria: string | null
          id: string
          main_functions: string[] | null
          onboarding_general_id: string | null
          personality_description: string | null
          platforms: string[] | null
          system_integrations: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          frequent_questions?: string | null
          human_transfer_criteria?: string | null
          id?: string
          main_functions?: string[] | null
          onboarding_general_id?: string | null
          personality_description?: string | null
          platforms?: string[] | null
          system_integrations?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          frequent_questions?: string | null
          human_transfer_criteria?: string | null
          id?: string
          main_functions?: string[] | null
          onboarding_general_id?: string | null
          personality_description?: string | null
          platforms?: string[] | null
          system_integrations?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_chatbot_onboarding_general_id_fkey"
            columns: ["onboarding_general_id"]
            isOneToOne: false
            referencedRelation: "onboarding_general"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_general: {
        Row: {
          budget_range: string | null
          challenge_description: string
          company_name: string | null
          company_website: string | null
          created_at: string
          email: string
          expected_result: string | null
          full_name: string
          id: string
          job_title: string | null
          phone: string | null
          service_interest: string
          status: string | null
          timeline: string | null
          updated_at: string
        }
        Insert: {
          budget_range?: string | null
          challenge_description: string
          company_name?: string | null
          company_website?: string | null
          created_at?: string
          email: string
          expected_result?: string | null
          full_name: string
          id?: string
          job_title?: string | null
          phone?: string | null
          service_interest: string
          status?: string | null
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          budget_range?: string | null
          challenge_description?: string
          company_name?: string | null
          company_website?: string | null
          created_at?: string
          email?: string
          expected_result?: string | null
          full_name?: string
          id?: string
          job_title?: string | null
          phone?: string | null
          service_interest?: string
          status?: string | null
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      onboarding_website: {
        Row: {
          admired_websites: string | null
          brand_identity_status: string | null
          brand_keywords: string | null
          content_readiness: string | null
          created_at: string
          desired_pages: string[] | null
          disliked_elements: string | null
          id: string
          main_call_to_action: string
          onboarding_general_id: string | null
          updated_at: string
        }
        Insert: {
          admired_websites?: string | null
          brand_identity_status?: string | null
          brand_keywords?: string | null
          content_readiness?: string | null
          created_at?: string
          desired_pages?: string[] | null
          disliked_elements?: string | null
          id?: string
          main_call_to_action: string
          onboarding_general_id?: string | null
          updated_at?: string
        }
        Update: {
          admired_websites?: string | null
          brand_identity_status?: string | null
          brand_keywords?: string | null
          content_readiness?: string | null
          created_at?: string
          desired_pages?: string[] | null
          disliked_elements?: string | null
          id?: string
          main_call_to_action?: string
          onboarding_general_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_website_onboarding_general_id_fkey"
            columns: ["onboarding_general_id"]
            isOneToOne: false
            referencedRelation: "onboarding_general"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
