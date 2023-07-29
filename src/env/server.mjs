// @ts-check

import { z } from 'zod';

const variables = z.object({
  GITHUB_TOKEN: z.string(),
});

export default variables.parse(process.env);
