import { connect } from "@/dbConfig/dbConfig";
import { HabitModel } from "@/models/habitModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { editHabit } from "@/services/habitService";

connect();

export async function PATCH(request: NextRequest, { params }: { params: { id: string; }; }) {
    try {
        // retrieve habit id from path params
        const { id } = await params; // note: params requires await
        // retrieve updates from request body
        const updates = await request.json();
        // call service function to apply updates
        const updatedHabit = await editHabit(id, updates);

        return NextResponse.json({
            message: "Habit updated successfully",
            data: updatedHabit
        }, { status: 200 });

    } catch (error: any) {
        let status = 500;
        if (error.message === "Habit not found") {
            status = 404;
        } else if (error.message === "Invalid habit id") {
            status = 400;
        }

        return NextResponse.json(
            { error: error.message },
            { status: status }
        );
    }
}
