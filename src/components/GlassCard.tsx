import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function GlassCard({ children, className, delay = 0, ...props }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                "bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white shadow-xl",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
