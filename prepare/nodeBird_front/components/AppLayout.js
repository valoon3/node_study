import React, {useState} from 'react';
import PropTypes from "prop-types";
import Link from "next/link";
import {Menu, Input, Row, Col} from "antd";
import styled from "styled-components";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({ children }) => {
    const menuItems = [
        {label: (<Link href="/">노드버드</Link>)},
        {label: (<Link href="/profile">프로필</Link>)},
        {label: (<SearchInput placeholder="input search text" enterButton />)},
        {label: (<Link href="/signup">회원가입</Link>)}
    ];

    //sample login data
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <div>
            <Menu mode="horizontal" items={menuItems} />
            <Row gutter={8} > {/* gutter : 컨턴츠들 사이의 거리를 벌려준다. */}
                <Col xs={24} md={6} >   {/* xs 의 합이 24 안쪽이면 한줄에 적용되고 24를 넘어가면 다음줄로 넘어간다. */}
                    {/* 로그인이 되어있으면 UserProfile 안돼있으면 LoginForm */}
                    { isLoggedIn ? <UserProfile /> : <LoginForm /> }
                </Col>
                <Col xs={24} md={12} >
                    {children}
                </Col>
                <Col xs={24} md={6} >
                    <a href="https://www.naver.com" target={"_blank"}>NAVER</a>
                </Col>
            </Row>
        </div>
    );
}

AppLayout.prototype = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;