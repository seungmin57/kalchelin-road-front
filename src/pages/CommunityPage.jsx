import { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function CommunityPage() {
    const [posts, setPosts] = useState([]);
    const [pageInfo, setPageInfo] = useState(null);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(null);

        apiFetch(`/api/posts?page=${page}&size=8&sort=createdAt,desc`)
            .then(data => {
                setPosts(data.content);
                setPageInfo(data);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [page]);

    return (
        <>
            <div style={{ margin: '28px 0 16px'}}>
                <h1>Kal's 로그</h1>
                <p className="meta">칼국수를 좋아하는 사람들의 기록을 모아봤어요.</p>
            </div>

            {loading && <p>불러오는 중...</p>}
            {error && <p>에러: {error}</p>}
            {!loading && !error && (
                <>
                    <div className="card-grid">
                        {posts.map(p => <PostCard key={p.id} post={p} />)}
                    </div>
                    <Pagination pageInfo={pageInfo} page={page} onChange={setPage} />
                </>
            )}
        </>
    );
}

export default CommunityPage;