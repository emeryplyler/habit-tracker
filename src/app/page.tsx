"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import HabitsItem from "@/components/HabitsItem";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // instead of context, retrieve information from DB since we need to communicate with it anyway
  const [user, setUser] = useState();
  const [habits, setHabits] = useState<any[]>([]); // type is array of any

  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);

  const getHabits = async () => {
    try {
      // try to get current user
      const response = await axios.get("/api/users/me"); // retrieve user's information from api which calls DB
      setUser(response.data.user);
      // retrieve information about each habit
      // Use Promise.all to wait for all async operations
      const habitPromises = response.data.user.habits.map(async (id: any) => {
        const found = await axios.get(`/api/habits/${id}`);
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
      if (error.status === 400) {
        // toast.error("User not found - please log in");
        return;
      }
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

  };

  const getQuotes = async () => {
    // check if quotes are already in local storage and not expired
    try {
      const today = new Date();
      const storedQuote = localStorage.getItem("quote");
      const storedQuoteDateString = (localStorage.getItem("quoteDate"));
      const storedQuoteDate = storedQuoteDateString ? new Date(storedQuoteDateString) : null;

      // if quote is found and not expired, return it
      console.log("stored date:", storedQuoteDateString, ". today:", today.toDateString());
      if (storedQuote && storedQuoteDate && storedQuoteDate >= today) { // NOTE: do we need to specify Day specifically to compare?
        setQuote(JSON.parse(storedQuote));
        return;
      }

      // otherwise, find new quote and store 
      const response = await axios.get("/api/quote");

      // timeout?
      
      if (response.status !== 200) {
        throw new Error(`HTTP error with status ${response.status}`);
      }

      const newQuote = response.data.data[0]; // response is array of quote objects

      if (newQuote) {
        setQuote(newQuote);
        // Store in local storage with expiration time (e.g., 24 hours)
        const newQuoteDate = new Date();
        newQuoteDate.setDate(newQuoteDate.getDate() + 1);
        localStorage.setItem("quote", JSON.stringify(newQuote));
        localStorage.setItem("quoteDate", newQuoteDate.toISOString());
      }

    } catch (error) {
      // set default quote
      console.error("Error fetching quote:", error);
    }
  }

  useEffect(() => {
    getHabits(); // retrieve user's habits on page load
    getQuotes();
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
      // if update is successful, retrieve updated habit info to get updated goal status
      const response = await axios.get(`/api/habits/${habitId}`);
      setHabits(prevHabits =>
        prevHabits.map(habit => {
          if (habit._id === habitId) {
            return response.data.data; // update habit with new info from DB
          }
          return habit;
        })
      );
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
    const response = await axios.patch(`/api/habits/${habitId}`, { incrementCompleteCount: 1 }); // send increment value in request body
    if (response.status !== 200) {
      throw new Error("Failed to update habit online");
    }
  };

  return (
    <div className="homepage">
      <main className="homepage-main">
        {!loading && !user && (
          <div>
            <h1 className="homepage-title">Welcome to Habit Tracker!</h1>
            <p className="homepage-description">Keep track of your daily and weekly habits to build up routines. Log in, or sign up for free to get started!</p>
            <br />
            <img className="homepage-image" src="/homepage.png" alt="Homepage image" width={800} height={448} />
          </div>
        )}

        {!loading && user && quote && (
          <div className="quote">
            <p>{quote.q}</p>
            <p>- {quote.a}</p>
          </div>
        )}

        {!loading && user && !quote && (
          <div className="quote">
            <p>We are what we repeatedly do. Excellence, then, is not an act, but a habit.</p>
            <p>- Aristotle</p>
          </div>
        )}

        {user && (<div className="habits-bar">
          <h1>My habits for this week</h1>
          <Link className="new-habit-link" href="/newhabit">New habit</Link>
        </div>)}

        {loading && (<p>Loading...</p>)}

        {!loading && user && (
          <ul>
            {habits.length < 1 && (<div>No habits found</div>)}

            {habits.map(habit => {

              return (
                <HabitsItem
                  key={habit._id}
                  habit={habit}
                  incrementComplete={incrementCount}>
                </HabitsItem>
              );

            })}
          </ul>
        )}

      </main>
      <Toaster />
    </div>
  );
}
