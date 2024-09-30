import NextAuth from 'next-auth'
// import { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import prisma from './lib/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma) as Adapter,
  // trustHost: true, Enable this if you're having problems in production
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    },
  },
  providers: [
    Google,
    Resend({
      from: 'no-reply@radovanovic.net',
    }),
  ],
})
