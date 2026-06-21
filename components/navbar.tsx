'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    setUserName(localStorage.getItem('genai_user'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('genai_token')
    localStorage.removeItem('genai_user')
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-foreground">
          GenAI Learn
        </Link>
        <nav className="flex items-center gap-2">
          {userName ? (
            <>
              <span className="text-[13px] text-muted-foreground mr-1">{userName}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth">Log In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth?tab=register">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
