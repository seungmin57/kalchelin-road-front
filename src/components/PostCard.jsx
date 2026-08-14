import { Link } from 'react-router-dom';

function PostCard({ post }) {
    return (
        <article className="card">
            <div className="meta">
                {post.authorName} · {post.createdAt?.slice(0, 10)}
            </div>

            {/* Post에 이미지 필드가 아직 없다 */}
            <div className='thumb-empty'>이미지 없음</div>

            <h3 style={{ marginTop:10 }}>
                <Link to={`/community/${post.id}`}>{post.title}</Link>
            </h3>
            <div className="rating">* {post.rating}</div>
        </article>
    );
}

export default PostCard;