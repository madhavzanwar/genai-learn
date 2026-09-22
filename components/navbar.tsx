'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function Navbar() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('genai_user')
    setUserName(user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('genai_token')
    localStorage.removeItem('genai_user')
    setUserName(null)
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 bg-[#F7F4EF]/95 backdrop-blur-xs border-b border-[#E4E0D7] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          
          {/* Studio Brand Mark */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-sm bg-[#18181B] text-[#F7F4EF] flex items-center justify-center font-mono font-black text-sm tracking-tighter">
              GL
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-black tracking-widest uppercase text-[#18181B] leading-none">
                GenAI Learn
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 leading-none mt-1">
                Learning Studio
              </span>
            </div>
          </Link>

          {/* Center Editorial Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#courses"
              className="text-[12px] font-mono uppercase tracking-widest text-stone-600 hover:text-[#18181B] transition-colors relative py-1 hover:border-b-2 hover:border-[#18181B]"
            >
              Courses
            </Link>
            <Link
              href="#features"
              className="text-[12px] font-mono uppercase tracking-widest text-stone-600 hover:text-[#18181B] transition-colors relative py-1 hover:border-b-2 hover:border-[#18181B]"
            >
              Features
            </Link>
            <Link
              href="#workflow"
              className="text-[12px] font-mono uppercase tracking-widest text-stone-600 hover:text-[#18181B] transition-colors relative py-1 hover:border-b-2 hover:border-[#18181B]"
            >
              How It Works
            </Link>
          </nav>

          {/* Right Action / Auth State */}
          <div className="hidden md:flex items-center gap-3">
            {userName ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#E4E0D7] text-xs font-medium text-stone-800">
                  <UserIcon className="size-3.5 text-stone-500" />
                  <span>{userName}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs text-stone-600 hover:text-red-600 hover:bg-white rounded-sm border border-transparent hover:border-[#E4E0D7] transition-all"
                >
                  <LogOut className="size-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                    className: 'text-xs font-mono uppercase tracking-wider text-stone-700 hover:text-[#18181B] hover:bg-stone-200/60 h-8 px-3 rounded-sm',
                  })}
                >
                  Log In
                </Link>
                <Link
                  href="/auth?tab=register"
                  className={buttonVariants({
                    size: 'sm',
                    className: 'bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] text-xs font-mono uppercase tracking-wider h-8 px-4 rounded-sm shadow-2xs font-semibold',
                  })}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-sm text-stone-700 hover:bg-stone-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4E0D7] bg-[#F7F4EF] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            <Link
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider py-2 px-3 rounded-sm text-stone-700 hover:bg-white"
            >
              Courses
            </Link>
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider py-2 px-3 rounded-sm text-stone-700 hover:bg-white"
            >
              Features
            </Link>
            <Link
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider py-2 px-3 rounded-sm text-stone-700 hover:bg-white"
            >
              How It Works
            </Link>
          </nav>
          <div className="pt-2 border-t border-[#E4E0D7]">
            {userName ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-xs font-medium text-stone-800">{userName}</span>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1"
                >
                  <LogOut className="size-3" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-mono uppercase tracking-wider rounded-sm border border-[#E4E0D7] bg-white text-stone-800 font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/auth?tab=register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-mono uppercase tracking-wider rounded-sm bg-[#18181B] text-[#F7F4EF] font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
