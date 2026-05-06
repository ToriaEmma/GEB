import { supabase } from '../supabase';

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

export const projectService = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Project[];
  },

  async create(project: Omit<Project, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async update(id: string, updates: Partial<Project>) {
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
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
