import { Octokit } from '@octokit/rest';
import { z } from 'zod';

export default new Octokit({ auth: z.string().parse(process.env.GITHUB_TOKEN) });
