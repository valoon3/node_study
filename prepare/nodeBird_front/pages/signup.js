import React from 'react';
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Signup = () => {
    return (
        <>
            <Head>
                <title>회원가입</title>
            </Head>
            <AppLayout><div>내 프로필</div></AppLayout>
        </>
    )
}

export default Signup;