import {createWrapper} from "next-redux-wrapper";
import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from "redux-devtools-extension";

import reducer from "./reducer";
import rootSaga from '../sagas'

// customMiddleware
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    console.log(action);

    return next(action);
}

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, loggerMiddleware]; // thunkMiddleware는 함수로 들어온 입력도 처리 가능하도록 만들어줌
    // redux 개발자 도구 사용을 위한 설정
    const enhancer = process.env.NODE_ENV === 'production' ?
            compose(applyMiddleware(...middlewares)) : // production env
            composeWithDevTools(applyMiddleware(...middlewares)); // dev env

    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development'});

export default wrapper;