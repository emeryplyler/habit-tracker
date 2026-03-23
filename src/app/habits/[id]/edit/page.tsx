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

    const updateHabit = async () => {
        // call db and update
    }

    useEffect(() => { getHabit(); }, []); // retrieve habit on page load

    return (
        <div>
            <h1>Edit Habit</h1>
            {loading && <p>Loading...</p>}
            {habit && !loading && (
                <form action={updateHabit}>
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name"
                        type="text"
                        value={habit.name}
                        required
                        onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={habit.description}
                        onChange={(e) => setHabit({ ...habit, description: e.target.value })}
                    />

                    <p>Frequency
                        <label>
                            <input type="radio" name="frequency" value="daily" checked={habit.frequency === "daily"} onChange={() => setHabit({ ...habit, frequency: "daily" })} />
                            Daily
                        </label>
                        <label>
                            <input type="radio" name="frequency" value="weekly" checked={habit.frequency === "weekly"} onChange={() => setHabit({ ...habit, frequency: "weekly" })} />
                            Weekly
                        </label>
                    </p>

                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        value={habit.notes}
                        onChange={(e) => setHabit({ ...habit, notes: e.target.value })}
                    />

                    <label htmlFor="difficulty">Difficulty</label>
                    <select name="difficulty" id="difficulty" value={habit.difficulty || ""} onChange={(e) => setHabit({ ...habit, difficulty: e.target.value })}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>

                    <label htmlFor="goal">Goal</label>
                    <p>How many times per cycle do you want to do this?</p>
                    <input
                        id="goal"
                        type="number"
                        value={habit.goalCount}
                        onChange={(e) => setHabit({ ...habit, goalCount: parseInt(e.target.value) })}
                    />

                    <button type="submit">Update Habit</button>
                </form>
            )}
            {!habit && !loading && <p>Habit not found</p>}
        </div>
    );
}
