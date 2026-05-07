import { supabase, isMock } from '../supabase';
import { articles as mockArticles } from '@/app/actualites/data';

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
  updated_at?: string;
  created_at?: string;
}

const mapMockToDb = (mock: any): Article => ({
  id: mock.slug,
  slug: mock.slug,
  title_fr: mock.title,
  title_en: mock.titleEn,
  excerpt_fr: mock.excerpt,
  excerpt_en: mock.excerptEn,
  content_fr: mock.content,
  content_en: mock.contentEn,
  category: mock.category,
  image_url: mock.image,
  status: 'approved',
  is_featured: !!mock.featured,
  likes: mock.likes,
  created_at: mock.date
});

export const articleService = {
  async getAll() {
    if (isMock) {
      return mockArticles.map(mapMockToDb);
    }

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Article[];
  },

  async getByStatus(status: string) {
    if (isMock) {
      const dbArticles = mockArticles.map(mapMockToDb);
      if (status === 'approved') return dbArticles;
      return [];
    }

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Article[];
  },

  async create(article: Omit<Article, 'id' | 'created_at'>) {
    if (isMock) return { ...article, id: 'mock-id', created_at: new Date().toISOString() } as Article;

    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();
    
    if (error) throw error;
    return data as Article;
  },

  async update(id: string, updates: Partial<Article>) {
    if (isMock) return { id, ...updates } as Article;

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
    if (isMock) return;

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async incrementLikes(id: string, currentLikes: number) {
    if (isMock) return { id, likes: (currentLikes || 0) + 1 };

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
