import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {ADD_COMMENT_REQUEST} from "../../store/reducer/post";
import useInput from "../../hooks/useInput";


const CommentForm = ({ post }) => {
    const id = useSelector((state) => state.user.me?.id);
    const {addCommentDone} = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');
    const dispatch = useDispatch();

    useEffect(() => {
        if(addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);

    const onSubmitComment = useCallback(() => {
        console.log(commentText);
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id},
        })
    }, [commentText, id]);

    return (
        <>
            <Form onFinish={onSubmitComment}>
                <Form.Item style={{position: 'relative', margin: 0}}> {/* */}
                    <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                    <Button type="primary" htmlType="submit"  style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}>삐약</Button> {/**/}
                </Form.Item>
            </Form>
        </>
    );
}

export default CommentForm;