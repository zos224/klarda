
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/customer/home")) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/customer/login', req.url))
      }
    }
    if (req.nextUrl.pathname.startsWith("/customer/login")) {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL('/customer/home/account', req.url));
      }
      return NextResponse.next();
    }
    if (req.nextUrl.pathname.startsWith("/admin/signin")) {
      if (req.nextauth.token && req.nextauth.token.role === "admin") {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return NextResponse.next();
    }
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!req.nextauth.token || req.nextauth.token.role != "admin") {
        return NextResponse.redirect(new URL('/admin/signin', req.url))
      }
    }
    if (req.nextUrl.pathname.includes("/blog/createOrUpdate") || req.nextUrl.pathname.includes("/blog-category/createOrUpdate") || req.nextUrl.pathname.includes("/event-topic/createOrUpdate") ||
    req.nextUrl.pathname.includes("/event-type/createOrUpdate") || req.nextUrl.pathname.includes("/icon/createOrUpdate") || req.nextUrl.pathname.includes("/link/createOrUpdate") 
    || req.nextUrl.pathname.includes("/open-position/createOrUpdate") || req.nextUrl.pathname.includes("/teaching/createOrUpdate") || req.nextUrl.pathname.includes("/tool/createOrUpdate") || req.nextUrl.pathname.includes("/tool-type/createOrUpdate")
    || req.nextUrl.pathname.includes("/topic/createOrUpdate") || req.nextUrl.pathname.includes("/use-case/createOrUpdate")) {
      if (req.nextauth.token.role != "admin") {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // dưới này là check có token không, có token thì chạy trong code,ko là bắt đăng nhập
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return true
        }

        if (req.nextUrl.pathname.startsWith("/customer")) {
          return true
        }
      } 
    },
  }
)

export const config = { matcher: ["/admin/:path*", "/api/blog/createOrUpdate", "/api/blog-category/createOrUpdate", "/api/event-topic/createOrUpdate", "/api/event-type/createOrUpdate", "/api/icon/createOrUpdate", "/api/link/createOrUpdate", "/api/open-position/createOrUpdate", "/api/teaching/createOrUpdate", "/api/tool/createOrUpdate", "/api/tool-type/createOrUpdate", "/api/topic/createOrUpdate", "/api/topic/createOrUpdate", "/api/use-case/createOrUpdate", "/customer/:path*"] }
