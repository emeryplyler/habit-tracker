"use client";

import React, { useEffect, useState } from "react";
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
            setCurrentUser({ username: res.data.user.username });
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
            name: "Home",
            link: "/"
        },
        {
            name: "Sign Up",
            link: "/signup"
        },
        {
            name: "Log In",
            link: "/login"
        }
    ];

    const menuItemsLoggedIn = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Account",
            link: "/account"
        },
        {
            name: "Habits",
            link: "/habits"
        }
    ];

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
        <div className={styles.navbar}>
            <div className="current-user">
                {currentUser && `Currently logged in as ${currentUser.username}`}
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
                {currentUser && menuItemsLoggedIn.map(item => {
                    return ( // loop through logged in menu items instead
                        <li key={item.link}>
                            <Link href={item.link}>
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
                {/* handle logout link using a button since there's no logout page */}
                {currentUser && (<button onClick={logout}>Log Out</button>)}
            </ul>

        </div>
    );
};

export default NavBar;
