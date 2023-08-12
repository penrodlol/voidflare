'use client';

import { stringSchema } from '@/libs/schema';
import Button from '@/ui/button';
import Combobox from '@/ui/combobox';
import Input from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon, X } from 'lucide-react';
import { useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { filterSites, resetAll, resetSites, searchPosts } from './action';

type Props = { post: string; sites: Array<string>; sitesSelected: Array<string> };

const postResolver = zodResolver(z.object({ post: stringSchema.min(1) }));

export default function Filter({ post, sites, sitesSelected }: Props) {
  const [pending, startTransition] = useTransition();
  const postForm = useForm({ resolver: postResolver, defaultValues: { post } });
  const defaultDirty = useMemo(() => post.length || sitesSelected.length, [post, sitesSelected]);

  return (
    <div className="flex flex-1 gap-4">
      <form
        onSubmit={postForm.handleSubmit((payload) => {
          if (post === payload.post) return;
          postForm.reset(payload);
          startTransition(() => searchPosts(payload.post));
        })}
      >
        <Input
          placeholder="search posts"
          icon={<SearchIcon />}
          disabled={pending}
          {...postForm.register('post')}
        />
      </form>
      <Combobox
        trigger="filter by sites"
        filter="search sites"
        items={sites}
        defaultSelected={sitesSelected}
        disabled={pending}
        onClear={() => startTransition(() => resetSites())}
        onApply={(sites) => startTransition(() => filterSites(sites))}
      />
      {(defaultDirty || postForm.formState.isDirty) && (
        <Button
          color="ghost"
          size="sm"
          disabled={pending}
          onClick={() => [
            postForm.reset({ post: '' }),
            defaultDirty && startTransition(() => resetAll()),
          ]}
        >
          clear <X size={14} aria-hidden />
        </Button>
      )}
    </div>
  );
}
