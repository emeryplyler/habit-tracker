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
        enum: freqValues // possible values: "daily", "weekly"
    },
    notes: String,
    difficulty: {
        type: Number, // will be set to an integer between 1 and 5 inclusive
        min: 1,
        max: 5
    },
    goalCount: {
        type: Number, // number of times user wants to complete goal this cycle (day or week)
        min: 1
    },
    completeCount: Number, // number of times user has completed goal this cycle
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "UserModel" // reference table that User schema is attached to
    }
});

const HabitModel = mongoose.model("habit", habitSchema);

export { HabitModel, habitSchema };
