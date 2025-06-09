import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token'); // Check for auth token in cookies
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next();
}

// Force auth on all paths
export const config = {
    matcher: "/((?!login|signup|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
}