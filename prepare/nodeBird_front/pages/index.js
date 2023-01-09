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