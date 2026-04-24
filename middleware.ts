import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Temporarily disabled - middleware causing login issues
  // TODO: Fix middleware to work properly with Supabase Auth
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
