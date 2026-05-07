import { supabase, isMock } from '../supabase';
import { projects as mockProjects } from '@/app/realisations/data';

export interface Project {
  id?: string;
  slug: string;
  title: string;
  description_fr: string;
  description_en: string;
  client: string;
  category: string;
  image_url?: string;
  link?: string;
  date_string: string;
  is_featured: boolean;
  status: 'draft' | 'pending_validation' | 'approved' | 'rejected';
  updated_at?: string;
  created_at?: string;
}

const mapMockToDb = (mock: any): Project => ({
  id: mock.id,
  slug: mock.id,
  title: mock.title,
  description_fr: mock.description,
  description_en: mock.descriptionEn,
  client: mock.client,
  category: mock.category,
  image_url: mock.image,
  link: mock.link,
  date_string: mock.date,
  is_featured: !!mock.featured,
  status: 'approved',
  created_at: new Date().toISOString()
});

export const projectService = {
  async getAll() {
    if (isMock) {
      return mockProjects.map(mapMockToDb);
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Project[];
  },

  async create(project: Omit<Project, 'id' | 'created_at'>) {
    if (isMock) return { ...project, id: 'mock-id', created_at: new Date().toISOString() } as Project;

    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async update(id: string, updates: Partial<Project>) {
    if (isMock) return { id, ...updates } as Project;

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async delete(id: string) {
    if (isMock) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
