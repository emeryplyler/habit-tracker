import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/services/getDataFromToken";
import { HabitModel } from "@/models/habitModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        // use request body to fill in new habit parameters
        const reqBody = await request.json();
        const { name, description, frequency, notes, difficulty, goalCount } = reqBody;
        const user = await User.findById(userID);

        if (!userID || !user) {
            return NextResponse.json(
                { error: "Couldn't verify user is logged in" },
                { status: 400 }
            );
        }

        const newHabit = new HabitModel({
            name,
            description,
            frequency,
            notes,
            difficulty,
            goalCount,
            completeCount: 0,
            user: userID
        });

        // const savedHabit = await newHabit.save();
        await newHabit.save();
        console.log("new habit: " + newHabit);
        // also insert new habit into user's habits array
        // const userUpdate = await User.findByIdAndUpdate(userID, { $push: { habits: savedHabit._id } });
        user.habits.push(newHabit._id); // push to user's habits array
        await user.save(); // wait for user info to update

        console.log("new user: " + user);

        return NextResponse.json(
            // { message: "Habit created successfully", data: savedHabit },
            { message: "Habit created succesfully", data: newHabit },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
