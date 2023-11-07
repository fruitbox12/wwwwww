import React from 'react'
import { lazy } from 'react'

// project imports
import Loadable from 'ui-component/Loadable'

// canvas routing
const Canvas = Loadable(lazy(() => import('views/canvas')))

type Params = {
    params: {
        canvasId: string
    }
}
const page = ({ params: { canvasId } }: Params) => {
    return <Canvas canvasId={canvasId} />
}

export default page
