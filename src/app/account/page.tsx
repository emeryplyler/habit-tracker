"use client"; // now this is a client component
import axios from "axios";
import Link from "next/link";

export default function AccountPage() {
    
    const logout = () => {
        
    }
    
    return (
        <div>
            <h1>Account Settings</h1>
            <hr />
            <button onClick={logout}>Log Out</button>
        </div>
    )
}
