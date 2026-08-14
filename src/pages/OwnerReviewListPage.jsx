import { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import OwnerReviewCard from '../components/OwnerReviewCard';
import Pagination from '../components/Pagination';

function OwnerReviewListPage() {
    const [reviews, setReviews] = useState([]);
    const [pageInfo, setPageInfo] = useState(null);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(null);

        apiFetch(`/api/owner-reviews?page=${page}&size=8&sort=createdAt,desc`)
        .then(data => {
            setReviews(data.content);
            setPageInfo(data);
        })
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }, [page]);

    return (
        <>
            <div style={{ margin: '28px 0 16px' }}>
                <h1>칼슐랭로드</h1>
                <p className="meta">운영자가 직접 방문하고 기록한 칼국수 음식점 리뷰를 모았습니다.</p>
            </div>

            {loading && <p>불러오는 중...</p>}
            {error && <p>에러: {error}</p>}

            {!loading && !error && (
                <>
                    <div className="card-grid">
                        {reviews.map(r => <OwnerReviewCard key={r.id} review={r} />)}
                    </div>
                    <Pagination pageInfo={pageInfo} page={page} onChange={setPage} />
                </>
            )}
        </>
    )
}

export default OwnerReviewListPage;