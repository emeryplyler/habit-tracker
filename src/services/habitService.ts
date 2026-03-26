import { connect } from "@/dbConfig/dbConfig";
import { HabitModel } from "@/models/habitModel";
import UserModel from "@/models/userModel";
import { Habit } from "@/types/Habits";
import mongoose from "mongoose";

connect();

// POST
export async function createHabit(newHabit: Habit) {
    const user = await UserModel.findById(newHabit.userId);

    if (!newHabit.userId || !user) {
        throw new Error("Couldn't verify user is logged in");
    }

    // TODO: validate newHabit fields

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

export async function editHabit(habitId: string, updates: Partial<Habit>) {
    // validate object id; if not valid, don't bother querying
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
        throw new Error("Invalid habit id");
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
    const allowedUpdates = ["name", "description", "frequency", "notes", "difficulty", "goalCount", "completeCount"];
    for (const [key, value] of Object.entries(updates)) {
        if (!allowedUpdates.includes(key)) {
            continue; // skip invalid fields
        }

        if (key === "completeCount" && typeof value === "object" && value !== null && "increment" in value) {
            // handle increment operation for completeCount
            // value is an object with a key "increment" and a number value
            // it's all to extract the increment value from the request body
            updateOps.$inc = { completeCount: (value as { increment: number; }).increment }; // use $inc key for increments
        } else {
            // directly set other fields
            if (!updateOps.$set) updateOps.$set = {};
            updateOps.$set[key] = value;
        }
    }

    // try to apply updates
    // use new: true to return document AFTER update is applied
    const updatedHabit = await HabitModel.findByIdAndUpdate(habitId, updateOps, { returnDocument: "after" });
    if (!updatedHabit) {
        throw new Error("Habit not found");
    }

    return updatedHabit;
}
