import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StudentProfile {
    name: string;
    gpa: string;
    sat: string;
    interests: string[];
    targetMajor: string;
}

interface StudentStore {
    profile: StudentProfile;
    updateProfile: (profile: Partial<StudentProfile>) => void;
}

export const useStudentStore = create<StudentStore>()(
    persist(
        (set) => ({
            profile: {
                name: 'Student',
                gpa: '3.8',
                sat: '1450',
                interests: ['Computer Science', 'Robotics'],
                targetMajor: 'Computer Science',
            },
            updateProfile: (newProfile) =>
                set((state) => ({
                    profile: { ...state.profile, ...newProfile },
                })),
        }),
        {
            name: 'student-storage',
        }
    )
);
