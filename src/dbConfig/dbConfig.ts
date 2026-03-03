import mongoose from "mongoose";

export async function connect() {
    try {
        console.log("Please wait, connecting to DB...")
        mongoose.connect(process.env.MONGO_URI!, { dbName: "habit_tracker" }); // ! is the non-null assertion operator; 'assuming this is not null'
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to DB");
        })

        connection.on("error", (err) => {
            console.log("Couldn't connect to DB: " + err);
        })
        
    } catch (error) {
        console.log("Couldn't connect to DB");
        console.log(error);
    }
}
