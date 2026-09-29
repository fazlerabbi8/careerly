'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SocialButtons } from '@/components/auth/social-buttons'
import { cn } from '@/lib/utils'

type RoleValue = 'CANDIDATE' | 'EMPLOYER'

const roles: { value: RoleValue; label: string; hint: string }[] = [
  { value: 'CANDIDATE', label: 'Job seeker', hint: 'Find and apply for jobs' },
  { value: 'EMPLOYER', label: 'Employer', hint: 'Post jobs and hire' },
]

export function RegisterForm() {
  const [role, setRole] = useState<RoleValue>('CANDIDATE')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const data = new FormData(e.currentTarget)
    const password = String(data.get('password'))
    const confirm = String(data.get('confirmPassword'))

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    // TODO: replace with a server action that creates the user in Prisma
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      role,
    })
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>Join Careerly in less than a minute</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <SocialButtons />

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OR SIGN UP WITH EMAIL</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role picker */}
          <div className="space-y-2">
            <Label>I am a...</Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  aria-pressed={role === r.value}
                  className={cn(
                    'rounded-lg border p-3 text-left text-sm transition-colors',
                    role === r.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'hover:bg-muted'
                  )}
                >
                  <span className="block font-medium">{r.label}</span>
                  <span className="text-xs text-muted-foreground">{r.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" placeholder="Your name" autoComplete="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">At least 8 characters.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-sm text-muted-foreground">
        Already have an account?&nbsp;
        <Link href="/login" className="font-medium text-foreground hover:underline">
          Log in
        </Link>
      </CardFooter>
    </Card>
  )
}