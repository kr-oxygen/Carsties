'use client';

import Heading from './Heading';

export default function EmptyState({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-[40vh] shadow-lg'>
      <Heading title={title} subtitle={subtitle} center />
      {children && <div className='mt-4'>{children}</div>}
    </div>
  );
}
