'use client';

import { useState } from 'react';
import { Button } from 'flowbite-react/components/Button';
import { Spinner } from 'flowbite-react/components/Spinner';
import { updateAuctionTest } from '../actions/auctionActions';

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: number;
    message: string;
  } | null>(null);

  async function handleUpdate() {
    setResult(null);
    setLoading(true);

    try {
      const res = await updateAuctionTest();
      setResult(res);
    } catch (err) {
      setResult({ status: 500, message: 'Error updating auction' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex items-center gap-4'>
      <Button outline onClick={handleUpdate} disabled={loading}>
        {loading && <Spinner size='sm' light />}
        Test Auth
      </Button>
      <div>
        <pre>{result ? JSON.stringify(result, null, 2) : 'No result'}</pre>
      </div>
    </div>
  );
}
