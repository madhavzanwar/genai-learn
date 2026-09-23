import type { Metadata } from 'next'
import { AuthClient } from '@/components/auth-client'

export const metadata: Metadata = {
  title: 'Authentication — EKLAVYA Studio',
  description: 'Sign in or register for EKLAVYA Learning Studio.',
}

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const defaultTab = tab === 'register' ? 'register' : 'login'

  return <AuthClient defaultTab={defaultTab} />
}
