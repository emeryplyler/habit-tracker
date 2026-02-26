import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );
        // NextResponse can interact with cookies
        response.cookies.set("token", "", { // sets to nothing, expires immediately
            httpOnly: true,
            expires: new Date(0)
        });
        return response; // report back to client
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
