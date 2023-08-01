import Paginator from '@/app/paginator';
import Search from '@/app/search';
import { formatDate } from '@/libs/formatter';
import { pageSchema, searchSchema } from '@/libs/schema';
import supabase, { type Site } from '@/libs/supabase';
import * as Card from '@/ui/card';
import { User } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const revalidate = 28800;

async function getPosts(page: z.infer<typeof pageSchema>) {
  let query = supabase.from('post').select('slug, title, pub_date, site(slug, name)');

  const search = searchSchema.safeParse(cookies().get('search')?.value.trim());
  if (search.success) query = query.textSearch('title_topic_summary_fts', `'${search.data}'`);

  const { data, error } = await query
    .order('pub_date', { ascending: false })
    .range((page - 1) * 30, (page - 1) * 30 + 29);

  if (error) return undefined;
  return data.map((post) => ({ ...post, site: post.site as Site }));
}

export default async function Page(props: { params: { page: string } }) {
  const params = z.object({ page: pageSchema }).safeParse(props.params);
  if (!params.success) redirect('/');

  const posts = await getPosts(params.data.page);
  if (!posts) redirect('/');

  return (
    <div className="mt-fluid-4 flex flex-col gap-fluid-3">
      <section>
        <h1 className="mb-2 font-serif text-5xl uppercase tracking-widest text-fancy">all posts</h1>
        <p className="mb-fluid-3 text-base text-2">
          explore blog posts across <strong>17</strong> different sites
        </p>
        <Search
          placeholder="search post by title or summary"
          aria-label="search post by title or summary"
          defaultValue={cookies().get('search')?.value.trim()}
        />
      </section>
      <section className="flex flex-col gap-fluid-4">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              {/* @ts-ignore */}
              <Card.Internal href={`/posts/sites/${post.site.slug}/${post.slug}`}>
                <Card.Header>
                  <p className="flex items-center gap-2">
                    <User size={14} aria-hidden /> {post.site?.name}
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
        <Paginator
          prev={`/posts/page/${params.data.page - 1}`}
          next={`/posts/page/${params.data.page + 1}`}
          isFirst={params.data.page === 1}
          isLast={posts.length < 30}
        />
      </section>
    </div>
  );
}
