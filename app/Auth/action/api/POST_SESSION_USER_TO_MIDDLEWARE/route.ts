'use server'
import { NextRequest, NextResponse } from 'next/server'




export async function POST(request: NextRequest, response: NextResponse) {

    console.log("request GET IP USER", request)

    const requestHeaders = new Headers(request.headers)

    const ResponsetoApp = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    // return NextResponse.redirect(new URL('/App', request.url))
    return ResponsetoApp


}