import { AuthClient } from '@/components/auth-client'

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const defaultTab = tab === 'register' ? 'register' : 'login'

  return <AuthClient defaultTab={defaultTab} />
}
