import { useParamsStore } from '@/hooks/useParamsSotre';
import { Button } from 'flowbite-react';
import Heading from './Heading';

export default function EmptyFilter({
  title = 'No matches for this filter',
  subtitle = 'Try changing the filter or search term',
  showReset,
}: {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}) {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div className='flex flex-col gap-2 items-center justify-center h-[40vh] shadow-lg'>
      <Heading title={title} subtitle={subtitle} center />
      <div className='mt-4'>
        {showReset && (
          <Button outline onClick={reset}>
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
}
