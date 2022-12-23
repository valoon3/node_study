import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => { // 첫 번째 게시글 #해시태그 # 익스프레스

    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v, i) => {
                if(v.match(/(#[^\s]+)/)) {
                    return (
                        <Link
                            href={{pathname: '/hashtag', query: {tag: v.slice(1)} }}
                            as={`/hashtag/${v.slice(1)}`}
                            key={i}
                        >
                            {v}
                        </Link>
                    );
                }
                // 조건에 맞지 않으면
                return v;
            })}
        </div>
    );
}

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
};

export default PostCardContent;