'use client';

import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Auction } from '@/types/auction';
import { Button, Spinner } from 'flowbite-react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createAuction, updateAuction } from '../actions/auctionActions';
import DateInput from '../components/DateInput';
import Input from '../components/Input';

export default function AuctionForm({ auction }: { auction?: Auction }) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm({ mode: 'onTouched' });

  async function onSubmit(data: FieldValues) {
    try {
      let id = '';
      let res;

      if (pathname === 'auctions/create') {
        res = await createAuction(data);

        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);

          id = auction.id;
        }
      }

      if (res.error) {
        throw res.error;
      }

      router.push(`/auctions/details/${id}`);
    } catch (error) {
      const { status, message } = error as { status: string; message: string };

      toast.error(`${status} ${message}`);
    }
  }

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;

      reset({ make, model, color, mileage, year });
    }

    setFocus('make');
  }, [setFocus, auction, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col mt-3 gap-4'
    >
      <Input
        name='make'
        label='Make'
        control={control}
        rules={{ required: 'Make is required' }}
      />

      <Input
        name='model'
        label='Model'
        control={control}
        rules={{ required: 'Model is required' }}
      />

      <Input
        name='color'
        label='Color'
        control={control}
        rules={{ required: 'Color is required' }}
      />

      <div className='grid grid-cols-2 gap-3'>
        <Input
          name='year'
          label='Year'
          control={control}
          rules={{ required: 'Year is required' }}
          type='number'
        />
        <Input
          name='mileage'
          label='Mileage'
          control={control}
          rules={{ required: 'Mileage is required' }}
          type='number'
        />
      </div>

      {pathname === 'auctions/create' && (
        <>
          <Input
            name='imageUrl'
            label='Image URL'
            control={control}
            rules={{ required: 'Image URL is required' }}
          />

          <div className='grid grid-cols-2 gap-3'>
            <Input
              name='reservePrice'
              label='Reserve Price (enter 0 if no reserve)'
              control={control}
              rules={{ required: 'Reserve Price is required' }}
              type='number'
            />
            <DateInput
              name='auctionEnd'
              label='Auction end date/time'
              control={control}
              rules={{ required: 'Auction end date is required' }}
              showTimeSelect
              dateFormat='dd MMM yyyy h:mm a'
            />
          </div>
        </>
      )}

      <div className='flex justify-between'>
        <Button color='alternative' onClick={() => router.push('/')}>
          Cancel
        </Button>
        <Button
          type='submit'
          outline
          color='green'
          disabled={!isDirty || isSubmitting || !isValid}
        >
          {isSubmitting && <Spinner size='sm' />}
          Submit
        </Button>
      </div>
    </form>
  );
}
