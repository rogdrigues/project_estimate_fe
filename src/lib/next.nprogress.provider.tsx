'use client'
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <ProgressBar
                height="4px"
                color="#fffd00"
                options={{ showSpinner: false }}
                shallowRouting={true}
            />
        </>
    )
}