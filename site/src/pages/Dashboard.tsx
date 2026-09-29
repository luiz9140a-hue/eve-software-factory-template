import { UserButton } from '@clerk/clerk-react'
import { Link, Navigate } from 'react-router-dom'
import { isAdminEmail } from '@/lib/admin'
import { useAppAuth } from '@/lib/app-auth-context'
import { clerkEnabled } from '@/lib/clerk-enabled'
import { clearDemoUser } from '@/lib/demo-auth'

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useAppAuth()

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/entrar" replace />
  }

  const firstName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress || 'pessoa'
  const email = user?.emailAddresses?.[0]?.emailAddress
  const admin = isAdminEmail(email)

  const handleSignOut = () => {
    clearDemoUser()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-ink-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-display text-lg font-bold text-white">N</span>
            <span className="font-display text-lg font-bold text-ink-900">Nimbus</span>
          </Link>
          <div className="flex items-center gap-3">
            {admin && (
              <span className="rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-amber-600">
                Administrador
              </span>
            )}
            {clerkEnabled ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border border-ink-100 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-200 hover:text-ink-900"
              >
                Sair
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-ink-900">
          Olá, {firstName}! 👋
        </h1>
        <p className="mt-2 text-ink-500">Este é o seu painel pessoal. Está funcionando e protegido por login.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <div className="text-3xl">✅</div>
            <h2 className="mt-3 font-display font-semibold text-ink-900">Conta criada</h2>
            <p className="mt-1 text-sm text-ink-500">Seu login está ativo e funcionando.</p>
          </div>
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <div className="text-3xl">🔐</div>
            <h2 className="mt-3 font-display font-semibold text-ink-900">
              {clerkEnabled ? 'Sessão segura' : 'Sessão ativa'}
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              {clerkEnabled
                ? 'Protegido pelo Clerk, com verificação por e-mail.'
                : 'Login em modo demonstração, salvo neste navegador.'}
            </p>
          </div>
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <div className="text-3xl">🚀</div>
            <h2 className="mt-3 font-display font-semibold text-ink-900">Pronto para crescer</h2>
            <p className="mt-1 text-sm text-ink-500">Novos recursos podem ser adicionados ao painel quando quiser.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
