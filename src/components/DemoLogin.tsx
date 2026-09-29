import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { setDemoUser } from '@/lib/demo-auth'

export default function DemoLogin({ mode }: { mode: 'signin' | 'signup' }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done) return
    const timer = window.setTimeout(() => {
      window.location.href = '/painel'
    }, 400)
    return () => window.clearTimeout(timer)
  }, [done])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Preencha e-mail e senha para continuar.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Digite um e-mail válido, por exemplo: nome@exemplo.com')
      return
    }
    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }

    const firstName = name.trim().split(/\s+/)[0] || email.trim().split('@')[0]
    setDemoUser({ firstName, email: email.trim() })
    setDone(true)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'signup' && (
        <div>
          <label htmlFor="demo-name" className="block text-sm font-medium text-ink-700">
            Nome
          </label>
          <input
            id="demo-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Maria Silva"
            className="mt-1 w-full rounded-lg border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      )}

      <div>
        <label htmlFor="demo-email" className="block text-sm font-medium text-ink-700">
          E-mail
        </label>
        <input
          id="demo-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@exemplo.com"
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div>
        <label htmlFor="demo-password" className="block text-sm font-medium text-ink-700">
          Senha
        </label>
        <input
          id="demo-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo de 6 caracteres"
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          className="mt-1 w-full rounded-lg border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={done}
        className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
      >
        {done ? 'Entrando...' : mode === 'signup' ? 'Criar minha conta' : 'Entrar'}
      </button>

      <p className="text-center text-xs text-ink-300">
        Modo demonstração: os dados ficam salvos apenas neste navegador.
      </p>

      {mode === 'signin' ? (
        <p className="text-center text-sm text-ink-500">
          Ainda não tem conta?{' '}
          <Link to="/criar-conta" className="font-semibold text-brand-600 hover:text-brand-700">
            Criar conta grátis
          </Link>
        </p>
      ) : (
        <p className="text-center text-sm text-ink-500">
          Já tem conta?{' '}
          <Link to="/entrar" className="font-semibold text-brand-600 hover:text-brand-700">
            Entrar
          </Link>
        </p>
      )}
    </form>
  )
}
