import Paginator from '@/app/paginator';
import { formatDate, formatNumber } from '@/libs/formatter';
import { pageSchema } from '@/libs/schema';
import supabase, { type Post } from '@/libs/supabase';
import * as Card from '@/ui/card';
import { History, Library } from 'lucide-react';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const revalidate = 28800;

async function getSites(page: z.infer<typeof pageSchema>) {
  const { data, error } = await supabase
    .from('site')
    .select('slug, name, post!inner(pub_date)')
    .not('post.pub_date', 'is', null)
    .order('name', { ascending: true })
    .order('pub_date', { ascending: false, foreignTable: 'post' })
    .range((page - 1) * 30, (page - 1) * 30 + 29);
  if (error) return undefined;

  return data.map((site) => {
    const posts = site.post as Array<Post>;
    return { ...site, posts, latest: posts[0] as Post };
  });
}

export default async function Page(props: { params: { page: string } }) {
  const params = z.object({ page: pageSchema }).safeParse(props.params);
  if (!params.success) redirect('/');

  const sites = await getSites(params.data.page);
  if (!sites) redirect('/');

  return (
    <div className="mt-fluid-4 flex flex-col gap-fluid-3">
      <section>
        <h1 className="mb-2 font-serif text-5xl uppercase tracking-widest text-fancy">all sites</h1>
        <p className="mb-fluid-3 text-base text-2">
          explore blog posts across <strong>17</strong> different sites
        </p>
      </section>
      <section className="flex flex-col gap-fluid-4">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sites.map((site) => (
            <li key={site.slug}>
              {/* @ts-ignore */}
              <Card.Internal href={`/posts/sites/${site.slug}/page/1`}>
                <Card.Header>
                  <p className="flex items-center gap-2">
                    <Library className="h-4 w-4 shrink-0" aria-hidden />
                    <span>{formatNumber(site.posts.length)} posts</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <History className="h-4 w-4 shrink-0" aria-hidden />
                    <time dateTime={new Date(site.latest.pub_date).toISOString()}>
                      {formatDate(site.latest.pub_date)}
                    </time>
                  </p>
                </Card.Header>
                <Card.Body className="text-sm">{site.name}</Card.Body>
              </Card.Internal>
            </li>
          ))}
        </ul>
        <Paginator
          prev={`/posts/sites/page/${params.data.page - 1}`}
          next={`/posts/sites/page/${params.data.page + 1}`}
          isFirst={params.data.page === 1}
          isLast={sites.length < 30}
        />
      </section>
    </div>
  );
}
