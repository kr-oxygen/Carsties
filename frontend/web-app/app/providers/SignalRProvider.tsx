'use client';

import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useAuctionStore } from '@/hooks/useAuctionStore';
import { useBidStore } from '@/hooks/useBidStore';
import { Auction, AuctionFinished, Bid } from '@/types/auction';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { getDetailedViewData } from '../actions/auctionActions';
import AuctionCreatedToast from '../components/AuctionCreatedToast';
import AuctionFinishedToast from '../components/AuctionFinishedToast';

export default function SignalRProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const user = session.data?.user;

  const connection = useRef<HubConnection | null>(null);

  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);

  const params = useParams<{ id: string }>();

  const handleAuctionFinished = useCallback(
    (finishedAuction: AuctionFinished) => {
      const auction = getDetailedViewData(finishedAuction.auctionId);

      return toast.promise(
        auction,
        {
          loading: 'Loading...',
          success: (auction) => (
            <AuctionFinishedToast
              auction={auction}
              finishedAuction={finishedAuction}
            />
          ),
          error: () => 'Auction finished',
        },
        { success: { duration: 10000, icon: null } },
      );
    },
    [],
  );

  const handleAuctionCreated = useCallback(
    (auction: Auction) => {
      if (user?.username !== auction.seller) {
        return toast(<AuctionCreatedToast auction={auction} />, {
          duration: 10000,
        });
      }
    },
    [user?.username],
  );

  const handleBidPlaced = useCallback(
    (bid: Bid) => {
      if (bid.bidStatus.includes('Accepted')) {
        setCurrentPrice(bid.auctionId, bid.amount);
      }

      if (params.id === bid.auctionId) {
        addBid(bid);
      }
    },
    [setCurrentPrice, addBid, params.id],
  );

  useEffect(() => {
    if (!connection.current) {
      connection.current = new HubConnectionBuilder()
        .withUrl(process.env.NEXT_PUBLIC_NOTIFY_URL!)
        .withAutomaticReconnect()
        .build();

      connection.current
        .start()
        .then(() => console.log('Connected to notification hub'))
        .catch((error) => console.error(error));
    }

    connection.current.on('BidPlaced', handleBidPlaced);
    connection.current.on('AuctionCreated', handleAuctionCreated);
    connection.current.on('AuctionFinished', handleAuctionFinished);

    return () => {
      connection.current?.off('BidPlaced', handleBidPlaced);
      connection.current?.off('AuctionCreated', handleAuctionCreated);
      connection.current?.off('AuctionFinished', handleAuctionFinished);
    };
  }, [
    setCurrentPrice,
    handleBidPlaced,
    handleAuctionCreated,
    handleAuctionFinished,
  ]);

  return children;
}
