import { connect } from "@/dbConfig/dbConfig";
import { Habit } from "@/models/habitModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest, { params }: { params: { id: mongoose.ObjectId; }; }) {
    // id of habit is in params
    // the type of params is an object with a field called 'id' which is a string
    const { id } = await params;

    try {
        const habit = await Habit.findById(id);

        return NextResponse.json(
            { message: "Habit found", data: habit },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
