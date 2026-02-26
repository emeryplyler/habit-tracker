"use client"; // now this is a client component
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/users/logout"); // send get request to this path
            toast.success("Logout successful");
            router.push("/"); // redirect to homepage
        } catch (error: any) {
            toast.error(error.message);
        }
    }
    
    return (
        <div>
            <h1>Account Settings</h1>
            <hr />
            <button onClick={logout}>Log Out</button>
        </div>
    )
}
