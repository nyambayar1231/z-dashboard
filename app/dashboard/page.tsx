import { Suspense } from 'react';
import { lusitana } from '../ui/fonts';
import { CardSkeleton } from '../ui/skeletons';
import CardWrapper from '../ui/dashboard/cards';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
    </main>
  );
}
