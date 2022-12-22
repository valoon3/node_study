import styled from "styled-components";
import {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {Card} from "antd";

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
                // cover={post.Image[0] && <PostImages images={post.Images} />}
                actions={[

                ]}
            >

            </Card>
        </CardWrapper>
    );


}

export  default PostCard;