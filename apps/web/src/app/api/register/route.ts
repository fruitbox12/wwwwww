import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectMongoDB } from 'libs/database'
import User from 'models/user'

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB()
        const userExists = await User.findOne({ email })
        if (userExists) {
            return NextResponse.json({ message: 'User already exists.', error: true }, { status: 400 })
        }

        await User.create({ name, email, password: hashedPassword })

        return NextResponse.json({ message: 'User registered.' }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'An error occurred while registering the user.' }, { status: 500 })
    }
}
