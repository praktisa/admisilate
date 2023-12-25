import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL('/home', request.url))

    // console.log("middleware", request)

    if (request.nextUrl.pathname.startsWith('/App/KendaraanDinas/Daftar/Action/api/')) {


        let isFromApp = request.headers.get('api_key')

        if (isFromApp != process.env.API_KEY) {
            return Response.json(
                'authentication failed',
                { status: 401 }
            )
        }


    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/App/:path*',
        '/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_OBJ_DATES_BOOKING'
    ]
}