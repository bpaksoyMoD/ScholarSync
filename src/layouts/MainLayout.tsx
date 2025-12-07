import { Sidebar } from '@/components/Sidebar';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
    return (
        <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto relative">
                {/* Glass effect overlay for content area if needed, or just padding */}
                <div className="h-full w-full p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
