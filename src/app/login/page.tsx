"use client"; // decorator indicating client component - can now use react hooks ???
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    // create new stateful user object
    const [user, setUser] = React.useState({
        username: "",
        password: "",
    });

    // signup function called by sign up event
    const onLogin = async () => {

    };

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
        </div>
    );
}
