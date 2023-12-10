import React from 'react'
import LoginScreen from './login.screen'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
    const session = await getServerSession()

    if (session) redirect('/dashboard')

    return <LoginScreen />
}

export default LoginPage
