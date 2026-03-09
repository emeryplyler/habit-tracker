"use client"

import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

const NavBar = () => {
    const router = useRouter();
    // fetch what user this is
    let { currentUser, setCurrentUser } = useAppContext();

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me"); // retrieve user's information from api, which calls DB
        setCurrentUser({ username: res.data.user.username });
    };

    useEffect(() => {
        getUserDetails();
    }, []);
    
    const menuItems = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Account",
            link: "/account"
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
    ]

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
        <div className="navbar">
            <div>
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
