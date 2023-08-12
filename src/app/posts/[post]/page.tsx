import { slugSchema, type SlugSchema } from '@/libs/schema';
import supabase from '@/libs/supabase';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const revalidate = 28800;

async function getPost(slug: SlugSchema) {
  const { data, error } = await supabase
    .from('post')
    .select('*, site(*)')
    .eq('slug', slug)
    .single();
  if (error) return undefined;
  return data;
}

export default async function Page(props: { params: { post: SlugSchema } }) {
  const params = z.object({ post: slugSchema }).safeParse(props.params);
  if (!params.success) redirect('/posts/page/1');

  const post = await getPost(params.data.post);
  if (!post) redirect('/posts/page/1');

  return <div></div>;
}
