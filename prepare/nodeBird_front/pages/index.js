import React from 'react';
import AppLayout from "../components/AppLayout";
import {useSelector} from "react-redux";

import PostForm from '../components/index/PostForm.js';
import PostCard from "../components/index/PostCard";

const Home = () => {

    const { isLoggedIn } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    return (
        <AppLayout>
            {isLoggedIn && <PostForm/>}
            { mainPosts.map((post) => <PostCard key={post.id} post={post} />) }
        </AppLayout>
    );
}

export default Home;