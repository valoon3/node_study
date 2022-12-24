import axios from "axios";

export const initialState = {
    isLoggingIn: false, // 샘플 데이터
    isLoggedIn: false, // 샘플 데이터
    isLoggingOut: false, // 샘플 데이터

    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    me: null,
    signUpData: {},
    loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// Action
export const loginRequestAction = (data) => {
    console.log('reducer login')
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}

export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                // isLoggedIn: true,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: {...action.data, nickname: 'zerocho'},
            };
        case LOG_IN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
            };
        case LOG_OUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                me: null
            };
        case LOG_OUT_SUCCESS:
            console.log('log_out_success!!!')
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null
            };
        case LOG_OUT_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                me: null
            };
        default:
            return state;
    }
}

export default reducer;