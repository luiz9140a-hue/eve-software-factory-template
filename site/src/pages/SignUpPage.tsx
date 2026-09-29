import { SignUp } from '@clerk/clerk-react'
import { Link, Navigate } from 'react-router-dom'
import DemoLogin from '@/components/DemoLogin'
import { clerkEnabled } from '@/lib/clerk-enabled'
import { useAppAuth } from '@/lib/app-auth-context'

export default function SignUpPage() {
  const { isSignedIn } = useAppAuth()

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
            <h1 className="font-display text-2xl font-bold text-ink-900">Crie sua conta grátis</h1>
            <p className="mt-2 text-sm text-ink-500">Leva menos de um minuto. Sem cartão de crédito.</p>
          </div>
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm sm:p-8">
            {clerkEnabled ? (
              <div className="clerk-localized">
                <SignUp signInUrl="/entrar" fallbackRedirectUrl="/painel" forceRedirectUrl="/painel" />
              </div>
            ) : (
              <DemoLogin mode="signup" />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
