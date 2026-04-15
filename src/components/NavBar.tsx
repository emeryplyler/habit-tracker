"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname(); // get current pathname to trigger useEffect when it changes
    // fetch what user this is
    const [currentUser, setCurrentUser] = useState<any>(undefined);

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me"); // retrieve user's information from api, which calls DB
            setCurrentUser({ nickname: res.data.user.nickname });
        } catch (error: any) {
            setCurrentUser(undefined);
        }

    };

    useEffect(() => {
        // called when user tries to go to a different page
        // if user's login has expired, the navbar will update to show the logged-out version
        getUserDetails();
    }, [pathname]);

    const menuItems = [
        {
            name: "Sign Up",
            link: "/signup"
        },
        {
            name: "Log In",
            link: "/login"
        }
    ];

    const logout = async () => {
        try {
            await axios.get("/api/users/logout"); // send get request to this path
            toast.success("Logout successful");
            setCurrentUser(undefined);
            router.push("/login"); // redirect
        } catch (error: any) {
            toast.error("Couldn't log out - please try again later");
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.homeItems}>
                <Link href="/">
                    <img className="home-button" src="/home.svg" alt="Home" />
                </Link>
                <h1 className={styles.trackerTitle}>Habit Tracker</h1>
                <Link href="/about" className={styles.questionButton}>
                    <img className="question-button" src="/question.svg" alt="Help" />
                </Link>
            </div>

            <div className={styles.accountItems}>
                <div className={styles.currentUser}>
                    {currentUser && `Welcome, ${currentUser.nickname}`}
                </div>
                <ul>
                    {!currentUser && menuItems.map(item => {
                        return ( // loop through menuItems and display each
                            <li key={item.link}>
                                <Link href={item.link}>
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}

                </ul>
                {currentUser && (
                    <div className={styles.accountDropdown}>
                        <div className={styles.dropdownButton}>Account Settings ▼</div>
                        <div className={styles.dropdownContent}>
                            <Link href="/account">Preferences</Link>
                            <button onClick={logout}>Log Out</button>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default NavBar;
