import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/services/mailer";

connect();

// all operations on path /signup should be handled in this file

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, password, email } = reqBody;

        // does user already exist?
        const user = await UserModel.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "A user is already registered with that email" },
                { status: 400 }
            );
        }

        // hash password to store in db
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email
        });

        const savedUser = await newUser.save();

        // send verification email
        // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json(
            { message: "User created successfully", data: savedUser },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.errors },
            { status: 500 });
    }
}
