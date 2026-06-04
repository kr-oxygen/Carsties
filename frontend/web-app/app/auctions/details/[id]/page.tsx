import { getDetailedViewData } from '@/app/actions/auctionActions';
import { getCurrentUser } from '@/app/actions/authActions';
import Heading from '@/app/components/Heading';
import BidList from './BidList';
import DeleteButton from './DeleteButton';
import DetailedSpecs from './DetailedSpecs';
import EditButton from './EditButton';
import CarImage from '../../CarImage';
import CountdownTimer from '../../CountdownTimer';

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  const data = await getDetailedViewData(id);

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <Heading title={`${data.make} ${data.model}`} />
          {user?.username === data.seller && (
            <>
              <EditButton id={id} />
              <DeleteButton id={id} />
            </>
          )}
        </div>
        <div className='flex gap-3'>
          <h3 className='text-2xl font-semibold'>Time remaining:</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6 mt-3'>
        <div className='relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden'>
          <CarImage imageUrl={data.imageUrl} />
        </div>
        <BidList auction={data} user={user} />
      </div>

      <div className='mt-3 grid grid-cols-1 rounded-lg'>
        <DetailedSpecs auction={data} />
      </div>
    </>
  );
}
