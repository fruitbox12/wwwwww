import React from 'react'
import { lazy } from 'react'

// project imports
import Loadable from 'ui-component/Loadable'

// canvas routing
const Canvas = Loadable(lazy(() => import('views/canvas')))

const page = () => {
    return (
        <div>
            <Canvas />
        </div>
    )
}

export default page
