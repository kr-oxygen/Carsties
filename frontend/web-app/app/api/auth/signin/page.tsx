import UnAuthorized from '@/app/components/UnAuthorized';

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return <UnAuthorized callbackUrl={callbackUrl} />;
}
