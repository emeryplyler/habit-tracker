import mongoose from "mongoose";

const freqValues = ["daily", "weekly"];

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name for the habit"]
    },
    description: String,
    frequency: {
        type: String,
        enum: freqValues, // possible values: "daily", "weekly"
        required: [true, "Please select a frequency for the habit"]
    },
    notes: String,
    difficulty: {
        type: Number, // will be set to an integer between 1 and 5 inclusive
        min: 1,
        max: 5
    },
    goalCount: {
        type: Number, // number of times user wants to complete goal this cycle (day or week)
        min: 1,
        required: [true, "Please enter a goal for the habit"]
    },
    completeCount: Number, // number of times user has completed goal this cycle
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "UserModel", // reference table that User schema is attached to
        required: true
    },
    currentCycleStart: { // date when current cycle started, used to determine if cycle has reset
        type: Date,
        required: true
    }
});

const HabitModel = mongoose.model("habit", habitSchema);

export { HabitModel, habitSchema };
