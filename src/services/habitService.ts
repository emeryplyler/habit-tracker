import { connect } from "@/dbConfig/dbConfig";
import { HabitModel } from "@/models/habitModel";
import UserModel from "@/models/userModel";
import { Habit } from "@/types/Habits";

connect();

// POST
export async function createHabit(newHabit: Habit) {
    const user = await UserModel.findById(newHabit.userId);

    if (!newHabit.userId || !user) {
        throw new Error("Couldn't verify user is logged in");
    }

    const newHabitModel = new HabitModel({
        name: newHabit.name,
        description: newHabit.description,
        frequency: newHabit.frequency,
        notes: newHabit.notes,
        difficulty: newHabit.difficulty,
        goalCount: newHabit.goalCount,
        completeCount: 0,
        user: newHabit.userId
    });

    // const savedHabit = await newHabit.save();
    await newHabitModel.save();

    // also insert new habit into user's habits array
    // const userUpdate = await UserModel.findByIdAndUpdate(userID, { $push: { habits: savedHabit._id } });
    user.habits.push(newHabitModel._id); // push to user's habits array
    await user.save(); // wait for user info to update
    // TODO: transaction

    return newHabitModel;
}

