import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL("/", request.url))

    const path = request.nextUrl.pathname; // get current location

    const isPublicPath = path === "/login" || path === "/signup";

    const token = request.cookies.get("token")?.value || ""; // is user logged in? token will either equal nothing (logged out) or the token (logged in)

    if (isPublicPath && token) { // NOTE: for some reason, if you take out the '&& token' part it doesn't redirect correctly and firefox won't show it to me
        // user can visit public path
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token) {
        // user is not logged in, so they can't visit this path; prompt user to log in
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/",
        "/account",
        "/account/:id*",
        "/login",
        "/signup"
    ]
};
