import PostCard from '@/components/post-card';
import ReleaseCard from '@/components/release-card';
import { NextAnchor } from '@/components/ui/anchor';
import { Tab, Tabs } from '@/components/ui/tabs';
import supabase from '@/libs/supabase';
import { ArrowRight } from 'lucide-react';
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
                  <PostCard {...post} />
                </li>
              ))}
            </ul>
            <NextAnchor href="/" className="self-end">
              view all posts <ArrowRight size={16} aria-hidden />
            </NextAnchor>
          </Tab>
          <Tab value="recent releases">
            <ul className="flex flex-col gap-8">
              {releases?.map((release) => (
                <li key={release.url}>
                  <ReleaseCard {...release} />
                </li>
              ))}
            </ul>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
