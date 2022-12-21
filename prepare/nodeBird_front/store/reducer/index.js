import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    user : {
        isLoggedIn: false,
        user: null,
        signUpData: {},
        loginData: {},
    },
    post : {
        mainPosts: [],
    }
}

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log('HYDRATE', action);
            return {
                ...state,
                ...action.payload
            };
        case 'LOG_IN':
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: true
                }
            };
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false
            };
        default:
            return state;

    }
}

export default rootReducer;