'use client';

import { stringSchema } from '@/libs/schema';
import Button from '@/ui/button';
import * as Combobox from '@/ui/combobox';
import Input from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = { post?: string; site?: string; sites: Array<string> };

const postResolver = zodResolver(z.object({ post: stringSchema }));

export default function Filter({ post, site, sites }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const postForm = useForm({ resolver: postResolver, defaultValues: { post: post ?? '' } });
  const getParams = useCallback(() => new URLSearchParams(params.toString()), [params]);

  const onPostSubmit = postForm.handleSubmit(({ post: nextPost }) => {
    if (post === nextPost) return;

    const params = getParams();
    if (!nextPost) params.delete('post');
    else params.set('post', nextPost);
    router.push(`/posts/page/1?${params.toString()}`);
  });

  const onSiteSelect = (site: string) => {
    const params = getParams();
    params.set('site', site);
    router.push(`/posts/page/1?${params.toString()}`);
  };

  const onResetAll = () => {
    postForm.reset({ post: '' });

    const params = getParams();
    params.forEach((_, key) => params.delete(key));
    router.push('/posts/page/1');
  };

  return (
    <div className="flex flex-1 gap-4">
      <form onSubmit={onPostSubmit}>
        <Input placeholder="search posts" icon={<SearchIcon />} {...postForm.register('post')} />
      </form>
      <Combobox.Root value={site} onSelect={onSiteSelect}>
        <Combobox.Trigger>filter by site</Combobox.Trigger>
        <Combobox.Content items={sites} placeholder="search sites" />
      </Combobox.Root>
      {(postForm.formState.isDirty || post || site) && (
        <Button color="ghost" size="sm" onClick={onResetAll}>
          clear <X size={14} aria-hidden />
        </Button>
      )}
    </div>
  );
}
