import { getDataFromToken } from "@/services/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { Habit } from "@/types/Habits";
import * as HabitService from "@/services/habitService";

export async function POST(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        // use request body to fill in new habit parameters
        const reqBody = await request.json();
        const { name, description, frequency, notes, difficulty, goalCount } = reqBody;

        const newHabit: Habit = {
            name,
            description,
            frequency,
            notes,
            difficulty,
            goalCount,
            userId: userID
        }

        const savedHabit = await HabitService.createHabit(newHabit);
        console.log("new habit created");

        return NextResponse.json(
            { message: "Habit created succesfully", data: savedHabit },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
