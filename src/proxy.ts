import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// token validation function
function isValidToken(token: string) {
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return true;
    } catch (error) {
        return false;
    }
}

export function proxy(request: NextRequest) {
    // return NextResponse.redirect(new URL("/", request.url))

    const path = request.nextUrl.pathname; // get current location

    const isPublicPath = path === "/login" || path === "/signup" || path === "/";

    const token = request.cookies.get("token")?.value || "";
    const validToken = isValidToken(token);

    if (isPublicPath && validToken) { // NOTE: for some reason, if you take out the '&& token' part it doesn't redirect correctly and firefox won't show it to me
        // user can visit public path
        if (path != "/") {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
    }

    if (!isPublicPath && !validToken) {
        // user is not logged in, so they can't visit this path; prompt user to log in
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/account",
        "/account/:id*",
        "/login",
        "/signup",
        "/habits",
        "/habits/:id*"
    ]
};
