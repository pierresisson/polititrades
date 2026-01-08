// Auto-generated types from Supabase
// Run: bun run db:types to regenerate

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          is_premium: boolean;
          premium_expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          is_premium?: boolean;
          premium_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          is_premium?: boolean;
          premium_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      politicians: {
        Row: {
          id: string;
          name: string;
          party: string | null;
          state: string | null;
          chamber: string | null;
          position: string | null;
          photo_url: string | null;
          country: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          party?: string | null;
          state?: string | null;
          chamber?: string | null;
          position?: string | null;
          photo_url?: string | null;
          country?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          party?: string | null;
          state?: string | null;
          chamber?: string | null;
          position?: string | null;
          photo_url?: string | null;
          country?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      insider_trades: {
        Row: {
          id: string;
          politician_id: string;
          ticker: string;
          company_name: string | null;
          transaction_type: "buy" | "sell";
          transaction_date: string;
          filing_date: string;
          amount_min: number | null;
          amount_max: number | null;
          sector: string | null;
          source_url: string | null;
          raw_data: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          politician_id: string;
          ticker: string;
          company_name?: string | null;
          transaction_type: "buy" | "sell";
          transaction_date: string;
          filing_date: string;
          amount_min?: number | null;
          amount_max?: number | null;
          sector?: string | null;
          source_url?: string | null;
          raw_data?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          politician_id?: string;
          ticker?: string;
          company_name?: string | null;
          transaction_type?: "buy" | "sell";
          transaction_date?: string;
          filing_date?: string;
          amount_min?: number | null;
          amount_max?: number | null;
          sector?: string | null;
          source_url?: string | null;
          raw_data?: Json | null;
          created_at?: string;
        };
      };
      user_alerts: {
        Row: {
          id: string;
          user_id: string;
          politician_id: string | null;
          sector: string | null;
          min_amount: number | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          politician_id?: string | null;
          sector?: string | null;
          min_amount?: number | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          politician_id?: string | null;
          sector?: string | null;
          min_amount?: number | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      push_tokens: {
        Row: {
          id: string;
          user_id: string;
          token: string;
          platform: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          token: string;
          platform: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          token?: string;
          platform?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
