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
            toast.error(error.message);
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.homeItems}>
                <Link className={styles.homeButton} href="/">
                    <picture>
                        <source srcSet="home.svg" media="(prefers-color-scheme: light)" />
                        <source srcSet="home_light.svg" media="(prefers-color-scheme: dark)" />
                        <img src="home_light.svg" />
                    </picture>
                </Link>
                <h1 className={styles.trackerTitle}>Habit Tracker</h1>
            </div>

            <div className={styles.accountItems}>
                <div className="current-user">
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
                    {currentUser && (
                        <div className={styles.accountDropdown}>
                            <button className={styles.accountButton}>Account Settings</button>
                            <div className={styles.dropdownContent}>
                                <Link href="/account">Preferences</Link>
                                <button onClick={logout}>Log Out</button>
                            </div>
                        </div>
                    )}
                </ul>
            </div>


        </div>
    );
};

export default NavBar;
