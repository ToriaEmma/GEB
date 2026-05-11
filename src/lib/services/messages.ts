import { supabase } from '../supabase';

export interface ContactMessage {
  id?: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  created_at?: string;
}

export const messageService = {
  async getAll() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as ContactMessage[];
  },

  async send(message: Partial<ContactMessage>) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([message])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async markAsRead(id: string) {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status: 'read' })
      .match({ id });
    
    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .match({ id });
    
    if (error) throw error;
  }
};
