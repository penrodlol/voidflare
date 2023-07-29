import { z } from 'zod';
import octokit from '../libs/octokit.mts';
import openai from '../libs/openai.mts';
import delay from './delay.mts';
import encode from './encode.mts';

export default async function () {
  // const twoDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
  const releases = await Promise.all(
    stub.map(async (project) => {
      const { data } = await octokit.repos.listReleases({ ...project, per_page: 1 });
      return data;
    }),
  );

  return Promise.all(
    releases.flat().map(async (release, index) => {
      await delay(index);

      const body = encode(z.string().parse(release.body));
      const prompt = `List the changes from the following release notes (dont include links or commit hashes):\n\n${body}`;
      const payload = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        functions: [
          {
            name: 'get_list_of_changes',
            description: 'Get a list of changes from release notes',
            parameters: {
              type: 'object',
              properties: { changes: { type: 'array', items: { type: 'string' } } },
              required: ['changes'],
            },
          },
        ],
      });

      const content = payload.data.choices[0]?.message?.function_call?.arguments;
      return {
        name: release.name,
        url: release.html_url,
        published: release.published_at,
        content: content ? JSON.parse(content).changes : null,
      };
    }),
  );
}

const stub = [
  { owner: 'withastro', repo: 'astro' },
  { owner: 'angular', repo: 'angular' },
  { owner: 'tailwindlabs', repo: 'tailwindcss' },
  { owner: 'nrwl', repo: 'nx' },
  { owner: 'supabase', repo: 'supabase-js' },
  { owner: 'vercel', repo: 'next.js' },
];
