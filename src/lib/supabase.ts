import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url?: string;
  category: string;
  published_date: string;
  read_time: string;
  is_featured: boolean;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_date', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_date', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_featured', true)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}
