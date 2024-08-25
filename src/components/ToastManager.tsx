import React from 'react';
import { ToastProvider } from '@/context/ToastContext';

export const ToastManager = ({ children }: { children: React.ReactNode }) => {
    return (
        <ToastProvider>
            {children}
        </ToastProvider>
    );
};

