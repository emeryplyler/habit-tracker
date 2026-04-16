"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function HabitsPage() {
    const router = useRouter(); // get router so we can redirect user

    // instead of context, retrieve information from DB since we need to communicate with it anyway
    const [habit, setHabit] = useState({
        name: "",
        description: "",
        frequency: "",
        notes: "",
        difficulty: "",
        goalCount: "1",
    });

    // stateful var to enable button only when valid info entered
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(true);

    const submitNewHabit = async () => {
        try {
            // add new habit to db
            setLoading(true);
            const response = await axios.post("/api/habits/create", habit);
            // redirect user to habits
            toast.success("Habit created!");
            router.push("/");
            console.debug(response);
        } catch (error: any) {
            toast.error("Couldn't create habit, please try again later");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create New Habit</h1>
            <form action={submitNewHabit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    required
                    onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Description"
                    onChange={(e) => setHabit({ ...habit, description: e.target.value })}
                />

                <label>Frequency</label>
                <div>
                    <label>
                        {/* Note: technically, we don't need to put 'required' on both, since they're both name=frequency */}
                        <input type="radio" name="frequency" value="daily" required
                            onChange={(e) => setHabit({ ...habit, frequency: e.target.value })}
                        />
                        Daily
                    </label>
                    <label>
                        <input type="radio" name="frequency" value="weekly" required
                            onChange={(e) => setHabit({ ...habit, frequency: e.target.value })}
                        />
                        Weekly
                    </label>
                </div>

                <label htmlFor="notes">Notes</label>
                <textarea
                    id="notes"
                    placeholder="Notes"
                    onChange={(e) => setHabit({ ...habit, notes: e.target.value })}
                />

                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty" id="difficulty" required
                    onChange={(e) => setHabit({ ...habit, difficulty: e.target.value })}
                >
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
                    defaultValue={1}
                    onChange={(e) => setHabit({ ...habit, goalCount: e.target.value })}
                />

                <button type="submit">Submit</button>
            </form>

            <Toaster />
        </div>
    );
}
