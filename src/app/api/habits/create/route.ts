import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { Habit } from "@/models/habitModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        // use request body to fill in new habit parameters
        const reqBody = await request.json();
        const { name, description, frequency, notes, difficulty, goalCount } = reqBody;

        if (!userID) {
            return NextResponse.json(
                { error: "Couldn't verify user is logged in" },
                { status: 400 }
            );
        }

        const newHabit = new Habit({
            name,
            description, 
            frequency, 
            notes, 
            difficulty, 
            goalCount,
            completeCount: 0,
            user: userID
        });

        const savedHabit = await newHabit.save();

        return NextResponse.json(
            { message: "Habit created successfully", data: savedHabit },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
