import { all, fork, take } from 'redux-saga/effects';

import userSaga from './user';
import postSaga from './post';

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ])
}

// all 배열로 받고 배열로 받은 함수들을 동시에(한방에) 실행시킬 수 있도록 해준다.
// fork 함수를 실행시킴(비동기 함수 호출, ...매개변수)
// call 함수를 실행시킴(동기 함수 호출, ...매개변수)
// take(내용, 콜백) 내용의 내용의 액션이 들어올때까지 기다리겠다.
// put 특정 액션을 dispatch하도록 한다.

// takeEvery 모든 행동을 적용시킨다. (while 처럼 반복문으로 작용)
// takeLeading 첫번째 행동(예: 클릭)만 적용시킨다. (while 처럼 반복문으로 작용) - 단점 서버에는 두번의 요청이 가지만 응답은 첫번쨰 응답만 받아들인다는 뜻
// takeLatest  마지막 행동(예: 클릭)만 적용시킨다. (while 처럼 반복문으로 작용) - 단점 서버에는 두번의 요청이 가지만 응답은 마지막 응답만 받아들인다는 뜻

// throttle(요청, ...매개변수, 2000) 2초동안은 한번의 움직임만 하도록 제한한다. 응답을 두번 못하도록