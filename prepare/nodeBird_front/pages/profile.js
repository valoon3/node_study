import React from 'react';
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/profile/NicknameEditForm";
import FollowList from "../components/profile/FollowList";
import {useSelector} from "react-redux";

const Profile = () => {
    const {me} = useSelector((state) => state.user?.me);

    // // 더미 데이터
    // const followingList = [
    //     {nickname: '제로초'},
    //     {nickname: '나병호'},
    //     {nickname: '노드버드 오피셜'},
    // ];
    // const followerList = [
    //     {nickname: '제로초'},
    //     {nickname: '나병호'},
    //     {nickname: '노드버드 오피셜'},
    // ]

    return (
        <div>
            <Head> {/* Head 설정을 건드리고 싶을때에는 next의 head 컴포넌트를 사용한다. */}
                <title>프로필</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={me.Followings}/>
                <FollowList header="팔로워" data={me.Followers}/>
            </AppLayout>

        </div>
    )
};

export default Profile;