import { NavLink } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
    const { isAuthenticated, logoutUser } = useAuth();

// show the user's information from 
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
                        <div className="flex w-1/3 items-center justify-end px-4">
                            <div>

                            </div>
                            <div className="flex justify-end">
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