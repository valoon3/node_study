import {createWrapper} from "next-redux-wrapper";
import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducer";
import {composeWithDevTools} from "redux-devtools-extension";


const configureStore = () => {
    const middlewares = [];
    // redux 개발자 도구 사용을 위한 설정
    const enhancer = process.env.NODE_ENV === 'production' ?
            compose(applyMiddleware(...middlewares)) : // production env
            composeWithDevTools(applyMiddleware(...middlewares)); // dev env

    const store = createStore(reducer, enhancer);
    return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development'});

export default wrapper;