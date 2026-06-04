'use client';

import { useEffect, useState } from 'react';
import { useParamsStore } from '@/hooks/useParamsStore';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  const setParams = useParamsStore((state) => state.setParams);
  const searchTerm = useParamsStore((state) => state.searchTerm);

  const [value, setValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSearch() {
    setParams({ searchTerm: value });
  }

  useEffect(() => {
    if (searchTerm === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue('');
    }
  }, [searchTerm]);

  return (
    <div className='flex w-[50%] items-center border-2 border-gray-300 rounded-full py-2 shadow-sm'>
      <input
        onChange={handleChange}
        value={value}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        type='text'
        placeholder='Search for cars by make, model, or color...'
        className='input-custom'
      />
      <button onClick={handleSearch}>
        <FaSearch
          size={34}
          className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2'
        />
      </button>
    </div>
  );
}
