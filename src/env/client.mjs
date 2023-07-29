// @ts-check

import { z } from 'zod';

const variables = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
});

export default variables.parse(process.env);
