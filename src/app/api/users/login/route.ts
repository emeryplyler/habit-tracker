import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, password } = reqBody; // get email and password from request body

        // does user exist?
        const user = await UserModel.findOne({ username });
        if (!user) {
            return NextResponse.json(
                { error: "No user found with that username" },
                { status: 400 }
            );
        }

        // is password correct?
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (!passwordIsCorrect) {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 400 }
            );
        }

        // create token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" }); // sign token
        const response = NextResponse.json( // create response
            { message: "Login successful", data: user },
            { status: 200 } // NOTE: if you never provide either success: true or { status: 200 } or the like, next doesn't recognize this function as an http method
        );
        response.cookies.set("token", token, { // set the cookie in client's browser
            httpOnly: true,
        });

        return response; // response is finished; notify client by sending the response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 }); // server-side error
    }
}
