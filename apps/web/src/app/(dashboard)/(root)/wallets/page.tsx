import React from 'react'
import dynamic from 'next/dynamic';

const Wallets: React.FC = dynamic(() => import('views/wallets'), { ssr: false }) as React.FC;

const WalletsPage = () => {
    return (
        <>
            <Wallets />
        </>
    )
}

export default WalletsPage
