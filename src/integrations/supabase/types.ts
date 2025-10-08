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
      ai_agent_leads: {
        Row: {
          agent_type: string
          created_at: string
          current_solution: string | null
          custom_requirements: string | null
          id: string
          integration_platforms: string | null
          lead_id: string
          monthly_volume: string | null
        }
        Insert: {
          agent_type: string
          created_at?: string
          current_solution?: string | null
          custom_requirements?: string | null
          id?: string
          integration_platforms?: string | null
          lead_id: string
          monthly_volume?: string | null
        }
        Update: {
          agent_type?: string
          created_at?: string
          current_solution?: string | null
          custom_requirements?: string | null
          id?: string
          integration_platforms?: string | null
          lead_id?: string
          monthly_volume?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_leads: {
        Row: {
          created_at: string
          current_process: string
          expected_results: string | null
          has_data_integration: boolean | null
          id: string
          lead_id: string
          pain_points: string | null
          process_frequency: string | null
          systems_used: string | null
        }
        Insert: {
          created_at?: string
          current_process: string
          expected_results?: string | null
          has_data_integration?: boolean | null
          id?: string
          lead_id: string
          pain_points?: string | null
          process_frequency?: string | null
          systems_used?: string | null
        }
        Update: {
          created_at?: string
          current_process?: string
          expected_results?: string | null
          has_data_integration?: boolean | null
          id?: string
          lead_id?: string
          pain_points?: string | null
          process_frequency?: string | null
          systems_used?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      consulting_leads: {
        Row: {
          company_size: string | null
          consulting_type: string
          created_at: string
          current_challenges: string | null
          goals: string | null
          id: string
          lead_id: string
          timeline: string | null
        }
        Insert: {
          company_size?: string | null
          consulting_type: string
          created_at?: string
          current_challenges?: string | null
          goals?: string | null
          id?: string
          lead_id: string
          timeline?: string | null
        }
        Update: {
          company_size?: string | null
          consulting_type?: string
          created_at?: string
          current_challenges?: string | null
          goals?: string | null
          id?: string
          lead_id?: string
          timeline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consulting_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          additional_info: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          package_name: string
          package_price: number | null
          package_type: string
          phone: string
          updated_at: string
        }
        Insert: {
          additional_info?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          package_name: string
          package_price?: number | null
          package_type: string
          phone: string
          updated_at?: string
        }
        Update: {
          additional_info?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          package_name?: string
          package_price?: number | null
          package_type?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      software_leads: {
        Row: {
          created_at: string
          design_reference: string | null
          has_design: boolean | null
          id: string
          integrations_needed: string | null
          lead_id: string
          project_type: string
          required_features: string | null
          timeline: string | null
        }
        Insert: {
          created_at?: string
          design_reference?: string | null
          has_design?: boolean | null
          id?: string
          integrations_needed?: string | null
          lead_id: string
          project_type: string
          required_features?: string | null
          timeline?: string | null
        }
        Update: {
          created_at?: string
          design_reference?: string | null
          has_design?: boolean | null
          id?: string
          integrations_needed?: string | null
          lead_id?: string
          project_type?: string
          required_features?: string | null
          timeline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "software_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
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
