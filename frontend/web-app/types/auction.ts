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
  winner: null;
  soldAmount: null;
  currentHighBid: null;
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
