import { HYDRATE } from "next-redux-wrapper";

import user from './user';
import post from './post';
import {combineReducers} from "redux";

const index = (state = {}, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log('HYDRATE', HYDRATE);
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    index,
    user,
    post,
});

export default rootReducer;