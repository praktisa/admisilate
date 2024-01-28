
import { NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {

    function CopyHeader(req: any) {
        const requestHeaders = new Headers(req)

        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        })

        return response
    }


    if (request.nextUrl.pathname.includes("api")) {

        if (!request.nextUrl.pathname.includes("FETCH_GET_DATA_MOBIL_ALTERNATIF")) {
            let isFromApp = request.headers.get('api_key')

            if (isFromApp != process.env.API_KEY) {
                return Response.json(
                    'authentication failed',
                    { status: 401 }
                )
            }
        }

    }

}
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/App/:path*',
        '/Auth/:path*',
    ]
}

