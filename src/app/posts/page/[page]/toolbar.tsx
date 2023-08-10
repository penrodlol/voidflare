'use client';

import { stringSchema, type StringSchema } from '@/libs/schema';
import Button from '@/ui/button';
import Combobox, { type ComboboxProps } from '@/ui/combobox';
import Input from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { filterSites, reset, resetSites, searchPosts } from './action';
import View from './view';

type Props = { post: StringSchema | undefined; sites: Array<StringSchema> };

const postResolver = zodResolver(z.object({ post: stringSchema }));
const sitesResolver = zodResolver(z.object({ sites: z.array(stringSchema) }));

export default function Toolbar({ post, sites }: Props) {
  const postForm = useForm<{ post: StringSchema }>({ resolver: postResolver });
  const sitesForm = useForm<{ sites: Array<StringSchema> }>({ resolver: sitesResolver });

  const handleSearchPosts = async (data: FormData) => {
    const payload = stringSchema.safeParse(data.get('post'));
    if (!payload.success) return;
    await searchPosts(payload.data);
  };

  const handleFilterSites: ComboboxProps['onApply'] = async (sites) => {
    const payload = z.array(stringSchema).safeParse(sites);
    if (!payload.success) return;
    sitesForm.setValue('sites', payload.data);
    await filterSites(payload.data);
  };

  const handleSitesReset = async () => {
    sitesForm.reset();
    await resetSites();
  };

  const handleReset = async () => {
    postForm.reset();
    sitesForm.reset();
    await reset();
  };

  return (
    <div className="flex justify-between text-xs">
      <div className="flex flex-1 gap-4">
        <form action={handleSearchPosts}>
          <Input
            placeholder="search posts"
            icon={<Search />}
            defaultValue={post}
            {...postForm.register('post')}
          />
        </form>
        <Combobox
          trigger="filter by sites"
          filter="search sites"
          items={sites}
          onApply={handleFilterSites}
          onClear={handleSitesReset}
        />
        {postForm.formState.isDirty && (
          <Button type="reset" color="ghost" size="sm" onClick={handleReset}>
            clear <X size={14} aria-hidden />
          </Button>
        )}
      </div>
      <View />
    </div>
  );
}
