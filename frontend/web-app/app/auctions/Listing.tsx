'use client';

import { useEffect, useState } from 'react';
import { useParamsStore } from '@/hooks/useParamsStore';
import { Auction, PaginatedResult } from '@/types/auction';
import qs from 'query-string';
import { useShallow } from 'zustand/shallow';
import AuctionCard from './AuctionCard';
import Filters from './Filters';
import { getData } from '../actions/auctionActions';
import AppPagination from '../components/AppPagination';
import EmptyFilter from '../components/EmptyFilter';

export default function Listing() {
  const [data, setData] = useState<PaginatedResult<Auction>>();

  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    })),
  );

  const setParams = useParamsStore((state) => state.setParams);

  function setPageNumber(page: number) {
    setParams({ pageNumber: page });
  }

  const url = qs.stringifyUrl(
    { url: '', query: params },
    { skipEmptyString: true },
  );

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className='grid grid-cols-4 gap-6'>
            {data.results.map((auction: Auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
          <div className='flex justify-center mt-4'>
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
              pageChanged={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  );
}
