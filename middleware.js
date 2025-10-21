import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

// Specify the runtime environment as Node.js
export const config = {
  runtime: 'nodejs', // Now stable!
};

export default async function Middleware(req) {

  // filter out requests for static files and api routes
  if (req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.pathname.startsWith('/api') || req.nextUrl.pathname.startsWith('/static') || req.nextUrl.pathname.includes('.')) {
    return NextResponse.next()
  }

  // create cookies instance
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  // creating paths array
  const authRoutes = ['/login', '/signup']
  const protectedRoutes = ['/shorten']

  // if token not found, cannot access protected routes
  if (!token && req.nextUrl.pathname.includes(protectedRoutes)) {
    console.log('redirecting to login no token')
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // create isAuthenticated variable
  let isAuthenticated = false

  // verify token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    if (user) {
      console.log('token is valid', user.username)
      isAuthenticated = true
    }
  } catch (error) {
    // if token is invalid, redirect to login
    if (req.nextUrl.pathname.includes(protectedRoutes)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  console.log('isAuthenticated:', isAuthenticated, req.nextUrl.pathname, authRoutes.includes(req.nextUrl.pathname))

  // if user is logged in, cannot access login or signup page
  if (isAuthenticated && authRoutes.includes(req.nextUrl.pathname)) {
    console.log('redirecting to home authenticated')
    return NextResponse.redirect(new URL('/', req.url))
  }

  // allow request to proceed
  return NextResponse.next()
}

