import { lusitana } from '@/app/ui/fonts';
import { CreateCategory } from '@/app/ui/categories/buttons';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchCategoriesPages } from '@/app/lib/data';
import { CategoriesTableSkeleton } from '@/app/ui/skeletons';
import Table from '@/app/ui/categories/table';
import Pagination from '@/app/ui/categories/pagination';

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function Page({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCategoriesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Ангилалууд</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Ангилал хайх" />
        {/* <CreateCategory /> */}
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<CategoriesTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
