"use client";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function AboutPage() {

    return (
        <div>
            <h1>About</h1>
            <div>
                <p>this is the about page</p>
            </div>
            <Toaster />
        </div>
    );
}
