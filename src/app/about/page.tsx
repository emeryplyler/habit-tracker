"use client";

import { Toaster } from "react-hot-toast";
import styles from "@/styles/AboutPage.module.css";
import Link from "next/link";

export default function AboutPage() {

    return (
        <div className={styles.aboutPage}>
            <div className={styles.piece}>
                <h1>Welcome to Habit Tracker!</h1>
                <p>
                    This is a free, lightweight online tool to help you keep track of all your daily and weekly tasks to build up healthy habits.
                    You can add habits, set goals, and then check them off when you complete them.
                </p>
                <p>
                    When creating a habit, you can add additional information like a description, notes, and difficulty level to help you stay motivated.
                </p>
            </div>
            <div className={styles.piece}>
                <h2>About</h2>
                <p>
                    This open-source app was built using Node.js and the Next.js framework, with a MongoDB database for storing habit and user information.
                    The frontend was built with React and styled using CSS modules and Tailwind, and the app is being hosted on Vercel.
                </p>
            </div>
            <Link href="https://github.com/emeryplyler/habit-tracker">
                <img className="repo-button" src="/git.svg" alt="GitHub Repository" width="50px" height="50px" />
            </Link>
            <Toaster />
        </div>
    );
}
