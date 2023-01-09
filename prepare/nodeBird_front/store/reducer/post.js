import shortId from "shortid";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "./user";
import produce from "immer";
import faker from 'faker';

export const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: '제로초',
            },
            content: '첫 번째 게시글 #해시태그 #익스프레스',
            Images: [{
                id: shortId.generate(),
                src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
            }, {
                id: shortId.generate(),
                src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
            }, {
                id: shortId.generate(),
                src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
            }],
            Comments: [{
                id: shortId.generate(),
                User: {
                    id: shortId.generate(),
                    nickname: 'nero',
                },
                content: '우와 개정판이 나왔군요~',
            }, {
                id: shortId.generate(),
                User: {
                    id: shortId.generate(),
                    nickname: 'hero',
                },
                content: '얼른 사고싶어요~',
            }],
        }],
    imagePaths: [],
    hasMorePosts: true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentDone: false,
    addCommentError: null,
};

// 인피니트 스크롤링
export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
        src: faker.image.image(),
    }],
    Comments: [{
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.sentence(),
    }],
}));

// export const generateDummyPost = (number) => ;

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost= (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: '제로초',
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: '제로초',
    },
});

const reducer = (state = initialState, action) => {

    // immer의 produce가 자동으로 state를 draft로 만들어서 불변성을 유지시켜준다.
    return produce(state, (draft) => {

        switch(action.type) {
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.hasMorePosts = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;

                // return {
                //     ...state,
                //     addPostLoading: true,
                //     addPostDone: false,
                //     addPostError: null,
                // };
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(dummyPost(action.data));
                break;

                // return {
                //     ...state,
                //     mainPosts: [dummyPost(action.data), ...state.mainPosts],
                //     addPostLoading: false,
                //     addPostDone: true,
                // };
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;

                // return {
                //     ...state,
                //     addCommentLoading: false,
                //     addCommentError: action.error,
                // };
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
                // return {

            //     ...state,
            //     addCommentLoading: true,
            //     addCommentDone: false,
            //     addCommentError: null,
            // };
            case ADD_COMMENT_SUCCESS:
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);

            // const post = {...state.mainPosts[postIndex]};
            // post.Comments = [dummyComment(action.data.content), ...post.Comments];
            // const mainPosts = [...state.mainPosts];
            // mainPosts[postIndex] = post;
            //
            // return {
            //     ...state,
            //     mainPosts,
            //     addCommentLoading: false,
            //     addCommentDone: true,
            // };
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
                // return {

            //     ...state,
            //     addCommentLoading: false,
            //     addCommentError: action.error,
            // };
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            // return {
            //     ...state,
            //     removePostLoading: true,
            //     removePostDone: false,
            //     removePostError: null,
            // };
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = state.mainPosts.filter((v) => v.id !== action.data);
                break;
                // return {

            //     ...state,
            //     mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
            //     removePostLoading: false,
            //     removePostDone: true,
            // };
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
                // return {

            //     ...state,
            //     removePostLoading: true,
            //     removePostDone: false,
            //     removePostError: null,
            // };
            case ADD_POST_TO_ME:
                draft.me = {
                    Posts: [{id: action.data}, ...state.me.Posts],
                }
                break;

            // return {
            //     ...state,
            //     me: {
            //         ...state.me,
            //         Posts: [{id: action.data}, ...state.me.Posts],
            //     }
            // }
            case REMOVE_POST_OF_ME:
                return {
                    ...state,
                    me: {
                        ...state.me,
                        Posts: state.me.Posts.filter((v) => v.id === action.data),
                    },
                };
            default:
                return state;
        }


    });

}

export default reducer;