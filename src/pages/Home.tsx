import { useAppAuth } from '@/lib/app-auth-context'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🚀',
    title: 'Comece em minutos',
    text: 'Crie sua conta e acesse o painel na hora, sem burocracia.',
  },
  {
    icon: '🔒',
    title: 'Seguro por padrão',
    text: 'Login profissional com sessões seguras e proteção dos seus dados.',
  },
  {
    icon: '📱',
    title: 'Em qualquer tela',
    text: 'Layout responsivo para celular, tablet e computador.',
  },
]

const steps = [
  { n: '1', title: 'Crie sua conta', text: 'Leva menos de um minuto: nome, e-mail e senha.' },
  { n: '2', title: 'Confirme o e-mail', text: 'Um código de verificação confirma que é você.' },
  { n: '3', title: 'Acesse o painel', text: 'Seu espaço pessoal, protegido por login.' },
]

export default function Home() {
  const { isSignedIn } = useAppAuth()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-display text-lg font-bold text-white">
              N
            </span>
            <span className="font-display text-lg font-bold text-ink-900">Nimbus</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-500 md:flex">
            <a href="#recursos" className="transition-colors hover:text-ink-900">Recursos</a>
            <a href="#como-funciona" className="transition-colors hover:text-ink-900">Como funciona</a>
          </nav>
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <Link
                to="/painel"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
              >
                Ir para o painel
              </Link>
            ) : (
              <>
                <Link to="/entrar" className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-ink-900 sm:block">
                  Entrar
                </Link>
                <Link
                  to="/criar-conta"
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  Criar conta
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(51,146,247,0.14),transparent)]" />
          <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              Novo · O jeito simples de organizar seu dia
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-6xl">
              Tudo o que você precisa,{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                em um só lugar
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-500">
              Crie sua conta grátis, faça login e acompanhe tudo pelo seu painel pessoal. Simples, rápido e em português.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/criar-conta"
                className="w-full rounded-xl bg-brand-600 px-8 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 sm:w-auto"
              >
                Criar conta grátis
              </Link>
              <Link
                to="/entrar"
                className="w-full rounded-xl border border-ink-100 bg-white px-8 py-3.5 text-center text-base font-semibold text-ink-700 shadow-sm transition hover:border-brand-200 hover:text-ink-900 sm:w-auto"
              >
                Já tenho conta
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-300">Grátis para começar · Sem cartão de crédito</p>
          </div>
        </section>

        <section id="recursos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-ink-900">Por que usar o Nimbus?</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-500">
            Feito para quem quer resultado sem complicação.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">{f.icon}</div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="border-y border-ink-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-center font-display text-3xl font-bold text-ink-900">Como funciona</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="rounded-2xl bg-background p-6 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display font-bold text-white">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-14 text-center shadow-xl shadow-brand-600/20 sm:px-12">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Pronto para começar?</h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-100">
              Crie sua conta agora e acesse seu painel em menos de um minuto.
            </p>
            <Link
              to="/criar-conta"
              className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
            >
              Criar minha conta grátis
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-100 bg-white py-8 text-center text-sm text-ink-300">
        © 2026 Nimbus · Todos os direitos reservados
      </footer>
    </div>
  )
}
