'use client';

import { formatDate } from '@/libs/utils';
import { User } from 'lucide-react';

export default function ReleaseCard(release: any) {
  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded border p-3 bg-gradient hover:bg-gradient-hover"
    >
      <div className="text-12 flex items-center justify-between text-xs text-2">
        <div className="flex items-center gap-2">
          <User size={14} aria-hidden /> {release.project}
        </div>
        <time dateTime={new Date(release.published).toISOString()}>
          {formatDate(release.published)}
        </time>
      </div>
      <div className="flex flex-col gap-3 px-1 py-3">
        <span className="text-lg">{release.name}</span>
        <ol className="ml-2 list-inside list-disc">
          {release.content.map((change: any) => (
            <li className="text-2" key={change}>
              {change}
            </li>
          ))}
        </ol>
      </div>
    </a>
  );
}
