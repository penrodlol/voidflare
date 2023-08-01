'use client';

import { searchSchema } from '@/libs/schema';
import Button from '@/ui/button';
import Input, { type InputProps } from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { resetSearch, search } from './action';

type FormData = { search: z.infer<typeof searchSchema> };
const resolver = zodResolver(z.object({ search: searchSchema }));

export default function Search(props: InputProps) {
  const [isPending, startTransition] = useTransition();
  const { register, setValue, resetField, getValues, formState } = useForm<FormData>({ resolver });
  const { isDirty, isValid, defaultValues } = formState;

  function onAction() {
    setValue('search', getValues().search.trim());
    startTransition(() => search(getValues().search));
  }

  function onReset() {
    resetField('search');
    resetSearch();
  }

  return (
    <form
      className="flex items-center gap-2 rounded border bg-2/10 p-fluid-1 text-xs shadow"
      action={onAction}
    >
      <Input {...props} className="flex-1" icon={<SearchIcon />} {...register('search')} />
      <Button type="submit" disabled={!isDirty || !isValid || isPending}>
        search
      </Button>
      <Button
        type="reset"
        color="outline"
        onClick={onReset}
        disabled={(defaultValues?.search && !isDirty) || !isValid || isPending}
      >
        clear
      </Button>
    </form>
  );
}
