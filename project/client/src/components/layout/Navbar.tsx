import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, logoutUser } = useAuth();

    return (
        <>
            <header className="flex w-full items-center bg-wp-900 h-[8svh] px-4 lg:px-0">
                <div className="w-full px-0 lg:px-4">
                    <div className="relative  flex items-center justify-between">
                        <div className="w-1/3 px-4 flex items-center justify-start">
                            <NavLink to="/" className=" py-5 lg:py-3 flex items-center gap-2 hover:opacity-80 hover:scale-95 transition">
                                <h1 className="paragraph text-typo-reverse">ChatXperience</h1>
                            </NavLink>
                        </div>
                        <div className="w-1/3">
                            <button
                                onClick={() => setOpen(!open)}
                                className={` ${open && "navbarTogglerActive"
                                    } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] lg:hidden`}
                            >
                                <i className="fas fa-bars text-typo-reverse"></i>
                            </button>
                            <nav
                                className={`absolute right-4 top-full z-50 w-full max-w-[250px] justify-center rounded-lg bg-wp-800 px-6 py-5 shadow lg:static lg:flex lg:w-full lg:max-w-full lg:bg-transparent lg:py-0 lg:shadow-none ${!open && "hidden"
                                    } `}
                            >
                                <ul className="block lg:flex lg:gap-4 lg:items-center lg:justify-end">
                                    <ListItem link="/">Home</ListItem>
                                    <ListItem link="/">Chat</ListItem>
                                    {isAuthenticated && <ListItem link="/">Profile</ListItem>}
                                </ul>
                            </nav>
                        </div>
                        <div className="flex w-1/3 items-center justify-end px-4">
                            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                                <div className="flex justify-end">

                                    {isAuthenticated ? (

                                        <button onClick={logoutUser} className="inline-block whitespace-nowrap rounded-md border border-primary-400 px-4 py-2 text-base font-medium text-primary-400 transition hover:bg-primary-400 hover:text-white">
                                            Sign Out
                                        </button>
                                    ) : (
                                        <NavLink
                                            to="/login"
                                            className="inline-block whitespace-nowrap rounded-md border border-primary-400 px-4 py-2 text-base font-medium text-primary-400 transition hover:bg-primary-400 hover:text-white"
                                        >
                                            Sign In
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;

const ListItem = ({ children, link }: { children: React.ReactNode; link: string }) => {
    return (
        <li>
            <NavLink
                to={link}
                className="flex py-2 paragraph font-medium text-typo-reverse hover:opacity-80" >
                {children}
            </NavLink>
        </li >
    );
};