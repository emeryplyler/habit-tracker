"use client"; // now this is a client component
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";

export default function AccountPage() {
    const router = useRouter();
    // loading
    const [loading, setLoading] = useState(true);
    // context
    const { setCurrentUser } = useAppContext();

    // get account information
    const [user, setUser] = useState();
    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me"); // retrieve user's information from api, which calls DB
            setUser(res.data.user._id);
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
    }, []);

    // logout button function
    const logout = async () => {
        try {
            await axios.get("/api/users/logout"); // send get request to this path
            toast.success("Logout successful");
            setCurrentUser(undefined);
            router.push("/"); // redirect to homepage
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1>Account Settings</h1>
            <div>
                {loading ? "Loading..." : (<>
                    <hr />
                    <h2>{user ? <Link href={`/account/${user}`}>Profile</Link> : "No user found"}</h2>
                    <hr />
                    <button onClick={logout}>Log Out</button>
                </>)}
            </div>
            <Toaster />
        </div>
    );
}
