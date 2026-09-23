'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { login, register } from '@/lib/api'

function FieldRow({
  label,
  id,
  type = 'text',
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  label: string
  id: string
  type?: string
  placeholder: string
  autoComplete?: string
  value: string
  onChange: (value: string) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-700"
      >
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'h-10 text-[13px] rounded-xs border-[#E4E0D7] bg-white text-[#18181B] placeholder:text-stone-500 focus-visible:ring-1 focus-visible:ring-[#18181B] focus-visible:border-[#18181B] transition-all',
            isPassword && 'pr-10'
          )}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 hover:text-[#18181B] transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
    </div>
  )
}

export function AuthClient({ defaultTab }: { defaultTab: 'login' | 'register' }) {
  const router = useRouter()
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await login(loginEmail, loginPassword)
      localStorage.setItem('genai_token', data.token)
      localStorage.setItem('genai_user', data.name)
      if (data.unlockedLessons) {
        localStorage.setItem('unlockedLessons', JSON.stringify(data.unlockedLessons))
      }
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const name = `${firstName} ${lastName}`.trim()
      const data = await register(name, registerEmail, registerPassword)
      localStorage.setItem('genai_token', data.token)
      localStorage.setItem('genai_user', data.name)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex flex-col items-center justify-center px-4 py-16">
      {/* Official Studio Brand Mark Header */}
      <Link href="/" className="flex items-center gap-2.5 group mb-8">
        <div className="w-8 h-8 rounded-xs bg-[#18181B] text-[#F7F4EF] flex items-center justify-center font-mono font-black text-sm tracking-tighter shadow-2xs group-hover:scale-105 transition-transform">
          GL
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[13px] font-black tracking-widest uppercase text-[#18181B] leading-none">
            GenAI Learn
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 leading-none mt-1">
            Learning Studio
          </span>
        </div>
      </Link>

      {/* Elevated Studio Editorial Container */}
      <div className="w-full max-w-[420px] bg-white border border-[#E4E0D7] rounded-sm shadow-[4px_4px_0px_0px_#18181B] p-6 sm:p-8">
        <Tabs defaultValue={defaultTab} className="w-full">
          <div>
            <TabsList className="w-full grid grid-cols-2 p-1 bg-[#EFECE6] rounded-xs border border-[#E4E0D7] h-9">
              <TabsTrigger
                value="login"
                className="rounded-xs text-xs font-mono uppercase tracking-wider font-semibold data-active:bg-white data-active:text-[#18181B] data-active:shadow-2xs text-stone-600 transition-all cursor-pointer"
              >
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-xs text-xs font-mono uppercase tracking-wider font-semibold data-active:bg-white data-active:text-[#18181B] data-active:shadow-2xs text-stone-600 transition-all cursor-pointer"
              >
                Register
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Login Form */}
          <TabsContent value="login" className="pt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs bg-[#F7F4EF] text-stone-700 border border-[#E4E0D7]">
                  STUDIO ACCESS
                </span>
              </div>
              <h1 className="text-xl font-bold text-[#18181B] tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-stone-600 font-mono">
                Sign in to continue your learning journey.
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <FieldRow
                label="Email address"
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={loginEmail}
                onChange={setLoginEmail}
              />
              <FieldRow
                label="Password"
                id="login-password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={setLoginPassword}
              />
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-[11px] font-mono text-stone-600 hover:text-[#18181B] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              {error && (
                <div className="text-xs font-mono text-[#DC2626] bg-red-50 border border-red-200 rounded-xs px-3 py-2">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-10 bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] rounded-xs font-mono uppercase tracking-wider font-bold shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Log In'}
              </Button>
            </form>

            <div className="flex items-center gap-3 my-1">
              <Separator className="flex-1 bg-[#E4E0D7]" />
              <span className="text-[10px] text-stone-600 font-mono uppercase tracking-widest font-semibold">
                OR
              </span>
              <Separator className="flex-1 bg-[#E4E0D7]" />
            </div>

            <p className="text-xs text-center text-stone-600 font-mono">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth?tab=register"
                className="text-[#18181B] font-bold underline underline-offset-2 hover:text-stone-700"
              >
                Create one free
              </Link>
            </p>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register" className="pt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs bg-[#F7F4EF] text-stone-700 border border-[#E4E0D7]">
                  STUDENT ONBOARDING
                </span>
              </div>
              <h1 className="text-xl font-bold text-[#18181B] tracking-tight">
                Create your account
              </h1>
              <p className="text-xs text-stone-600 font-mono">
                Free full access to foundational AI courses.
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-3">
                <FieldRow
                  label="First name"
                  id="register-first"
                  placeholder="Alex"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={setFirstName}
                />
                <FieldRow
                  label="Last name"
                  id="register-last"
                  placeholder="Jordan"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={setLastName}
                />
              </div>
              <FieldRow
                label="Email address"
                id="register-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={registerEmail}
                onChange={setRegisterEmail}
              />
              <FieldRow
                label="Password"
                id="register-password"
                type="password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                value={registerPassword}
                onChange={setRegisterPassword}
              />
              {error && (
                <div className="text-xs font-mono text-[#DC2626] bg-red-50 border border-red-200 rounded-xs px-3 py-2">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-10 bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] rounded-xs font-mono uppercase tracking-wider font-bold shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <p className="text-[11px] text-center text-stone-600 leading-relaxed font-mono">
              By registering, you agree to our{' '}
              <Link href="#" className="text-[#18181B] underline underline-offset-2 hover:text-stone-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-[#18181B] underline underline-offset-2 hover:text-stone-700">
                Privacy Policy
              </Link>
              .
            </p>

            <div className="flex items-center gap-3 my-1">
              <Separator className="flex-1 bg-[#E4E0D7]" />
              <span className="text-[10px] text-stone-600 font-mono uppercase tracking-widest font-semibold">
                OR
              </span>
              <Separator className="flex-1 bg-[#E4E0D7]" />
            </div>

            <p className="text-xs text-center text-stone-600 font-mono">
              Already have an account?{' '}
              <Link
                href="/auth"
                className="text-[#18181B] font-bold underline underline-offset-2 hover:text-stone-700"
              >
                Log in
              </Link>
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <p className="mt-8 text-xs font-mono text-stone-600 text-center">
        GenAI Learn Learning Studio &bull; Editorial Learning System
      </p>
    </div>
  )
}
