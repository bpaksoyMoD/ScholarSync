import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, ListTodo, GraduationCap, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
    const { t } = useTranslation();

    const navItems = [
        { icon: LayoutDashboard, label: t('dashboard'), path: '/' },
        { icon: ListTodo, label: t('tracker'), path: '/tracker' },
        { icon: GraduationCap, label: t('coach'), path: '/coach' },
        { icon: User, label: t('profile'), path: '/profile' },
    ];

    return (
        <aside className="w-64 h-full bg-white/10 backdrop-blur-md border-r border-white/20 flex flex-col p-4 text-white">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">ScholarSync</span>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-white/20 shadow-lg text-white"
                                    : "hover:bg-white/10 text-white/70 hover:text-white"
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-white/10">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>
            </div>
        </aside>
    );
}
