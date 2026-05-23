'use client';

import { Pagination } from 'flowbite-react';

export default function AppPagination({
  currentPage,
  pageCount,
  pageChanged,
}: {
  currentPage: number;
  pageCount: number;
  pageChanged: (page: number) => void;
}) {
  if (pageCount === 0) {
    return null;
  }

  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={(e) => pageChanged(e)}
      totalPages={pageCount}
      layout='pagination'
      showIcons={true}
      className='text-blue-500 mb-5'
    />
  );
}
