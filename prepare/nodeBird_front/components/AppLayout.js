import React from 'react';
import PropTypes from "prop-types";
import Link from "next/link";
import {Menu, Input, Row, Col} from "antd";

const AppLayout = ({ children }) => {
    const menuItems = [
        {label: (<Link href="/">노드버드</Link>)},
        {label: (<Link href="/profile">프로필</Link>)},
        {label: (<Input.Search placeholder="input search text" /*onSearch={onSearch}*/ enterButton style={{verticalAlign: "middle"}} />)},
        {label: (<Link href="/signup">회원가입</Link>)}
    ];

    return (
        <div>
            <Menu mode="horizontal" items={menuItems} />
            { children }
        </div>
    );
}

AppLayout.prototype = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;