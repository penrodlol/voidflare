'use client';

import type { RecentPosts } from '@/libs/supabase';
import { formatDate } from '@/libs/utils';
import { User } from 'lucide-react';
import Link from 'next/link';

export default function PostCard(post: RecentPosts[number]) {
  return (
    <Link
      href="/"
      className="block h-full rounded border p-3 bg-gradient hover:text-brand hover:bg-gradient-hover"
    >
      <div className="text-12 flex items-center justify-between text-xs text-2">
        <div className="flex items-center gap-2">
          <User size={14} aria-hidden /> {post.sitename}
        </div>
        <time dateTime={new Date(post.pub_date).toISOString()}>{formatDate(post.pub_date)}</time>
      </div>
      <div className="px-1 py-3">{post.title}</div>
    </Link>
  );
}
