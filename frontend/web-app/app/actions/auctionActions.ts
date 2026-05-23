'use server';

import { Auction, PaginatedResult } from '@/types/auction';

export async function getData(
  query: string,
): Promise<PaginatedResult<Auction>> {
  const res = await fetch(`http://localhost:6001/search${query}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
