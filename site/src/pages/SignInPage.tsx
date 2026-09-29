import { SignIn } from '@clerk/clerk-react'
import { Link, Navigate } from 'react-router-dom'
import LoginUnavailable from '@/components/LoginUnavailable'
import { clerkEnabled } from '@/lib/clerk-enabled'
import { useAppAuth } from '@/lib/app-auth-context'

export default function SignInPage() {
  const { isSignedIn } = useAppAuth()

  if (!clerkEnabled) {
    return <LoginUnavailable />
  }

  if (isSignedIn) {
    return <Navigate to="/painel" replace />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-ink-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-display text-lg font-bold text-white">N</span>
            <span className="font-display text-lg font-bold text-ink-900">Nimbus</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold text-ink-900">Bem-vindo de volta</h1>
            <p className="mt-2 text-sm text-ink-500">Entre com seu e-mail e senha para acessar o painel.</p>
          </div>
          <div className="clerk-localized rounded-2xl border border-ink-100 bg-white p-6 shadow-sm sm:p-8">
            <SignIn signUpUrl="/criar-conta" fallbackRedirectUrl="/painel" forceRedirectUrl="/painel" />
          </div>
          <p className="mt-6 text-center text-sm text-ink-500">
            Ainda não tem conta?{' '}
            <Link to="/criar-conta" className="font-semibold text-brand-600 hover:text-brand-700">
              Criar conta grátis
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
