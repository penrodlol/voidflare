import { formatDate } from '@/libs/formatter';
import supabase from '@/libs/supabase';
import * as Card from '@/ui/card';
import { Tab, Tabs } from '@/ui/tabs';
import { User } from 'lucide-react';

async function getData() {
  const { data: recentPosts } = await supabase.rpc('get_recent_posts');
  return { recentPosts };
}

export default async function Page() {
  const { recentPosts } = await getData();

  return (
    <div className="mx-auto mt-fluid-6 flex max-w-screen-md flex-col gap-fluid-4">
      <section className="flex flex-col gap-4 border-b pb-fluid-4">
        <h1 className="font-serif text-7xl uppercase tracking-widest text-fancy">voidflare</h1>
        <p className="max-w-[55ch] text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi corporis suscipit
          omnis quis deleniti unde sed.
        </p>
      </section>
      <section>
        <Tabs values={['recent posts', 'recent releases']}>
          <Tab value="recent posts">
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {recentPosts?.map((post) => (
                <li key={post.slug}>
                  <Card.Root href={`/posts/${post.slug}`}>
                    <Card.Header>
                      <p className="flex items-center gap-2">
                        <User size={14} aria-hidden /> {post.sitename}
                      </p>
                      <time dateTime={new Date(post.pub_date).toISOString()}>
                        {formatDate(post.pub_date)}
                      </time>
                    </Card.Header>
                    <Card.Body>{post.title}</Card.Body>
                  </Card.Root>
                </li>
              ))}
            </ul>
          </Tab>
          <Tab value="recent releases"></Tab>
        </Tabs>
      </section>
    </div>
  );
}
