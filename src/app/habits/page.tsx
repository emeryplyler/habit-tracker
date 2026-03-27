"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import HabitsItem from "../../components/HabitsItem";

export default function HabitsPage() {
    const router = useRouter(); // get router so we can redirect user

    const [loading, setLoading] = useState(true);

    // instead of context, retrieve information from DB since we need to communicate with it anyway
    const [user, setUser] = useState();
    const [habits, setHabits] = useState<any[]>([]); // type is array of any

    const getHabits = async () => {
        try {
            // try to get current user
            const response = await axios.get("/api/users/me"); // retrieve user's information from api which calls DB
            if (response.status === 400) {
                toast.error("User not found - please re-log in");
                return;
            }
            setUser(response.data.user);
            // retrieve information about each habit
            // Use Promise.all to wait for all async operations
            const habitPromises = response.data.user.habits.map(async (id: any) => {
                const found = await axios.get(`/api/habits/getone/${id}`);
                // if habit is successfully found, return it, otherwise return null
                return found.status === 200 && found.data.data ? found.data.data : null;
            });
            // wait for all habit retrievals to complete
            const habitResults = await Promise.all(habitPromises);
            // Filter out nulls and set habits
            const validHabits = habitResults.filter(habit => habit !== null);
            setHabits(validHabits);
            setLoading(false); // finish loading
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

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

    const incrementCount = async (habitId: string) => {
        // Optimistically update local state
        setHabits(prevHabits =>
            prevHabits.map(habit => {
                if (habit._id === habitId) {
                    return { ...habit, completeCount: habit.completeCount + 1 };
                }
                return habit;
            })
        );

        try {
            await incrementCountDB(habitId); // Wait for DB update
            toast.success("Good work!");
        } catch (error) {
            // Revert local state on failure
            setHabits(prevHabits =>
                prevHabits.map(habit => {
                    if (habit._id === habitId) {
                        return { ...habit, completeCount: habit.completeCount - 1 };
                    }
                    return habit;
                })
            );
            toast.error("Failed to update habit online");
        }
    };

    const incrementCountDB = async (habitId: string) => {
        // update completeCount in DB by sending increment value
        const response = await axios.patch(`/api/habits/updateone/${habitId}`, { incrementCompleteCount: 1 }); // send increment value in request body
        if (response.status !== 200) {
            throw new Error("Failed to update habit online");
        }
    };

    const deleteHabit = async (habitId: string) => {
        toast.success("delete habit");
    }

    return (
        <div>
            <h1>Habits</h1>
            <Link href="/newhabit">New habit</Link>
            <hr />
            {loading && "Loading..."}
            {!loading && (
                <ul>
                    {habits.length < 1 && (<div>No habits found</div>)}

                    {habits.map(habit => {

                        return (
                            <HabitsItem
                                key={habit._id}
                                name={habit.name}
                                description={habit.description}
                                frequency={habit.frequency}
                                goalCount={habit.goalCount}
                                completeCount={habit.completeCount}
                                habitId={habit._id}
                                incrementComplete={incrementCount}
                                deleteHabit={deleteHabit}
                                goalStatus={habit.goalStatus}>
                            </HabitsItem>
                        );

                    })}
                </ul>
            )}
            <Toaster />
        </div>
    );
}
