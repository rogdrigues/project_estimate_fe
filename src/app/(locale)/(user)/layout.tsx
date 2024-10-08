import Header from '@/components/Header'
import { ToastManager } from '@/components/index'
import { NextAuthWrapper } from '@/lib'
import { Providers } from '@/lib'
import type { Metadata } from 'next'
import { GlobalStyles } from '@mui/material'
import { Box } from '@mui/system'
import Sidebar from '@/components/Sidebar'
import { SidebarProvider } from '@/context/SidebarContext'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Project Estimate',
  description: 'Project Estimate Management',
}

export default function RootLayout({ children, }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body style={{ overflow: 'hidden' }}>
        <GlobalStyles
          styles={{
            '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
            html: { height: '100%' },
            body: { height: '100%', margin: 0, padding: 0 },
          }}
        />
        <NextAuthWrapper>
          <Providers>
            <ToastManager>
              <SidebarProvider>
                <Header />
                <Box sx={{ display: 'flex' }}>
                  <Sidebar />
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {children}
                  </Box>
                </Box>
              </SidebarProvider>
            </ToastManager>
          </Providers>
        </NextAuthWrapper>
      </body>
    </html>
  )
}
