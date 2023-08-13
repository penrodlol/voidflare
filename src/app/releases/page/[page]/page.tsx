import { pageSchema } from '@/libs/schema';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const revalidate = 28800;

export default async function Page(props: { params: { page: string } }) {
  const params = z.object({ page: pageSchema }).safeParse(props.params);
  if (!params.success) redirect('/');

  return (
    <div className="mx-auto mt-fluid-4 flex max-w-screen-md flex-col gap-fluid-3">
      <section className="flex flex-col gap-2 border-b pb-fluid-4">
        <h1 className="font-serif text-5xl uppercase tracking-widest text-fancy">all releases</h1>
        <p className="max-w-[55ch]">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </section>
    </div>
  );
}
