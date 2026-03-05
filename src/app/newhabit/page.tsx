"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "@/context";
import User from "@/models/userModel";

export default function HabitsPage() {
    const router = useRouter(); // get router so we can redirect user

    // instead of context, retrieve information from DB since we need to communicate with it anyway
    const [user, setUser] = useState();
    const [habits, setHabits] = useState([]);

    const submitNewHabit = async () => {
        // add new habit to db
        // toast
        // redirect user to /habits
    };

    /*
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me"); // retrieve user's information from api, which calls DB
        setUser(res.data.user._id);
        setLoading(false);
    };
    */

    return (
        <div>
            <h1>New Habit</h1>
            <hr />
            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                placeholder="Name"
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                placeholder="Description"
            />

            <p>Frequency
                <label>
                    <input type="radio" name="frequency" value="daily" />
                    Daily
                </label>
                <label>
                    <input type="radio" name="frequency" value="weekly" />
                    Weekly
                </label>
            </p>

            <label htmlFor="notes">Notes</label>
            <textarea
                id="notes"
                placeholder="Notes"
            />

            <label htmlFor="difficulty">Difficulty</label>
            <input
                id="difficulty"
                type="text"
                placeholder="1"
            />

            <label htmlFor="goal">Goal</label>
            <p>How many times per cycle do you want to do this?</p>
            <input
                id="goal"
                type="number"
                placeholder="1"
            />

            <input type="submit" value="Submit" />
        </div>
    );
}
