import Search from '@/app/search';
import PostCard from '@/components/post-card';
import { pageSchema, searchSchema } from '@/libs/schema';
import supabase, { type Site } from '@/libs/supabase';
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

export default async function PostsPage(props: { params: { page: string } }) {
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
      <section>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard {...post} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
