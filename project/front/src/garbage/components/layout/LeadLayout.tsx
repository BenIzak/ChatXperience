import { lazy, useState } from 'react';

// add async import

const SidebarMobile = lazy(() => import('@/components/layout/navigation/SidebarMobile'));
const SidebarDesktop = lazy(() => import('@/components/layout/navigation/SidebarDesktop'));
const TopNavigation = lazy(() => import('@/components/layout/navigation/TopNavigation'));


export default function LeadLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <SidebarMobile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <SidebarDesktop />
            <TopNavigation setSidebarOpen={setSidebarOpen} />
        </>
    );
}