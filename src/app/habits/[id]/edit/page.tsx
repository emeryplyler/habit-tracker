"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

export default function HabitEditPage() {
    const { id } = useParams(); // params is a promise, so anything depending on params has to be in an async function
    // retrieve habit information from DB using id, then display it and allow user to edit it
    const [habit, setHabit] = useState<any>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const getHabit = async () => {
        try {
            const response = await axios.get(`/api/habits/${id}`);
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
        try {
            const response = await axios.patch(`/api/habits/${id}`, habit);
            
            router.push("/"); // redirect to habits page after update
            toast.success("Habit updated successfully");
        } catch (error: any) {
            toast.error("Failed to update habit: " + error.response.data.error);
        }
    }

    const deleteHabit = async () => {
        try {
            const response = await axios.delete(`/api/habits/${id}`);

            router.push("/"); // redirect to habits page after deletion
            toast.success("Habit deleted successfully");
        } catch (error: any) {
            toast.error("Failed to delete habit: " + error.response.data.error);
        }
    }

    useEffect(() => { getHabit(); }, []); // retrieve habit on page load

    return (
        <div className="habit-edit-page">
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
                        value={habit.description || ""}
                        onChange={(e) => setHabit({ ...habit, description: e.target.value })}
                    />

                    <label>Frequency</label>
                    <div>
                        <label>
                            <input type="radio" name="frequency" value="daily" checked={habit.frequency === "daily"} onChange={() => setHabit({ ...habit, frequency: "daily" })} />
                            Daily
                        </label>
                        <label>
                            <input type="radio" name="frequency" value="weekly" checked={habit.frequency === "weekly"} onChange={() => setHabit({ ...habit, frequency: "weekly" })} />
                            Weekly
                        </label>                        
                    </div>

                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        value={habit.notes || ""}
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
                        value={habit.goalCount || 0}
                        onChange={(e) => setHabit({ ...habit, goalCount: parseInt(e.target.value) })}
                    />

                    <div className="buttons">
                        <button type="submit">Update Habit</button>
                        <button type="button" onClick={deleteHabit}>Delete</button>
                    </div>

                </form>
            )}
            {!habit && !loading && <p>Habit not found</p>}
        </div>
    );
}
