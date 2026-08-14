import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../api';

function PostDetailPage() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(null);

        Promise.all([
            apiFetch(`/api/posts/${id}`),
            apiFetch(`/api/posts/${id}/comments`),
        ])
            .then(([postData, commentData]) => {
                setPost(postData);
                // 댓글에 페이지네이션이 붙었는지 여부에 따라 형태가 다르다
                setComments(Array.isArray(commentData) ? commentData : commentData.content);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p style={{ marginTop: 32}}>불러오는 중...</p>;
    if (error) return (
        <div style={{ marginTop: 32 }}>
            <p>에러: {error}</p>
            <Link to="/community">← 목록으로</Link>
        </div>
    );
    if (!post) return null;

    return (
        <>
            <p style={{ margin: '24px 0'}}>
                <Link to="/community">← 목록으로 돌아가기</Link>
            </p>
            <div style={{ display:'grid', gridTemplateColumns: '2fr 1fr', gap: 20}}>
                {/* 본문 */}
                <article className="card" style={{ padding: 28 }}>
                    <div className="meta">
                        {post.authorName} · {post.createdAt?.slice(0,16).replace('T', ' ')}
                    </div>

                    <h1 style={{marginTop: 8}}>{post.title}</h1>
                    <div className="rating" style={{ fontSize: 18 }}>★{post.rating}</div>
                    <p style={{ whiteSpace: 'pre-wrap', marginTop: 18 }}>{post.content}</p>
                </article>

                {/* 댓글 */}
                <aside className="card">
                    <h2>댓글 {comments.length}</h2>
                    {comments.length === 0 && <p className="meta">아직 댓글이 없어요.</p>}
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {comments.map(c => (
                            <li key={c.id} style={{ borderTop: '1px solid var(--border)', padding: '12px 0'}}>
                                <div className="meta">
                                    {c.authorName} · {c.createdAt?.slice(0,16).replace('T', ' ')}
                                </div>
                                <p style={{ margin: '4px 0 0'}}>{c.content}</p>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </>
    );
}

export default PostDetailPage;