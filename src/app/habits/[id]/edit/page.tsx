"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

export default function HabitEditPage() {
    const { id } = useParams(); // params is a promise, so anything depending on params has to be in an async function
    // retrieve habit information from DB using id, then display it and allow user to edit it
    const [habit, setHabit] = useState<any>();
    const [loading, setLoading] = useState(true);

    const getHabit = async () => {
        try {
            const response = await axios.get(`/api/habits/getone/${id}`);
            if (response.status !== 200 || !response.data.data) {
                throw new Error("Habit not found");
            }

            setHabit(response.data.data);

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getHabit(); }, []); // retrieve habit on page load

    return (
        <div>
            <h1>Edit Habit</h1>
            {loading && <p>Loading...</p>}
            {habit && !loading && (
                <div>
                    <p>{habit.name}</p>
                    <p>{habit.description}</p>
                </div>
            )}
            {!habit && !loading && <p>Habit not found</p>}
        </div>
    );
}
