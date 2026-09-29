import { Link } from 'react-router-dom'

export default function LoginUnavailable() {
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
        <div className="w-full max-w-md rounded-2xl border border-ink-100 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-3xl">🔐</div>
          <h1 className="mt-5 font-display text-xl font-bold text-ink-900">Login em ativação</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            Estamos finalizando a configuração da área de membros. Tente novamente em instantes.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
    </div>
  )
}
