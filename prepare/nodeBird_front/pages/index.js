import React, {useEffect} from 'react';
import AppLayout from "../components/AppLayout";
import {useDispatch, useSelector} from "react-redux";

import PostForm from '../components/index/PostForm.js';
import PostCard from "../components/index/PostCard";
import {LOAD_POSTS_REQUEST} from "../store/reducer/post";

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        })
    }, []);

    useEffect(() => {
        function onScroll() {
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
        }

        window.addEventListener('scroll', onScroll);

        return () => { // 삭제하지 않으면 계속 메모리에 쌓여있는다.
            window.removeEventListener('scroll', onScroll);
        };
    });

    const { me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    return (
        <AppLayout>
            {me && <PostForm/>}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
}

export default Home;