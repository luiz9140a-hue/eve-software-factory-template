import { useAuth, useUser } from '@clerk/clerk-react'
import type { ReactNode } from 'react'
import { AppAuthContext, type AppUser } from './app-auth-context'
import { clerkEnabled } from './clerk-enabled'

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
 * Sem chave do Clerk, entrega um contexto "deslogado" estável. Nenhum hook é
 * chamado condicionalmente: a ramificação acontece entre componentes.
 */
export function AppAuthProvider({ children }: { children: ReactNode }) {
  if (!clerkEnabled) {
    return <AppAuthContext.Provider value={{ isLoaded: true, isSignedIn: false, user: null }}>{children}</AppAuthContext.Provider>
  }

  return <ClerkBridge>{children}</ClerkBridge>
}
