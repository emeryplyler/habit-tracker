import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { mode } = await request.json();

    const response = NextResponse.json({ success: true });
    response.cookies.set("mode", mode, { path: "/", maxAge: 60 * 60 * 24 * 30 }); // set cookie for light/dark mode

    return response;
}
