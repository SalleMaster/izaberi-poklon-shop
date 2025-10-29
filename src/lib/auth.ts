import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { admin } from 'better-auth/plugins'
import prisma from '@/lib/db'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: false,
  },
  // session: {
  //   fields: {
  //     expiresAt: 'expires',
  //     token: 'sessionToken',
  //   },
  // },
  // account: {
  //   fields: {
  //     accountId: 'providerAccountId',
  //     refreshToken: 'refresh_token',
  //     accessToken: 'access_token',
  //     accessTokenExpiresAt: 'access_token_expires',
  //     idToken: 'id_token',
  //   },
  // },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    },
  },
  // plugins: [nextCookies()],
  plugins: [admin(), nextCookies()],
})
