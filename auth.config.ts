import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  providers: [], // we will add the actual provider in auth.ts
} satisfies NextAuthConfig
