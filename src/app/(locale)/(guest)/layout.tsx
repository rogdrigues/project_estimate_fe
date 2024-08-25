import { ToastManager } from '@/components/index'
import { Providers } from '@/lib'
import type { Metadata } from 'next'
import { GlobalStyles } from '@mui/material'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your account',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {

    return (

        <html lang="en">
            <body>
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
            </body>
        </html>

    )
}
