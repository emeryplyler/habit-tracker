import { connect } from "@/dbConfig/dbConfig";
import { HabitModel } from "@/models/habitModel";
import UserModel from "@/models/userModel";
import { Habit, goalStatuses } from "@/types/Habits";
import mongoose from "mongoose";

connect();

export async function getHabitById(habitId: string): Promise<Habit> {
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
        throw new Error("Invalid habit id");
    }

    const habit = await HabitModel.findById(habitId);
    if (!habit) {
        throw new Error("Habit not found");
    }


    // check current cycle progress and update completeCount if necessary
    const now = new Date();
    const cycleStart = habit.currentCycleStart;
    if (habit.frequency === "daily") {
        if (now.getDate() > cycleStart.getDate() || now.getMonth() > cycleStart.getMonth() || now.getFullYear() > cycleStart.getFullYear()) {
            // new day, reset completeCount and update cycleStart
            habit.completeCount = 0;
            habit.currentCycleStart = now;
            habit.currentCycleStart.setHours(0, 0, 0, 0); // set to start of today
            await habit.save();
        }
    } 
    // else if (habit.frequency === "weekly") {
    //     const dayOfWeek = now.getDay();
    //     const daysSinceLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    //     const mostRecentMonday = new Date(now.setDate(now.getDate() - daysSinceLastMonday)); // find the most recent monday
    //     if (mostRecentMonday > cycleStart) { // if most recent monday is after cycle start, then set cycle start to most recent monday and reset completeCount
    //         habit.completeCount = 0;
    //         habit.currentCycleStart = mostRecentMonday;
    //         habit.currentCycleStart.setHours(0, 0, 0, 0);
    //         await habit.save();
    //     }
    // }

    // calculate goal status after date update
    let goalStatus = goalStatuses.INCOMPLETE;
    if (habit.completeCount! === habit.goalCount!) {
        goalStatus = goalStatuses.COMPLETE;
    } else if (habit.completeCount! > habit.goalCount!) {
        goalStatus = goalStatuses.SURPASSED;
    }

    return {
        ...habit.toObject(),
        id: habit._id.toString(),
        userId: habit.user.toString(),
        goalStatus: goalStatus
    } as Habit;
}

export async function createHabit(newHabit: Habit): Promise<Habit> {
    const user = await UserModel.findById(newHabit.userId);

    if (!newHabit.userId || !user) {
        throw new Error("Couldn't verify user is logged in");
    }

    // TODO: validate newHabit fields
    // mongoose model already validates most fields

    // set currentCycleStart to last Monday for weekly, or today for daily
    let now = new Date();
    now.setHours(0, 0, 0, 0); // set to start of today for consistent cycle start times
    let currentCycleStart = new Date();
    currentCycleStart.setHours(0, 0, 0, 0); 
    if (newHabit.frequency === "weekly") {
        const dayOfWeek = now.getDay();
        const daysSinceLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // if Sunday (0), go back 6 days; otherwise, go back dayOfWeek - 1 days
        currentCycleStart.setDate(now.getDate() - daysSinceLastMonday);
    } 
    // else if (newHabit.frequency === "daily") {
    //     currentCycleStart.setHours(0, 0, 0, 0); // set to start of today
    // }

    const newHabitModel = new HabitModel({
        name: newHabit.name,
        description: newHabit.description,
        frequency: newHabit.frequency,
        notes: newHabit.notes,
        difficulty: newHabit.difficulty || 1,
        goalCount: newHabit.goalCount,
        completeCount: newHabit.completeCount || 0,
        user: newHabit.userId,
        currentCycleStart
    });

    await newHabitModel.save();

    // also insert new habit into user's habits array
    // const userUpdate = await UserModel.findByIdAndUpdate(userID, { $push: { habits: savedHabit._id } });
    user.habits.push(newHabitModel._id); // push to user's habits array
    await user.save(); // wait for user info to update
    // TODO: transaction

    return {
        ...newHabitModel.toObject(),
        id: newHabitModel._id.toString(),
        userId: newHabitModel.user.toString()
    } as Habit;
}

// for Habit objects, id and userId cannot be updated; if habitId is passed in, it's validated; if userId is passed in, it's ignored
// Cannot specify both completeCount update and increment in the same request
export async function editHabit(updates: Partial<Habit>): Promise<Habit> {
    // validate object id; if not valid, don't bother querying
    const habitId = updates.id as string;
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
        throw new Error("Invalid habit id");
    }

    const updateOps: any = {};

    // validate update fields
    // updates should be sent as an object with fields as keys and modify values as values
    let isIncrement = false;
    let isCompleteCountUpdate = false;
    const allowedUpdates = ["name", "description", "frequency", "notes", "difficulty", "goalCount", "completeCount", "incrementCompleteCount"];
    for (const [key, value] of Object.entries(updates)) {
        if (!allowedUpdates.includes(key)) {
            continue; // skip invalid fields
        }

        if (key === "incrementCompleteCount" && typeof value === "number") {
            // handle increment operation for completeCount
            updateOps.$inc = { completeCount: value }; // use $inc key for increments
            isIncrement = true;
        } else {
            if (key === "completeCount") {
                isCompleteCountUpdate = true;
            }
            // directly set other fields
            if (!updateOps.$set) updateOps.$set = {};
            updateOps.$set[key] = value;
        }
    }

    // validate
    if (isIncrement && isCompleteCountUpdate) {
        throw new Error("Cannot specify both completeCount update and increment in the same request");
    }

    // try to apply updates
    // use new: true to return document AFTER update is applied
    const updatedHabit = await HabitModel.findByIdAndUpdate(habitId, updateOps, { returnDocument: "after" });
    if (!updatedHabit) {
        throw new Error("Habit not found");
    }

    return {
        ...updatedHabit.toObject(),
        id: updatedHabit._id.toString(),
        userId: updatedHabit.user.toString()
    } as Habit;
}

export async function deleteHabit(delHabit: Habit, userId: string): Promise<void> {
    // check if user's current id matches habit's user id to verify ownership; if not, throw error
    if (delHabit.userId !== userId) {
        throw new Error("Not authorized to delete this habit");
    }
    const habitId = delHabit.id!.toString();
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
        throw new Error("Invalid habit id");
    }
    const habit = await HabitModel.findByIdAndDelete(habitId);
    if (!habit) {
        throw new Error("Habit not found");
    }

    // also remove habit from user's habits array
    const user = await UserModel.findById(habit.user);
    if (user) {
        // NOTE: if user is not found, this code won't run but the habit will still be deleted
        user.habits = user.habits.filter(hId => hId.toString() !== habitId);
        await user.save();
    }
}