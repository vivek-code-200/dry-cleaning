import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Not logged in → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  // if (req.nextUrl.pathname.startsWith("/set-password")) {
  //   return NextResponse.next()
  // }
  // if (
  //   token.isOAuth &&
  //   !token.hasPassword &&
  //   req.nextUrl.pathname !== "/set-password"
  // ) {
  //   return NextResponse.redirect(new URL("/set-password", req.url))
  // }
  // Logged in → continue
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/protected/:path*","/orders/:path*"],
}
