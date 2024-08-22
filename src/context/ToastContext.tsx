
'use client'
import React, { createContext, useContext, useState } from 'react';
import Toast from '@/utils/toast';
interface ToastContextType {
    triggerToast: (msg: string, status: boolean) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);

    const triggerToast = (msg: string, status: boolean) => {
        setMessage(msg);
        setStatus(status);
        setOpen(true);
    };

    return (
        <ToastContext.Provider value={{ triggerToast }}>
            {children}
            <Toast open={open} setOpen={setOpen} responseMessage={message} status={status} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
