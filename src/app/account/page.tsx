"use client"; // now this is a client component
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/Users";

export default function AccountPage() {
    const router = useRouter();
    // loading
    const [loading, setLoading] = useState(true);

    // get account information
    const [user, setUser] = useState<User | null>(null);
    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me"); // retrieve user's information from api, which calls DB
            const currentUser: User = res.data.user;
            setUser(currentUser);
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                toast.error("User not found - redirecting to login page");
                setTimeout(() => {
                    router.push("/login");
                }, 3000);

            } else {
                toast.error(error.message);
            }

        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        getUserDetails(); // retrieve user info on page load
        setIsDarkMode(document.body.classList.contains("dark-mode")); // set dark mode after page load
    }, []);

    // logout button function
    const logout = async () => {
        try {
            await axios.get("/api/users/logout"); // send get request to this path
            toast.success("Logout successful");
            router.push("/"); // redirect to homepage
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    // handle light/dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = async () => {
        let body = document.body;
        const mode = isDarkMode;
        if (mode) {
            body.classList.remove("dark-mode");
            setIsDarkMode(false);
        } else {
            body.classList.add("dark-mode");
            setIsDarkMode(true);
        }
        // send inverted mode to api
        await axios.post("/api/setmode", { mode: mode? "light" : "dark" }); // send new mode to api to set cookie
    };

    return (
        <div>
            <h1>Account Settings</h1>
            <div>
                {loading ? "Loading..." : (<>
                    <hr />
                    <h2>{user ? <Link href={`/account/${user.id}`}>Profile</Link> : "No user found"}</h2>
                    <hr />
                    <button onClick={toggleDarkMode}>Change color scheme</button>
                    <p>{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
                    <button onClick={logout}>Log Out</button>
                </>)}
            </div>
            <Toaster />
        </div>
    );
}
