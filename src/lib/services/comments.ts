import { supabase } from '../supabase';

export interface Comment {
  id?: string;
  article_id: string;
  parent_id?: string;
  name: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export const commentService = {
  async getByArticle(articleId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', articleId)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data as Comment[];
  },

  async getAllPending() {
    const { data, error } = await supabase
      .from('comments')
      .select('*, articles(title_fr)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(comment: Omit<Comment, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('comments')
      .insert([comment])
      .select()
      .single();
    
    if (error) throw error;
    return data as Comment;
  },

  async updateStatus(id: string, status: 'approved' | 'rejected') {
    const { data, error } = await supabase
      .from('comments')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
