import mongoose from "mongoose";
import { habitSchema } from "./habitModel"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    habits: [habitSchema]
});

const User = mongoose.model("user", userSchema);

export default User;
