import ToastManager from '@/components/ToastManager'
import { NextAuthWrapper } from '@/lib/index'
import { Providers } from '@/lib/index'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Estimate',
  description: 'Project Estimate Management',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthWrapper>
          <Providers>
            <ToastManager>
              {children}
            </ToastManager>
          </Providers>
        </NextAuthWrapper>
      </body>
    </html>
  )
}
