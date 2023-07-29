import env from '@/env/server.mjs';
import { Octokit } from '@octokit/rest';

// eslint-disable-next-line import/no-anonymous-default-export
export default new Octokit({ auth: env });
