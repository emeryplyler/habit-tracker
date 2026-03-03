"use client"

import React from "react";
import Link from "next/link";
import { useAppContext } from "@/context";

const NavBar = () => {
    let { currentUser } = useAppContext();
    
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
    ];

    return (
        <div className="navbar">
            <div>
                {currentUser ? `Currently logged in as ${currentUser.username}` : "Can't find username"}
            </div>
            <ul>
                {menuItems.map(item => {
                    return ( // loop through menuItems and display each
                        <li key={item.link}>
                            <Link href={item.link}>
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
};

export default NavBar;
