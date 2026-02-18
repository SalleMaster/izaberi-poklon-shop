'use client'

import { User } from '@/generated/prisma/client'
import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

type AuthContextType = {
  userDetails: Promise<User | null>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({
  children,
  userDetails,
}: {
  children: ReactNode
  userDetails: Promise<User | null>
}) {
  return (
    <AuthContext.Provider value={{ userDetails }}>
      {children}
    </AuthContext.Provider>
  )
}
