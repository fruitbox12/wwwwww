import React from 'react'
import { Inter } from 'next/font/google'

interface CanvasLayoutProps {
    children: React.ReactNode
}
const inter = Inter({ subsets: ['latin'] })

export default function CanvasLayout({ children }: CanvasLayoutProps) {
    return (
        <html lang='en'>
        <body className={`${inter.className} min-h-screen bg-white`}>
        <div>
            <main>{children}</main>
        </div>
        </body>
        </html>
    )
}
