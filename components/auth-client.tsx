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
      <label htmlFor={id} className="text-[12px] font-medium text-foreground">
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
          className={cn('h-10 text-[13px]', isPassword && 'pr-10')}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <Link
        href="/"
        className="text-[15px] font-semibold tracking-tight text-foreground mb-10"
      >
        GenAI Learn
      </Link>

      {/* Card */}
      <div className="w-full max-w-[400px] bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </div>

          {/* Login */}
          <TabsContent value="login" className="px-6 pb-6 pt-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-[18px] font-semibold text-foreground tracking-tight">
                Welcome back
              </h1>
              <p className="text-[13px] text-muted-foreground">
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
                  className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              {error && (
                <p className="text-[12px] text-[#DC2626]">{error}</p>
              )}
              <Button type="submit" className="w-full h-10" disabled={loading}>
                Log In
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-[11px] text-muted-foreground font-medium">OR</span>
              <Separator className="flex-1" />
            </div>

            <p className="text-[12px] text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/auth?tab=register" className="text-foreground font-medium hover:underline underline-offset-2">
                Create one free
              </Link>
            </p>
          </TabsContent>

          {/* Register */}
          <TabsContent value="register" className="px-6 pb-6 pt-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-[18px] font-semibold text-foreground tracking-tight">
                Create your account
              </h1>
              <p className="text-[13px] text-muted-foreground">
                Free access to foundational AI courses.
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
                <p className="text-[12px] text-[#DC2626]">{error}</p>
              )}
              <Button type="submit" className="w-full h-10" disabled={loading}>
                Create Account
              </Button>
            </form>

            <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
              By registering, you agree to our{' '}
              <Link href="#" className="text-foreground hover:underline underline-offset-2">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-foreground hover:underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-[11px] text-muted-foreground font-medium">OR</span>
              <Separator className="flex-1" />
            </div>

            <p className="text-[12px] text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth" className="text-foreground font-medium hover:underline underline-offset-2">
                Log in
              </Link>
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
