import { supabase } from '../supabase';

export interface Service {
  id?: string;
  title: string;
  description_fr: string;
  description_en: string;
  icon: string;
  category: string;
  order_index?: number;
  created_at?: string;
}

export const serviceService = {
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data as Service[];
  },

  async create(service: Service) {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async update(id: string, updates: Partial<Service>) {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .match({ id })
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .match({ id });
    
    if (error) throw error;
  }
};
