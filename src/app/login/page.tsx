"use client"; // decorator indicating client component - can now use react hooks ???
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "@/context";

export default function LoginPage() {
    const router = useRouter(); // get router so we can redirect user
    // create new stateful user object
    const [user, setUser] = React.useState({
        username: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false); // technically not loading until page logic starts

    const { currentUser, setCurrentUser } = useAppContext();
    
    // log in function called when login button pressed
    const onLogin = async () => {
        try {
            setLoading(true); // hide behind loading screen
            const response = await axios.post("/api/users/login", user); // make axios post request to our api using entered username and password
            if (response.status !== 200 || !response.data.data) {
                throw new Error("Login failed - please check your credentials and try again");
            }
            // if post request fails, will enter catch statement; otherwise, this:
            toast.success("Login successful");
            // set current user in context to display later on:
            setCurrentUser({ ...currentUser, username: response.data.data.username });
            router.push("/"); // redirect user to homepage, now logged in
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true); // data invalid; disable submit button
        }
    })

    return (
        <div>
            <h1>Log In</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                value={user.username}
                // when the value of input is changed, call setUser; keep prev user values ..., change username (spread operator)
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />

            <button
                // when button clicked, call onSignup function
                onClick={onLogin}
            >
                Log In
            </button>

            <Link href={"/signup"}>Create an account</Link>
            <Toaster />
        </div>
    );
}
