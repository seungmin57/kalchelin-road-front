import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch, API_BASE } from '../api';

function OwnerReviewDetailPage() {
    const { id } = useParams();

    const [review, setReview] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(null);

        apiFetch(`/api/owner-reviews/${id}`)
            .then(data => setReview(data))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [id]);

    if (loading) return <p style={{ marginTop:32 }}>불러오는 중...</p>;
    if (error) return (
        <div style={{ marginTop: 32 }}>
            <p>에러: {error}</p>
            <Link to="/owner-reviews">← 목록으로</Link>
        </div>
    );
    if (!review) return null;
    
    return (
        <>
            <p style={{ margin: '24px 0'}}>
                <Link to="/owner-reviews">← 목록으로 돌아가기</Link>
            </p>

            <article className="card" style={{ padding: 28 }}>
                <div className="meta">OWNER · {review.createdAt?.slice(0,10)}</div>
                <h1 style={{ marginTop: 8}}>{review.title}</h1>
                <div className="rating" style={{fontSize:18}}>★{review.rating}</div>

                {review.imageUrl && (
                    <img
                        src={`${API_BASE}${review.imageUrl}`}
                        alt={review.title}
                        style={{
                            width: '100%', maxWidth: 640, borderRadius: 10, margin: '18px 0', 
                            display:'block',
                        }}
                    />
                )}
                <p style={{ whiteSpace: 'pre-wrap'}}>{review.content}</p>
            </article>
            
        </>
    );
}

export default OwnerReviewDetailPage;