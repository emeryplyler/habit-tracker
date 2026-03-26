import { getDataFromToken } from "@/services/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/services/userService";

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const user = await getUserById(userID);
        return NextResponse.json(
            { message: "User found", user },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
