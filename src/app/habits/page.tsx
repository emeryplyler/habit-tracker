"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "@/context";
import User from "@/models/userModel";

export default function HabitsPage() {
    const router = useRouter(); // get router so we can redirect user

    const [loading, setLoading] = useState(true);

    // instead of context, retrieve information from DB since we need to communicate with it anyway
    const [user, setUser] = useState();
    const [habits, setHabits] = useState([]);

    const getHabits = async () => {
        const response = await axios.get("/api/users/me"); // retrieve user's information from api which calls DB
        setUser(response.data.user);
        setHabits(response.data.user.habits);
        setLoading(false);
    };

    /*
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me"); // retrieve user's information from api, which calls DB
        setUser(res.data.user._id);
        setLoading(false);
    };
    */

    useEffect(() => {
        getHabits(); // retrieve user's habits on page load
    }, []);

    return (
        <div>
            <h1>Habits</h1>
            <hr />
            {loading && "Loading..."}
            {!loading && (
                <ul>
                    {habits.length < 1 && (<div>No habits found</div>)}

                    {habits.map(habit => {
                        return (
                            <li>{habit}</li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
