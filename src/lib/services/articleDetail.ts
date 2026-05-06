import { supabase } from '../supabase';
import { Article } from './articles';

export const articleDetailService = {
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data as Article;
  }
};
