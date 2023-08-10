import { formatDate } from '@/libs/formatter';
import { pageSchema, stringSchema } from '@/libs/schema';
import supabase, { type Site } from '@/libs/supabase';
import * as Card from '@/ui/card';
import { User } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import Filter from './filter';
import View from './view';

export const revalidate = 28800;

async function getData(page: z.infer<typeof pageSchema>) {
  let query = supabase.from('post').select('slug, title, pub_date, site(slug, name)');

  const search = stringSchema.safeParse(cookies().get('search')?.value.trim());
  if (search.success) query = query.textSearch('title_topic_summary_fts', `'${search.data}'`);

  const postPayload = await query
    .order('pub_date', { ascending: false })
    .range((page - 1) * 30, (page - 1) * 30 + 29);

  if (postPayload.error) return undefined;
  const posts = postPayload.data.map((post) => ({ ...post, site: post.site as Site }));

  const sitesPayload = await supabase.from('site').select('name');
  if (sitesPayload.error) return undefined;
  const sites = sitesPayload.data.map((site) => site.name);

  return { posts, sites };
}

export default async function Page(props: { params: { page: string } }) {
  const params = z.object({ page: pageSchema }).safeParse(props.params);
  if (!params.success) redirect('/');

  const data = await getData(params.data.page);
  if (!data) redirect('/');

  return (
    <div className="mx-auto mt-fluid-4 flex max-w-screen-md flex-col gap-fluid-4">
      <section className="flex flex-col gap-2 border-b pb-fluid-4">
        <h1 className="font-serif text-5xl uppercase tracking-widest text-fancy">all posts</h1>
        <p className="max-w-[55ch]">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </section>
      <section className="flex items-center justify-between gap-24 [&_form]:flex-1">
        <Filter sites={data.sites} />
        <View />
      </section>
      <section>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.posts?.map((post) => (
            <li key={post.slug}>
              {/* @ts-ignore */}
              <Card.Internal href={`/posts/${post.slug}`}>
                <Card.Header>
                  <p className="flex items-center gap-2">
                    <User size={14} aria-hidden /> {post.site.name}
                  </p>
                  <time dateTime={new Date(post.pub_date).toISOString()}>
                    {formatDate(post.pub_date)}
                  </time>
                </Card.Header>
                <Card.Body>{post.title}</Card.Body>
              </Card.Internal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
