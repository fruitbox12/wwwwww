// pages/login.js (or wherever you want this page to be)

import React from 'react';
import LoginScreen from './LoginScreen'; // Adjust the path as needed
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();

    return <LoginScreen />;
};

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (session) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    return {
        props: {}, // will be passed to the page component as props
    };
}

export default LoginPage;
