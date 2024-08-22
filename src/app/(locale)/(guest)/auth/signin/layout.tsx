import React from 'react';
import { GlobalStyles } from '@mui/material';
import { Providers } from '@/lib/index';
import ToastManager from '@/components/ToastManager';
const SignInLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <GlobalStyles
                styles={{
                    '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
                    html: { height: '100%' },
                    body: { height: '100%', margin: 0, padding: 0 }
                }}
            />
            <ToastManager>
                <Providers>
                    {children}
                </Providers>
            </ToastManager>

        </>
    );
};

export default SignInLayout;
