import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store";
import CompanyLogo from "@assets/icon/ChatXperienceLogo.svg";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


interface NavItemsProps {
    name: string;
    href: string;
    icon: string;
}

interface ChatItemsProps {
    name: string;
    href: string;
    icon: string;
}

function NavItems({ name, href, icon }: NavItemsProps) {
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname === href);

    useEffect(() => {
        setCurrent(location.pathname === href);
    }, [location, href]);

    console.log(name, current);
    return (
        <li key={name} className="w-full">
            <NavLink
                to={href}
                className={classNames(
                    current
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'w-full group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold justify-start items-center'
                )}
            >
                <i
                    className={classNames(
                        current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                        'shrink-0 text-xl',
                        icon ? icon : 'fas fa-home'
                    )}
                    aria-hidden="true"
                />
                {name}
            </NavLink>
        </li>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ChatItems({ name, href, icon }: ChatItemsProps) {
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname === href);

    useEffect(() => {
        setCurrent(location.pathname === href);
    }, [location, href]);

    return (
        <li key={name}>
            <NavLink
                to={href}
                className={classNames(
                    current
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'group flex items-center justify-start gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                )}
            >
                <i
                    className={classNames(
                        current
                            ? 'text-indigo-600 '
                            : 'text-gray-400  group-hover:text-indigo-600',
                        'flex items-center justify-center text-2xl font-medium',
                        icon ? icon : 'fas fa-home'
                    )}
                >
                </i>
                <span className="truncate">{name}</span>
            </NavLink>
        </li>
    )
}

export default function SidebarDesktop() {
    const username = useSelector((state: RootState) => state.user.name) || 'unknown';

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                <div className="flex h-16 shrink-0 items-center justify-start gap-x-3 font-bold select-none">
                    <img src={CompanyLogo} alt="ChatXperience" className="w-8 h-8" />
                    <div className="flex-1 paragraph text-gray-900">ChatXperience</div>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                <NavItems name="Home" href="/home" icon="fas fa-home" />
                                <NavItems name="Chat" href="/chat" icon="fa-duotone fa-messages" />
                                <NavItems name="Dashboard" href="/dashboard" icon="fa-solid fa-chart-column" />
                            </ul>
                        </li>
                        {/* <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">Recent chats</div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                <ChatItems name="Samuel" href="/" icon="fa-solid fa-face-party" />
                                <ChatItems name="groupe de travail" href="/" icon="fa-solid fa-people-group" />
                            </ul>
                        </li> */}
                        <li className="-mx-6 mt-auto flex items-center justify-between px-6 py-3 border-t b 
                         border-gray-500">
                            <span
                                className="flex items-center gap-x-4 font-semibold leading-6 text-gray-900 cursor-pointer"
                            >
                                <i className="fa-regular fa-circle-user text-2xl"></i>
                                <span className="sr-only">Your profile</span>
                                <span aria-hidden="true">{username}</span>
                            </span>
                            <button type="button" className=" text-gray-900"
                            // onClick={logout}
                            >
                                <i className="fa-regular fa-sign-out-alt text-2xl"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}