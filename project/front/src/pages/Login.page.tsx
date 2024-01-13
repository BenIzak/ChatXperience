import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername, clearUsername } from "../redux/slices/userSlice";
import { NavLink } from "react-router-dom";

import CompanyLogo from "@assets/icon/ChatXperienceLogo.svg";

export default function Login() {
    const [username, setUsernameLocal] = useState('');
    const dispatch = useDispatch();

    const saveUsername = () => {
        dispatch(setUsername(username));
        localStorage.setItem('username', username); // Optionnel si tu veux aussi le sauvegarder dans localStorage
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameLocal(e.target.value);
    };

    const logout = () => {
        dispatch(clearUsername()); // Supposant que tu as une action clearUsername
        localStorage.removeItem('username');
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center space-y-6 text-gray-600 text-center">

                <img src={CompanyLogo} alt="ChatXperience" className="w-24 h-24" />

                <h1 className="title-h1">ChatXperience</h1>
                <h2 className="title-h2">
                    Sign in to your account
                </h2>

            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            autoComplete="email"
                            required
                            onChange={handleInputChange}
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
                        <label htmlFor="email" className="absolute caption-primary text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            Email Address
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            autoComplete="password"
                            required
                            onChange={handleInputChange}
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="password" className="absolute caption-primary text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            Password
                        </label>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <NavLink to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn-primary w-full"
                            onClick={saveUsername}
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    test logout?{' '}
                    <NavLink to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={logout}>
                        logout
                    </NavLink>
                </p>
            </div>
        </div>
    );
}
