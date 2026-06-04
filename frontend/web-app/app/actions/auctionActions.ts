'use server';

import { FieldValues } from 'react-hook-form';
import { auth } from '@/auth';
import { fetchWrapper } from '@/lib/fetchWrapper';
import { Auction, Bid, PaginatedResult } from '@/types/auction';

export async function getData(
  query: string,
): Promise<PaginatedResult<Auction>> {
  return fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest(): Promise<{
  status: number;
  message: string;
}> {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };

  return fetchWrapper.put(
    'auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c',
    data,
  );
}

export async function createAuction(data: FieldValues) {
  return fetchWrapper.post('auctions', data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
  return fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
  return fetchWrapper.put(`auctions/${id}`, data);
}

export async function deleteAuction(id: string) {
  return fetchWrapper.del(`auctions/${id}`);
}

export async function getBidsForAuction(id: string): Promise<Bid[]> {
  const bids = await fetchWrapper.get(`bids/${id}`);
  console.log('BIDS', bids);
  return bids;
}

export async function placeBidForAuction(auctionId: string, amount: number) {
  const bid = await fetchWrapper.post(
    `bids?auctionId=${auctionId}&amount=${amount}`,
    {},
  );
  console.log('bid', bid);
  return bid;
}
