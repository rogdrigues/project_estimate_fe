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
import { resetFormat } from '@/styles'

export const metadata: Metadata = {
  title: 'Project Estimate',
  description: 'Project Estimate Management',
}

export default function RootLayout({ children, }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body style={{ overflow: 'hidden' }}>
        <GlobalStyles
          styles={resetFormat}
        />
        <NextAuthWrapper>
          <Providers>
            <ToastManager>
              <SidebarProvider>
                <Header />
                <Box sx={{ display: 'flex' }}>
                  <Sidebar />
                  <Box component="main" sx={{ flexGrow: 1 }}>
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
