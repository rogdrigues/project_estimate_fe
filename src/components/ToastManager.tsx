import React from 'react';
import { ToastProvider } from '@/context/ToastContext';

const ToastManager = ({ children }: { children: React.ReactNode }) => {
    return (
        <ToastProvider>
            {children}
        </ToastProvider>
    );
};

export default ToastManager;
