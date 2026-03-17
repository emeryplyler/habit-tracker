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

        // prepare update operations object
        // for a request body like this: { name: "new name", completeCount: { increment: 1 } }
        // {
        //     $set: { name: "new name" },
        //     $inc: { completeCount: 1 }
        // }
        const updateOps: any = {};

        // validate update fields
        // updates should be sent as an object with fields as keys and modify values as values
        // e.g. { name: "new name", completeCount: { increment: 1 } }
        const allowedUpdates = ["name", "description", "frequency", "goalCount", "completeCount"];
        for (const [key, value] of Object.entries(updates)) {
            if (!allowedUpdates.includes(key)) {
                return NextResponse.json(
                    { error: `Invalid field: ${key}` },
                    { status: 400 }
                );
            }

            if (key === "completeCount" && typeof value === "object" && value !== null && "increment" in value) {
                // handle increment operation for completeCount
                // value is an object with a key "increment" and a number value
                // it's all to extract the increment value from the request body
                updateOps.$inc = { completeCount: (value as {increment: number}).increment }; // use $inc operator for increments
            } else {
                // directly set other fields
                if (!updateOps.$set) updateOps.$set = {};
                updateOps.$set[key] = value;
            }
        }

        // try to apply updates
        // use new: true to return document AFTER update is applied
        const updatedHabit = await Habit.findByIdAndUpdate(id, updateOps, { returnDocument: "after" });
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
