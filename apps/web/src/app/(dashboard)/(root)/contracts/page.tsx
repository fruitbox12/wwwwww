import React from 'react'
import dynamic from 'next/dynamic';

const Contracts: React.FC = dynamic(() => import('views/contracts'), { ssr: false }) as React.FC;;

const ContractsPage = () => {
    return <Contracts />
}

export default ContractsPage
