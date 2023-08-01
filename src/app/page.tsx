import { formatDate } from '@/libs/formatter';
import supabase from '@/libs/supabase';
import { NextAnchor } from '@/ui/anchor';
import * as Card from '@/ui/card';
import { Tab, Tabs } from '@/ui/tabs';
import { ArrowRight, User } from 'lucide-react';
import releases from '../stub';

async function getData() {
  const { data: recentPosts } = await supabase.rpc('get_recent_posts');
  return { recentPosts, releases };
}

export default async function HomePage() {
  const { recentPosts, releases } = await getData();

  return (
    <div className="mt-fluid-6 flex flex-col gap-fluid-6">
      <section>
        <h1 className="mb-4 font-serif text-7xl uppercase tracking-widest text-fancy">voidflare</h1>
        <p className="max-w-[55ch] text-base text-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi corporis suscipit
          omnis quis deleniti unde sed.
        </p>
      </section>
      <section>
        <Tabs values={['recent posts', 'recent releases']}>
          <Tab value="recent posts" className="flex flex-col gap-8">
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {recentPosts?.map((post) => (
                <li key={post.slug}>
                  {/* @ts-ignore */}
                  <Card.Internal href={`/posts/sites/${post.siteslug}/${post.slug}`}>
                    <Card.Header>
                      <p className="flex items-center gap-2">
                        <User size={14} aria-hidden /> {post.sitename}
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
            {/* @ts-ignore */}
            <NextAnchor href="/posts/page/1" className="self-end">
              view all posts <ArrowRight size={16} aria-hidden />
            </NextAnchor>
          </Tab>
          <Tab value="recent releases">
            <ul className="flex flex-col gap-8">
              {releases?.map((release) => (
                <li key={release.url}>
                  <Card.External href={release.url}>
                    <Card.Header>
                      <p className="flex items-center gap-2">
                        <User size={14} aria-hidden /> {release.project}
                      </p>
                      <time dateTime={new Date(release.published).toISOString()}>
                        {formatDate(release.published)}
                      </time>
                    </Card.Header>
                    <Card.Body>
                      <div className="flex flex-col gap-3">
                        <span className="text-lg">{release.name}</span>
                        <ol className="ml-2 list-inside list-disc text-2">
                          {release.content.map((change: any) => (
                            <li key={change}>{change}</li>
                          ))}
                        </ol>
                      </div>
                    </Card.Body>
                  </Card.External>
                </li>
              ))}
            </ul>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
