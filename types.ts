
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  username: string;
  bio: string | null;
  created_at: string;
}

export interface Message {
  id: number;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export interface PresenceState {
  user_id: string;
  username: string;
}