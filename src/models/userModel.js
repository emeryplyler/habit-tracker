import mongoose from "mongoose";

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
    nickname: {
        type: String,
        required: [true, "Please enter a name"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    habits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HabitModel"
    }]
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
