import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { User } from "@/types/Users";

connect();

export async function getUserById(userId: string): Promise<User> {
    const user = await UserModel.findById(userId).select("-password"); // specify that we don't want password
    if (!user) {
        throw new Error("User not found");
    }

    return {
        username: user.username,
        nickname: user.nickname,
        habits: user.habits.map(habit => habit.toString()), // convert ObjectIds to strings
        id: user._id.toString()
    } as User;
}
