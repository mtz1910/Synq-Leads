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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          conversion_rate: number | null
          created_at: string
          id: string
          leads_count: number | null
          name: string
          revenue: number | null
          sequence_type: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          conversion_rate?: number | null
          created_at?: string
          id?: string
          leads_count?: number | null
          name: string
          revenue?: number | null
          sequence_type?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          conversion_rate?: number | null
          created_at?: string
          id?: string
          leads_count?: number | null
          name?: string
          revenue?: number | null
          sequence_type?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      creatives: {
        Row: {
          briefing: Json | null
          content: string
          created_at: string
          id: string
          type: string
          user_id: string
        }
        Insert: {
          briefing?: Json | null
          content: string
          created_at?: string
          id?: string
          type: string
          user_id: string
        }
        Update: {
          briefing?: Json | null
          content?: string
          created_at?: string
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          id: string
          last_contact_at: string | null
          name: string
          notes: string | null
          phone: string | null
          recovered_at: string | null
          source: string | null
          status: string
          updated_at: string
          user_id: string
          value: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          last_contact_at?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          recovered_at?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          user_id: string
          value?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          last_contact_at?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          recovered_at?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          value?: number | null
        }
        Relationships: []
      }
      metrics_daily: {
        Row: {
          created_at: string
          date: string
          id: string
          leads_new: number | null
          leads_recovered: number | null
          messages_sent: number | null
          revenue_recovered: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          leads_new?: number | null
          leads_recovered?: number | null
          messages_sent?: number | null
          revenue_recovered?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          leads_new?: number | null
          leads_recovered?: number | null
          messages_sent?: number | null
          revenue_recovered?: number | null
          user_id?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string
          display_name: string
          features: Json | null
          id: string
          name: Database["public"]["Enums"]["subscription_plan"]
          predictions_per_day: number
          price: number
        }
        Insert: {
          created_at?: string
          display_name: string
          features?: Json | null
          id?: string
          name: Database["public"]["Enums"]["subscription_plan"]
          predictions_per_day?: number
          price?: number
        }
        Update: {
          created_at?: string
          display_name?: string
          features?: Json | null
          id?: string
          name?: Database["public"]["Enums"]["subscription_plan"]
          predictions_per_day?: number
          price?: number
        }
        Relationships: []
      }
      predictions: {
        Row: {
          actual_outcome: string | null
          away_team: string
          confidence: number
          created_at: string
          expected_value: number | null
          home_team: string
          id: string
          implied_probability: number | null
          is_correct: boolean | null
          kelly_stake: number | null
          league: string | null
          match_date: string
          match_id: string
          odds_value: number | null
          predicted_outcome: string
          prediction_type: string
          profit_loss: number | null
          user_id: string
        }
        Insert: {
          actual_outcome?: string | null
          away_team: string
          confidence: number
          created_at?: string
          expected_value?: number | null
          home_team: string
          id?: string
          implied_probability?: number | null
          is_correct?: boolean | null
          kelly_stake?: number | null
          league?: string | null
          match_date: string
          match_id: string
          odds_value?: number | null
          predicted_outcome: string
          prediction_type: string
          profit_loss?: number | null
          user_id: string
        }
        Update: {
          actual_outcome?: string | null
          away_team?: string
          confidence?: number
          created_at?: string
          expected_value?: number | null
          home_team?: string
          id?: string
          implied_probability?: number | null
          is_correct?: boolean | null
          kelly_stake?: number | null
          league?: string | null
          match_date?: string
          match_id?: string
          odds_value?: number | null
          predicted_outcome?: string
          prediction_type?: string
          profit_loss?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          telegram_chat_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          telegram_chat_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          telegram_chat_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      team_favorites: {
        Row: {
          created_at: string
          id: string
          league: string | null
          team_id: string
          team_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          league?: string | null
          team_id: string
          team_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          league?: string | null
          team_id?: string
          team_name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_connections: {
        Row: {
          created_at: string
          id: string
          label: string | null
          messages_sent: number | null
          phone_number: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          messages_sent?: number | null
          phone_number: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          messages_sent?: number | null
          phone_number?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
      subscription_plan: "free" | "pro" | "premium"
      subscription_status: "active" | "canceled" | "past_due" | "trialing"
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
      subscription_plan: ["free", "pro", "premium"],
      subscription_status: ["active", "canceled", "past_due", "trialing"],
    },
  },
} as const
