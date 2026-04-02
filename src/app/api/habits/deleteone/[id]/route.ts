import { NextRequest, NextResponse } from "next/server";
import * as habitService from "@/services/habitService";

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
