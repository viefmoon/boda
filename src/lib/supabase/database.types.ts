export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      invitations: {
        Row: {
          id: string
          invitation_code: string
          guest_name: string
          max_guests: number
          created_at: string
          updated_at: string
          is_used: boolean
        }
        Insert: {
          id?: string
          invitation_code: string
          guest_name: string
          max_guests: number
          created_at?: string
          updated_at?: string
          is_used?: boolean
        }
        Update: {
          id?: string
          invitation_code?: string
          guest_name?: string
          max_guests?: number
          created_at?: string
          updated_at?: string
          is_used?: boolean
        }
      }
      rsvps: {
        Row: {
          id: string
          invitation_id: string
          name: string
          attendance: 'yes' | 'no'
          guests_count: number
          dietary_restrictions?: string | null
          message?: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          name: string
          attendance: 'yes' | 'no'
          guests_count: number
          dietary_restrictions?: string | null
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          name?: string
          attendance?: 'yes' | 'no'
          guests_count?: number
          dietary_restrictions?: string | null
          message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}