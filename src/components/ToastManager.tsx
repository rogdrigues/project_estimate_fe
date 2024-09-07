import { ToastProvider } from '@/context/ToastContext';
import { ReactNode } from 'react';

export const ToastManager = ({ children }: { children: ReactNode }) => {
    return (
        <ToastProvider>
            {children}
        </ToastProvider>
    );
};

