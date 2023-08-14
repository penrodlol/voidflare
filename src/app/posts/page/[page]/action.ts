'use server';

import supabase from '@/libs/supabase';

export async function getData(page: number, post?: string, site?: string) {
  const posts = await getPosts(page, post, site);
  const sites = await getSites();
  return !posts || !sites ? undefined : { posts, sites };
}

async function getPosts(page: number, post?: string, site?: string) {
  let query = supabase.from('post').select('slug, title, pub_date, site!inner(id, slug, name)');
  if (site) query = query.like('site.name', site);
  if (post) query = query.textSearch('title_topic_summary_fts', `'${post}'`);

  const { data, error } = await query
    .order('pub_date', { ascending: false })
    .range((page - 1) * 30, (page - 1) * 30 + 29);
  return error ? undefined : data;
}

async function getSites() {
  const { data, error } = await supabase.from('site').select('name').order('name');
  return error ? undefined : data.map((site) => site.name);
}
