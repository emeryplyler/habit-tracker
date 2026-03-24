import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/services/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findById(userID).select("-password"); // specify that we don't want password
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
