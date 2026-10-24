import { createClient } from './supabase-browser';

export type Vocabulary = {
  id: string;
  word: string;
  reading: string;
  meaning_bn: string;
  meaning_en: string;
  level: string;
  lesson_number: number;
  part_of_speech: string;
  example_japanese: string;
  example_reading: string;
  example_meaning_bn: string;
  published: boolean;
  sort_order: number;
};

export async function getVocabulary(): Promise<Vocabulary[]> {
  const supabase = createClient();

  if (!supabase) return [];

  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .eq('published', true)
    .order('level')
    .order('sort_order');

  if (error) {
    console.error('Vocabulary fetch error:', error.message);
    return [];
  }

  return data as Vocabulary[];
}