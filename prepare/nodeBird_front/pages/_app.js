import PropTypes from "prop-types";
import Head from 'next/head';

import wrapper from "../store/configureStore";

// _app은 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트
// 페이지에 적용할 공통 레이아웃의 역할은 한다.


const NodeBird = ({ Component }) => {
    return (
        <>
            <Head> {/* Head 설정을 건드리고 싶을때에는 next의 head 컴포넌트를 사용한다. */}
                <meta charSet={"utf-8"} />
                <title>노드버드</title>
            </Head>
            <Component />
        </>
    )
}

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird);