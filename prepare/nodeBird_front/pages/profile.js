import React from 'react';
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Profile = () => {
    return (
        <div>
            <Head> {/* Head 설정을 건드리고 싶을때에는 next의 head 컴포넌트를 사용한다. */}
                <title>프로필</title>
            </Head>
            <AppLayout><div>내 프로필</div></AppLayout>

        </div>
    )
};

export default Profile;