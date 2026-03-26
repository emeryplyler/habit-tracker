import { NextRequest, NextResponse } from "next/server";
import { getHabitById } from "@/services/habitService";


export async function GET(request: NextRequest, { params }: { params: { id: string; }; }) {
    // id of habit is in params
    // the type of params is an object with a field called 'id' which is a string
    const { id } = await params;

    try {
        // const habit = await HabitModel.findById(id);
        // if (!habit) {
        //     return NextResponse.json(
        //         { error: "Habit not found" },
        //         { status: 404 }
        //     );
        // }
        const habit = await getHabitById(id);

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
