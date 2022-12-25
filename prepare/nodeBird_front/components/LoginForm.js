import React, {useCallback, useState} from 'react';
import {Button, Form, Input} from "antd";
import Link from "next/link";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";

import {loginRequestAction} from '../store/reducer/user'

const ButtonWrapper = styled.div`
  margin-top: 10px
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading } = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(loginRequestAction({ email, password }));
    }, [email, password]);

    return (
        <>
            <FormWrapper onFinish={onSubmitForm}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br/>
                    <Input name="user-email" value={email} onChange={onChangeEmail} require="true" />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" type="password" value={password} onChange={onChangePassword} require="true" />
                </div>
                <ButtonWrapper>
                    <Button type="primary" htmlType="submit" loading={logInLoading} onChange={onSubmitForm} >로그인</Button>
                    <Link href="/signup"><Button>회원가입</Button></Link>
                </ButtonWrapper>
            </FormWrapper>
        </>
    )
}

export default LoginForm;