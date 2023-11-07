import React from 'react'

interface CanvasLayoutProps {
    children: React.ReactNode
}

export default function CanvasLayout({ children }: CanvasLayoutProps) {
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}
