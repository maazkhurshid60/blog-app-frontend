import { NextResponse } from "next/server";


export function middleware(request) {

    const path = request.nextUrl.pathname;

}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup'
    ]
}