import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-types
export default function TopNavigation({ setSidebarOpen }: { setSidebarOpen: Function }) {
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const username = useSelector((state: any) => state.user.name) || 'unknown';

    return (
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <i className="fa-solid fa-bars"></i>
            </button>
            <div className="flex-1 text-xl font-semibold leading-6 text-gray-900">{location.pathname.replace('/', '')}</div>
            <NavLink to="/profile" className="flex items-center gap-x-2">
                <i className="fa-regular fa-circle-user text-2xl"></i>
                <span className="flex-1 text-xl font-semibold leading-6 text-gray-900">{username}</span>
            </NavLink>
            <button type="button" className=" rounded text-gray-900"
            // onClick={logout}
            >
                <i className="fa-regular fa-sign-out-alt text-2xl"></i>
            </button>
        </div>
    )
}