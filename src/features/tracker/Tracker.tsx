import { useState } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { Plus, MoreHorizontal, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

type Status = 'researching' | 'in-progress' | 'submitted';

interface Application {
    id: string;
    university: string;
    deadline: string;
    status: Status;
    logo?: string;
}

const initialApps: Application[] = [
    { id: '1', university: 'Stanford University', deadline: '2024-01-05', status: 'in-progress' },
    { id: '2', university: 'MIT', deadline: '2024-01-01', status: 'researching' },
    { id: '3', university: 'Harvard University', deadline: '2024-01-01', status: 'submitted' },
    { id: '4', university: 'UC Berkeley', deadline: '2023-11-30', status: 'researching' },
];

export default function Tracker() {
    const [applications, setApplications] = useState<Application[]>(initialApps);

    const columns: { id: Status; label: string; color: string }[] = [
        { id: 'researching', label: 'Researching', color: 'bg-blue-500/20 text-blue-300' },
        { id: 'in-progress', label: 'In Progress', color: 'bg-yellow-500/20 text-yellow-300' },
        { id: 'submitted', label: 'Submitted', color: 'bg-green-500/20 text-green-300' },
    ];

    const moveApp = (id: string, newStatus: Status) => {
        setApplications(apps => apps.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Application Tracker</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Application
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
                {columns.map((col) => (
                    <div key={col.id} className="flex flex-col h-full bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <span className={cn("w-2 h-2 rounded-full", col.id === 'researching' ? 'bg-blue-400' : col.id === 'in-progress' ? 'bg-yellow-400' : 'bg-green-400')} />
                                {col.label}
                            </h3>
                            <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                                {applications.filter(a => a.status === col.id).length}
                            </span>
                        </div>

                        <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                            {applications
                                .filter((app) => app.status === col.id)
                                .map((app) => (
                                    <GlassCard
                                        key={app.id}
                                        className="p-4 hover:bg-white/10 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-white">{app.university}</h4>
                                            <button className="text-white/40 hover:text-white">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
                                            <Calendar className="w-3 h-3" />
                                            <span>Due {app.deadline}</span>
                                        </div>

                                        <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {col.id !== 'researching' && (
                                                <button
                                                    onClick={() => moveApp(app.id, 'researching')}
                                                    className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20"
                                                >
                                                    ←
                                                </button>
                                            )}
                                            {col.id !== 'submitted' && (
                                                <button
                                                    onClick={() => moveApp(app.id, col.id === 'researching' ? 'in-progress' : 'submitted')}
                                                    className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 ml-auto"
                                                >
                                                    Move Next →
                                                </button>
                                            )}
                                        </div>
                                    </GlassCard>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
