import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

// all operations on path /signup should be handled in this file

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, password, nickname } = reqBody;

        // // does user already exist?
        // const user = await UserModel.findOne({ username });
        // if (user) {
        //     return NextResponse.json(
        //         { error: "A user is already registered with that username" },
        //         { status: 400 }
        //     );
        // }

        // hash password to store in db
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            password: hashedPassword,
            nickname
        });

        await newUser.save();

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );

    } catch (error: any) {
        let errorMessage = error.message;
        let status = 500;
        if (error.code === 11000 && error.keyPattern.username) {
            errorMessage = "There's already a user registered with that username";
            status = 400;
        }
        return NextResponse.json({ error: errorMessage }, { status });
    }
}
