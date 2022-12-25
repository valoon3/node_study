import React, {useCallback, useState} from 'react';
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import {Button, Checkbox, Form, Input} from "antd";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import {SIGN_UP_REQUEST} from "../store/reducer/user";
import {useDispatch, useSelector} from "react-redux";

const ErrorMessage = styled.div`
  color: red;
`

const Signup = () => {
    const dispatch = useDispatch();
    const { signUpLoading } = useSelector((state) => state.user);

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [nickname, onChangeNickname] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const [term, setTerm] = useState('');
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.value);
        setTermError(false);
    }, []);

    const onSubmit = useCallback(() => {
        if(password !== passwordCheck) {
            return setPasswordError(true);
        }
        if(!term) {
            return setTermError(true);
        }
        console.log(email, nickname, password);
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname },
        });
    }, [email, password, passwordCheck, term]);

    return (
        <>
            <AppLayout>
                <Head>
                    <title>회원가입</title>
                </Head>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor="user-email" type="email">이메일</label>
                        <br/>
                        <Input name="user-email" value={email} require onChange={onChangeEmail} />
                    </div>
                    <div>
                        <label htmlFor="user-nick">닉네임</label>
                        <br/>
                        <Input name="user-nick" value={nickname} require onChange={onChangeNickname} />
                    </div>
                    <div>
                        <label htmlFor="user-password" >비밀번호</label>
                        <br/>
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor="user-password-check">비밀번호체크</label>
                        <br />
                        <Input
                            name="user-password-check"
                            type="password"
                            value={passwordCheck}
                            required
                            onChange={onChangePasswordCheck}
                        />
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </div>
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의하겠습니다.</Checkbox>
                        {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
}

export default Signup;