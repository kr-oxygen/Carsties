'use client';

import { useParamsStore } from '@/hooks/useParamsStore';
import { Button } from 'flowbite-react';
import EmptyState from './EmptyState';

export default function EmptyFilter() {
  const reset = useParamsStore((state) => state.reset);

  return (
    <EmptyState
      title='No matches for this filter'
      subtitle='Try changing the filter or search term'
    >
      <Button outline onClick={reset}>
        Reset filters
      </Button>
    </EmptyState>
  );
}
