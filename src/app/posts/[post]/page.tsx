import { formatDate } from '@/libs/formatter';
import { slugSchema, type SlugSchema } from '@/libs/schema';
import supabase from '@/libs/supabase';
import { Anchor } from '@/ui/anchor';
import { Calendar, User } from 'lucide-react';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const revalidate = 28800;

async function getPost(slug: SlugSchema) {
  const { data, error } = await supabase
    .from('post')
    .select('topic, title, pub_date, summary, link, site(name)')
    .eq('slug', slug)
    .single();
  return error ? undefined : data;
}

export default async function Page(props: { params: { post: SlugSchema } }) {
  const params = z.object({ post: slugSchema }).safeParse(props.params);
  if (!params.success) redirect('/posts/page/1');

  const post = await getPost(params.data.post);
  if (!post) redirect('/posts/page/1');

  return (
    <div className="mx-auto mt-fluid-4 flex max-w-screen-md flex-col gap-fluid-3">
      <section className="flex flex-col gap-4 border-b pb-fluid-3">
        <div className="max-w-max rounded-lg bg-2 px-2 py-0.5 text-[12px]">{post.topic}</div>
        <h1 className="font-serif text-2xl uppercase tracking-widest text-fancy">{post.title}</h1>
        <div className="flex flex-wrap gap-12 text-2">
          <div className="flex items-center gap-2">
            <User size={16} aria-hidden />
            {post.site?.name}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} aria-hidden />
            <time dateTime={new Date(post.pub_date).toISOString()}>
              {formatDate(post.pub_date)}
            </time>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-8">
        <p className="leading-8 text-2">{post.summary}</p>
        <div className="flex justify-end">
          <Anchor href={post.link}>read full post</Anchor>
        </div>
      </section>
    </div>
  );
}
