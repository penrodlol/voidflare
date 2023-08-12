'use server';

import { stringSchema, type PageSchema, type StringSchema } from '@/libs/schema';
import supabase, { type Site } from '@/libs/supabase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function getPosts(page: PageSchema) {
  // const post = stringSchema.safeParse(cookies().get('post')?.value);
  // const sites = z.array(stringSchema).safeParse(cookies().get('sites')?.value);

  let query = supabase.from('post').select('slug, title, pub_date, site(slug, name)');

  // if (post.success) query = query.textSearch('title_topic_summary_fts', `'${post.data}'`);

  const { data, error } = await query
    .order('pub_date', { ascending: false })
    .range((page - 1) * 30, (page - 1) * 30 + 29);

  if (error) return undefined;
  return data.map((post) => ({ ...post, site: post.site as Site }));
}

export async function searchPosts(unsafePost: StringSchema) {
  const safePost = stringSchema.safeParse(unsafePost);
  if (!safePost.success) return;

  cookies().set({ name: 'post', value: safePost.data });
  revalidatePath('/posts/page');
}

export async function filterSites(unsafeSites: Array<StringSchema>) {
  const safeSites = z.array(stringSchema).safeParse(unsafeSites);
  if (!safeSites.success) return;

  cookies().set({ name: 'sites', value: JSON.stringify(safeSites.data) });
  revalidatePath('/posts/page');
}

export async function resetAll() {
  cookies().delete('post');
  cookies().delete('sites');
  revalidatePath('/posts/page');
}

export async function resetSites() {
  cookies().delete('sites');
  revalidatePath('/posts/page');
}
