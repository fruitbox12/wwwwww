import React from 'react'
import RegisterScreen from '.'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

const RegisterPage = async () => {
    const session = await getServerSession()

    if (session) redirect('/dashboard')

    return <RegisterScreen />
}

export default RegisterPage
