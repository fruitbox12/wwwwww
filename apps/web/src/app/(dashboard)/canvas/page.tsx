import React from 'react'
import { lazy } from 'react'
import dynamic from 'next/dynamic';

// project imports
import Loadable from 'ui-component/Loadable'

// canvas routing
const Canvas: React.FC = dynamic(() => import('views/canvas'), {
    ssr: false,
  }) as React.FC; // This asserts Canvas as a React functional component without children
  
const page = () => {
    return (
        <div>
            <Canvas />
        </div>
    )
}

export default page
