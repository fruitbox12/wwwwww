import bcrypt from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectMongoDB } from 'libs/database'
import User from 'models/user'

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string }

                try {
                    await connectMongoDB()
                    const user = await User.findOne({ email })

                    if (!user) {
                        return null
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (!passwordsMatch) {
                        return null
                    }

                    return user
                } catch (error) {
                    console.log('Error: ', error)
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                const { name, email } = user
                try {
                    await connectMongoDB()
                    const userExists = await User.findOne({ email })

                    if (!userExists) {
                        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/register`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name,
                                email,
                                password: email! + process.env.NEXTAUTH_SECRET
                            })
                        })

                        if (res.ok) {
                            return true
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            return true
        }
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
