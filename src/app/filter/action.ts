'use server';

import { stringSchema } from '@/libs/schema';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { z } from 'zod';

export async function filter(unsafeFilter: z.infer<typeof stringSchema>) {
  const safeFilter = stringSchema.safeParse(unsafeFilter);
  if (!safeFilter.success) return;

  const inOneHour = new Date(Date.now() + 60 * 60 * 1000);
  cookies().set({ name: 'filter', value: safeFilter.data, expires: inOneHour });
  revalidatePath('/posts');
}

export async function resetFilter() {
  cookies().delete('filter');
  revalidatePath('/posts');
}
