import React from "react";
import Link from "next/link";

const NavBar = () => {
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
