import { createContext, useContext } from 'react'

export type AppUser = {
  firstName?: string | null
  emailAddresses?: { emailAddress: string }[]
} | null

export type AppAuth = {
  isLoaded: boolean
  isSignedIn: boolean
  user: AppUser
}

export const AppAuthContext = createContext<AppAuth>({ isLoaded: true, isSignedIn: false, user: null })

export function useAppAuth(): AppAuth {
  return useContext(AppAuthContext)
}
