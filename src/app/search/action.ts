'use server';

import { searchSchema } from '@/libs/schema';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { z } from 'zod';

export async function search(unsafeSearch: z.infer<typeof searchSchema>) {
  const safeSearch = searchSchema.safeParse(unsafeSearch);
  if (!safeSearch.success) return;

  const inOneHour = new Date(Date.now() + 60 * 60 * 1000);
  cookies().set({ name: 'search', value: safeSearch.data, expires: inOneHour });
  revalidatePath('/posts/page');
}

export async function resetSearch() {
  cookies().delete('search');
  revalidatePath('/posts/page');
}
