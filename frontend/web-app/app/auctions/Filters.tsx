import { useParamsStore } from '@/hooks/useParamsStore';
import { Button, ButtonGroup } from 'flowbite-react';
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs';
import { GiFinishLine, GiFlame } from 'react-icons/gi';
import { useShallow } from 'zustand/shallow';

const pageSizeButtons = [4, 8, 12];

const orderButtons = [
  { label: 'Alphabetical', icon: AiOutlineSortAscending, value: 'make' },
  { label: 'End date', icon: AiOutlineClockCircle, value: 'endingSoon' },
  { label: 'Recently added', icon: BsFillStopCircleFill, value: 'new' },
];

const filterButtons = [
  { label: 'Live auctions', icon: GiFlame, value: 'live' },
  { label: 'Ending < 6 hours', icon: GiFinishLine, value: 'endingSoon' },
  { label: 'Completed', icon: BsStopwatchFill, value: 'finished' },
];

export default function Filters() {
  const pageSize = useParamsStore(useShallow((state) => state.pageSize));
  const orderBy = useParamsStore(useShallow((state) => state.orderBy));
  const filterBy = useParamsStore(useShallow((state) => state.filterBy));
  const setParams = useParamsStore((state) => state.setParams);

  function setPageSize(size: number) {
    setParams({ pageSize: size });
  }

  return (
    <div className='flex justify-between items-center flex-wrap gap-2 mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>Filter by</span>
        <ButtonGroup outline>
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={`${filterBy === value ? 'red' : 'gray'}`}
              className='focus:ring-0'
            >
              <Icon className='mr-3 h-4 w-4' />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>Order by</span>
        <ButtonGroup outline>
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value ? 'red' : 'gray'}`}
              className='focus:ring-0'
            >
              <Icon className='mr-3 h-4 w-4' />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>Page size</span>
        <ButtonGroup outline>
          {pageSizeButtons.map((value, index) => (
            <Button
              key={index}
              onClick={() => setPageSize(value)}
              color={`${pageSize === value ? 'red' : 'gray'}`}
              className='focus:ring-0'
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
