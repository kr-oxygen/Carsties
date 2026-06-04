export interface PaginatedResult<T> {
  results: T[];
  pageCount: number;
  totalCount: number;
}

export interface Auction {
  createdAt: Date;
  updatedAt: Date;
  reservePrice: number;
  seller?: string;
  winner: string;
  soldAmount: number;
  currentHighBid: number;
  auctionEnd: Date;
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
  id: string;
}

export type Bid = {
  id: string;
  auctionId: string;
  bidder: string;
  bidTime: string;
  amount: number;
  bidStatus: string;
};

export type AuctionFinished = {
  itemSold: boolean;
  auctionId: string;
  winner?: string;
  seller: string;
  amount?: number;
};
