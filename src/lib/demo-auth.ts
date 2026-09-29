export type DemoUser = {
  firstName: string
  email: string
}

const STORAGE_KEY = 'nimbus_demo_user'
const CHANGE_EVENT = 'nimbus-demo-user-change'

let cachedRaw: string | null = null
let cachedUser: DemoUser | null = null

const readUser = (): DemoUser | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === cachedRaw) return cachedUser
    cachedRaw = raw
    cachedUser = raw ? (JSON.parse(raw) as DemoUser) : null
    return cachedUser
  } catch {
    return null
  }
}

export const getDemoUser = (): DemoUser | null => (typeof window === 'undefined' ? null : readUser())

export const setDemoUser = (user: DemoUser): void => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export const clearDemoUser = (): void => {
  window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export const subscribeDemoUser = (listener: () => void): (() => void) => {
  window.addEventListener(CHANGE_EVENT, listener)
  window.addEventListener('storage', listener)
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener)
    window.removeEventListener('storage', listener)
  }
}
