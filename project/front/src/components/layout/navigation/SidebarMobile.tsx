import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from 'react'
import { NavLink, useLocation } from "react-router-dom";


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

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SidebarMobile({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: any }) {
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                        <span className="sr-only">Close sidebar</span>
                                        <i className="fa-regular fa-xmark text-2xl  text-gray-100"></i>
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                <div className="flex h-16 shrink-0 items-center justify-start gap-x-3">
                                    <i className="fa-regular fa-comments text-2xl"></i>
                                    <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">ChatXperience</div>
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
                                    </ul>
                                </nav>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}