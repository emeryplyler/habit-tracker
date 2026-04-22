import { NextRequest, NextResponse } from "next/server";
import * as habitService from "@/services/habitService";
import { Habit } from "@/types/Habits";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
    // id of habit is in params
    // the type of params is an object with a field called 'id' which is a string
    const { id } = await params;

    try {
        const habit = await habitService.getHabitById(id);

        await habitService.deleteHabit(habit, habit.userId);

        return NextResponse.json(
            { message: "Habit deleted"},
            { status: 200 }
        );

    } catch (error: any) {
        let status = 500;
        if (error.message === "Habit not found") {
            status = 404;
        } else if (error.message === "Invalid habit id" || error.message === "Not authorized to delete this habit") {
            status = 400;
        }
        return NextResponse.json(
            { error: error.message },
            { status: status }
        );
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
    // id of habit is in params
    // the type of params is an object with a field called 'id' which is a string
    const { id } = await params;

    try {
        const habit = await habitService.getHabitById(id);

        return NextResponse.json(
            { message: "Habit found", data: habit },
            { status: 200 }
        );

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

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
    try {
        // retrieve habit id from path params
        const { id } = await params; // note: params requires await
        // retrieve updates from request body
        const updates = await request.json();
        // call service function to apply updates
        const habitUpdates: Habit = {
            id,
            ...updates
        }

        const updatedHabit = await habitService.editHabit(habitUpdates);

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
