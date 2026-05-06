import { supabase } from '../supabase';

export interface Article {
  id?: string;
  slug: string;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  content_fr: string;
  content_en: string;
  category: string;
  image_url?: string;
  status: 'draft' | 'pending_validation' | 'approved' | 'rejected';
  author_id?: string;
  is_featured: boolean;
  likes?: number;
  published_at?: string;
  created_at?: string;
}

export const articleService = {
  async getAll() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Article[];
  },

  async getByStatus(status: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Article[];
  },

  async create(article: Omit<Article, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();
    
    if (error) throw error;
    return data as Article;
  },

  async update(id: string, updates: Partial<Article>) {
    const { data, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Article;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async incrementLikes(id: string, currentLikes: number) {
    const { data, error } = await supabase
      .from('articles')
      .update({ likes: (currentLikes || 0) + 1 })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
