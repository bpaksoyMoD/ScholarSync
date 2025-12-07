import { GlassCard } from '@/components/GlassCard';
import { Bell, Calendar, Mail } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Good Afternoon, Student</h1>
                    <p className="text-white/60">Here is your daily briefing.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            fetch('/api/deadlines/scan', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ url: 'https://example.com' })
                            })
                                .then(res => res.json())
                                .then(data => alert('Scan Complete: ' + JSON.stringify(data.data.dates)))
                                .catch(err => alert('Scan Failed: ' + err));
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2"
                    >
                        <Calendar className="w-4 h-4" />
                        Scan Deadlines
                    </button>
                    <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <Bell className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard delay={0.1} className="relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Calendar className="w-24 h-24 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-400" /> Upcoming Deadlines
                    </h3>
                    <div className="space-y-3 mt-4">
                        <div className="flex justify-between items-center text-sm">
                            <span>Stanford University</span>
                            <span className="text-red-300 font-medium">2 days left</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span>MIT</span>
                            <span className="text-yellow-300 font-medium">5 days left</span>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard delay={0.2} className="relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Mail className="w-24 h-24 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-green-400" /> Recent Emails
                    </h3>
                    <div className="space-y-3 mt-4">
                        <div className="p-2 bg-white/5 rounded-lg text-sm">
                            <p className="font-medium">Admissions Office</p>
                            <p className="text-white/60 truncate">Regarding your application status...</p>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg text-sm">
                            <p className="font-medium">Prof. Smith</p>
                            <p className="text-white/60 truncate">Recommendation letter submitted.</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard delay={0.3}>
                    <h3 className="text-lg font-semibold mb-2">Application Status</h3>
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Overall Progress</span>
                            <span>65%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-white/50 mt-2">3 applications in progress</p>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
