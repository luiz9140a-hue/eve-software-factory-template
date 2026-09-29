import { ClerkProvider } from '@clerk/clerk-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AppAuthProvider } from './lib/app-auth.tsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const ClerkProviderWithKey = PUBLISHABLE_KEY
  ? ({ children }: { children: React.ReactNode }) => (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>
    )
  : ({ children }: { children: React.ReactNode }) => <>{children}</>

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProviderWithKey>
        <AppAuthProvider>
          <App />
        </AppAuthProvider>
      </ClerkProviderWithKey>
    </BrowserRouter>
  </StrictMode>,
)
