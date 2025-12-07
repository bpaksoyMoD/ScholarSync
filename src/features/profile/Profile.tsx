import React, { useState } from 'react';
import { useStudentStore } from '@/store/useStudentStore';
import { GlassCard } from '@/components/GlassCard';
import { Save, User, BookOpen, Award } from 'lucide-react';

export default function Profile() {
    const { profile, updateProfile } = useStudentStore();
    const [formData, setFormData] = useState(profile);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Student Profile</h1>
                <button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                >
                    <Save className="w-4 h-4" />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <User className="w-6 h-6 text-blue-400" />
                        <h2 className="text-xl font-semibold">Personal Details</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-white/60 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-1">Target Major</label>
                            <input
                                type="text"
                                name="targetMajor"
                                value={formData.targetMajor}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                            />
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Award className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-xl font-semibold">Academic Stats</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-white/60 mb-1">GPA (4.0 Scale)</label>
                            <input
                                type="number"
                                name="gpa"
                                value={formData.gpa}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-1">SAT / ACT</label>
                            <input
                                type="number"
                                name="sat"
                                value={formData.sat}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                            />
                        </div>
                    </div>
                </GlassCard>
            </div>

            <GlassCard>
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-green-400" />
                    <h2 className="text-xl font-semibold">College Matches</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Mock Matches based on GPA */}
                    {parseFloat(formData.gpa) >= 3.8 && (
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold">Stanford University</h3>
                                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Reach</span>
                            </div>
                            <p className="text-sm text-white/60">Strong fit for CS.</p>
                        </div>
                    )}
                    {parseFloat(formData.gpa) >= 3.5 && (
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold">University of Washington</h3>
                                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Target</span>
                            </div>
                            <p className="text-sm text-white/60">Great location.</p>
                        </div>
                    )}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold">Arizona State</h3>
                            <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">Safety</span>
                        </div>
                        <p className="text-sm text-white/60">High acceptance rate.</p>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
