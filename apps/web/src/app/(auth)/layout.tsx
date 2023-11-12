import React, { PropsWithChildren } from 'react'
import '../globals.css'

const AuthLayout = (props: PropsWithChildren) => {
    return <div>{props.children}</div>
}

export default AuthLayout
