import styled from "styled-components";
import React, {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {Avatar, Button, Card, List, Popover} from "antd";
import { Comment } from '@ant-design/compatible';
import {EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
import Link from "next/link";
import PropTypes from "prop-types";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";

const CardWrapper = styled.div`
    margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const id = useSelector((state) => state.user.me && state.user.me.id);

    const [liked, setLiked] = useState(false);

    const onToggleLike = useCallback(() => {
        setLiked(prev => !prev);
    }, []);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
    }, []);

    return (
        <CardWrapper key={post.id}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="message" onClick={onToggleComment} />,
                    <Popover
                        key="ellipsis"  // more
                        content={(
                            <Button.Group>
                                {id && post.User.id === id
                                    ? (
                                        <>
                                            <Button>수정</Button>
                                            <Button type="danger">삭제</Button>
                                        </>)
                                    : (<Button>신고</Button>)}
                            </Button.Group>
                        )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
                // extra={<FollowButton post={post} />}
            >
                <Card.Meta
                    avatar={<Avatar>{ post.User.nickname[0] }</Avatar>}
                    title={post.User.nickname}
                    // description={<PostCarContent postData={post.content} />}
                />
            </Card>
            {commentFormOpened && (
                <>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={(
                                        <Link href={{pathname: '/user', query: {id: item.User.id} }} as={`/user/${item.User.id}`} >
                                            <Avatar>{item.User.nickname[0]}</Avatar>
                                        </Link>
                                    )}
                                    content={item.content}
                                />
                            </li>
                        )}
                    >

                    </List>
                </>
            )}
        </CardWrapper>
    );
};

PostCard.propType = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.any),
        Images: PropTypes.arrayOf(PropTypes.any),
    }),
};

export  default PostCard;