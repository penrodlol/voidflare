'use client';

import { stringSchema } from '@/libs/schema';
import Button from '@/ui/button';
import * as Combobox from '@/ui/combobox';
import Input from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon, X } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { filterSites, resetAll, resetSites, searchPosts } from './action';

type Props = { post: string; sites: Array<string>; sitesSelected: Array<string> };

const postResolver = zodResolver(z.object({ post: stringSchema }));

export default function Filter({ post, sites, sitesSelected }: Props) {
  const [pending, startTransition] = useTransition();
  const postForm = useForm({ resolver: postResolver, defaultValues: { post } });

  const onPostSubmit = postForm.handleSubmit(({ post: nextPost }) => {
    if (!nextPost || post === nextPost) return;
    postForm.reset({ post: nextPost });
    startTransition(() => searchPosts(nextPost));
  });

  const onResetAll = () => {
    postForm.reset({ post: '' });
    startTransition(() => resetAll());
  };

  return (
    <div className="flex flex-1 gap-4">
      <form onSubmit={onPostSubmit}>
        <Input
          placeholder="search posts"
          icon={<SearchIcon />}
          disabled={pending}
          {...postForm.register('post')}
        />
      </form>
      <Combobox.Root
        defaultSelected={sitesSelected}
        onBlur={(next) => startTransition(() => (next ? filterSites(next) : resetSites()))}
        onClear={() => startTransition(() => resetSites())}
      >
        <Combobox.Trigger disabled={pending}>filter by site</Combobox.Trigger>
        <Combobox.Content items={sites} placeholder="search sites" />
      </Combobox.Root>
      <Button color="ghost" size="sm" disabled={pending} onClick={onResetAll}>
        clear <X size={14} aria-hidden />
      </Button>
    </div>
  );
}
