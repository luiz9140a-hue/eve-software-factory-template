import { useAuth, useUser } from '@clerk/clerk-react'
import { useEffect, useState, type ReactNode } from 'react'
import { AppAuthContext, type AppUser } from './app-auth-context'
import { clerkEnabled } from './clerk-enabled'
import { getDemoUser, subscribeDemoUser, type DemoUser } from './demo-auth'

/**
 * Componente que faz a ponte com os hooks do Clerk. Só é montado dentro do
 * ClerkProvider, então chamar useAuth/useUser aqui é sempre válido.
 */
function ClerkBridge({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()

  return (
    <AppAuthContext.Provider value={{ isLoaded, isSignedIn: isSignedIn ?? false, user: (user ?? null) as AppUser }}>
      {children}
    </AppAuthContext.Provider>
  )
}

/**
 * Modo demonstração (sem chave do Clerk): login local no navegador.
 * Nenhum hook é chamado condicionalmente; a ramificação é por componente.
 */
function DemoBridge({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(getDemoUser)

  useEffect(() => subscribeDemoUser(() => setUser(getDemoUser())), [])

  const isSignedIn = user !== null

  return (
    <AppAuthContext.Provider
      value={{
        isLoaded: true,
        isSignedIn,
        user: user ? { firstName: user.firstName, emailAddresses: [{ emailAddress: user.email }] } : null,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  )
}

export function AppAuthProvider({ children }: { children: ReactNode }) {
  if (!clerkEnabled) {
    return <DemoBridge>{children}</DemoBridge>
  }

  return <ClerkBridge>{children}</ClerkBridge>
}
