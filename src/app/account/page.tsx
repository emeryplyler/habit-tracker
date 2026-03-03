"use client"; // now this is a client component
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
    const router = useRouter();
    // loading
    const [loading, setLoading] = useState(true);

    // get account information
    const [user, setUser] = useState();
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me"); // retrieve user's information from api, which calls DB
        setUser(res.data.user._id);
        setLoading(false);
    };

    useEffect(() => {
        getUserDetails();
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
        </div>
    );
}
