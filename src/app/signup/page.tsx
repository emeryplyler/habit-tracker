"use client"; // decorator indicating client component - can now use react hooks ???
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    // create new stateful user object
    const [user, setUser] = React.useState({
        username: "",
        password: "",
        email: ""
    });
    // stateful var to track button status
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    // signup function called by sign up event
    const onSignup = async () => {
        try {
            setLoading(true); // hide behind loading screen
            const response = await axios.post("/api/users/signup", user); // make post request to api using stateful object var
            toast.success("Signup successful!");
            router.push("/"); // redirect user to home page
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length> 0 && user.username.length > 0) {
            setButtonDisabled(false); // enable button
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div>
            <h1>Create an account</h1>
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

            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />

            <button
                // when button clicked, call onSignup function
                onClick={onSignup}
                className="signUpButton"
            >
                {/* TODO: make this just gray out the button instead of changing text */}
                {/* {buttonDisabled ? "No signup" : "Sign Up"}  */}
                Sign Up
            </button>

            <Link href={"/login"}>Log in instead</Link>
        </div>
    );
}
