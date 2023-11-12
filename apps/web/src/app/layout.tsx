import { Inter } from 'next/font/google'

import React, { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './auth-provider'
const inter = Inter({ subsets: ['latin'] })

const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <html lang='en'>
            <body className={`${inter.className} min-h-screen bg-white`}>
                <AuthProvider>
                    {children}
                    <Toaster position='top-right' />
                </AuthProvider>
            </body>
        </html>
    )
}

export default AuthLayout
