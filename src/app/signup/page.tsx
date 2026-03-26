"use client"; // decorator indicating client component - can now use react hooks ???
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    // create new stateful user object
    const [user, setUser] = React.useState({
        username: "",
        password: "",
        email: ""
    });

    const [loading, setLoading] = React.useState(false);

    // signup function called by sign up event
    const onSignup = async () => {
        try {
            setLoading(true); // hide behind loading screen
            await axios.post("/api/users/signup", user); // make post request to api using stateful object var

            router.push("/login"); // redirect user to login page
            toast.success("Signup successful!");
        } catch (error: any) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create an account</h1>
            <hr />
            <form action={onSignup}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    // when the value of input is changed, call setUser; keep prev user values ..., change username (spread operator)
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    required
                />

                {/* TODO: replace the button with "Loading..." when loading */}
                {!loading && (
                    <button className="signUpButton">
                        Sign Up
                    </button>
                )}

                {loading && <p>Loading...</p>}

            </form>
            <Link href={"/login"}>Log in instead</Link>
            <Toaster />
        </div>
    );
}
