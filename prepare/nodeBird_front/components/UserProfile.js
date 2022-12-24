import React, {useCallback} from 'react';
import {Avatar, Button, Card} from 'antd';
import {useDispatch, useSelector} from "react-redux";

import {logoutRequestAction} from '../store/reducer/user'

const UserProfile = () => {

    const dispatch = useDispatch();
    const me = useSelector((state) => state.user.me);
    const { isLoggingOut } = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        console.log('onLogOut');
        dispatch(logoutRequestAction());
    }, []);

    return (
        <>
            <Card actions={[
                <div key="twit">짹짹<br/>0</div>,
                <div key="followings">팔로잉<br/>0</div>,
                <div key="followers">팔로워<br/>0</div>
            ]}>
                <Card.Meta
                    avatar={<Avatar>{me?.nickname[0]}</Avatar>}
                    title={me?.nickname}
                />
                <Button onClick={onLogOut} loading={isLoggingOut}>로그아웃</Button>
            </Card>

        </>
    )
}


export default UserProfile;