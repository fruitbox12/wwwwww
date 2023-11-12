import React from 'react'
import { Inter } from 'next/font/google'

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
