'use client';

import { Button } from 'flowbite-react';
import { signIn } from 'next-auth/react';
import EmptyState from './EmptyState';

export default function UnAuthorized({ callbackUrl }: { callbackUrl: string }) {
  return (
    <EmptyState
      title='You need to be logged in to do that'
      subtitle='Please click below to login'
    >
      <Button
        outline
        onClick={() => signIn('id-server', { redirectTo: callbackUrl })}
      >
        Login
      </Button>
    </EmptyState>
  );
}
