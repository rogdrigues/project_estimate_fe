import React from 'react';
import { GlobalStyles } from '@mui/material';
const SignInLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <GlobalStyles
                styles={{
                    '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
                    html: { height: '100%' },
                    body: { height: '100%', margin: 0, padding: 0 }
                }}
            />
            {children}
        </div>
    );
};

export default SignInLayout;
