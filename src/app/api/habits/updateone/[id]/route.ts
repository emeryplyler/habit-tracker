import { connect } from "@/dbConfig/dbConfig";
import { Habit } from "@/models/habitModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(request: NextRequest, { params }: { params: { id: string; }; }) {
    try {
        // retrieve habit id from path params
        const { id } = await params; // note: params requires await
        const updates = await request.json(); // retrieve updates from request body

        // validate object id; if not valid, don't bother querying
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid habit id" },
                { status: 400 }
            );
        }

        // validate update fields
        const allowedUpdates = ["name", "description", "frequency", "goalCount", "completeCount"];
        const invalidFields = Object.keys(updates).filter(key => !allowedUpdates.includes(key)); // filter out invalid fields
        if (invalidFields.length > 0) {
            return NextResponse.json(
                { error: `Invalid update fields: ${invalidFields.join(", ")}` },
                { status: 400 }
            );
        }

        // check if habit exists
        // use new: true to return document AFTER update is applied
        const updatedHabit = await Habit.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedHabit) {
            return NextResponse.json(
                { error: "Habit not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Habit updated successfully",
            data: updatedHabit
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
