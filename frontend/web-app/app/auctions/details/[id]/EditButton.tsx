import { Button } from 'flowbite-react';
import Link from 'next/link';

export default function EditButton({ id }: { id: string }) {
  return (
    <Button outline>
      <Link href={`/auctions/update/${id}`}>Update Auction</Link>
    </Button>
  );
}
