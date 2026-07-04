import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

// Explicitly define the middleware logic
export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdminRoute = req.nextUrl.pathname.startsWith('/bromakhome')
  const isLoginPage = req.nextUrl.pathname === '/bromakhome/login'

  // If trying to access admin pages but not logged in, redirect to login
  if (isOnAdminRoute && !isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/bromakhome/login', req.nextUrl))
  }

  // If already logged in and trying to go to login page, redirect to admin dashboard
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/bromakhome', req.nextUrl))
  }

  return NextResponse.next()
})

// Specify which paths this middleware applies to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
}
