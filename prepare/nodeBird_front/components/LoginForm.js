import React, {useCallback, useState} from 'react';
import {Button, Form, Input} from "antd";
import Link from "next/link";
import styled from "styled-components";
import {useDispatch} from "react-redux";

import {loginAction} from '../store/reducer/index'

const ButtonWrapper = styled.div`
  margin-top: 10px
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        dispatch(loginAction({ id, password }));
    }, [id, password]);

    return (
        <>
            <FormWrapper onFinish={onSubmitForm}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br/>
                    <Input name="user-id" value={id} onChange={onChangeId} require />
                </div>
                <div>
                    <label htmlFor="user-password">아이디</label>
                    <br/>
                    <Input name="user-password" type="password" value={password} onChange={onChangeId} require />
                </div>
                <ButtonWrapper>
                    <Button type="primary" htmlType="submit" loading={false} onChange={onChangePassword} >로그인</Button>
                    <Link href="/signup"><Button>회원가입</Button></Link>
                </ButtonWrapper>
            </FormWrapper>
        </>
    )
}

export default LoginForm;