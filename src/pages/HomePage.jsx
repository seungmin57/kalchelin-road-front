import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api';
import OwnerReviewCard from '../components/OwnerReviewCard';
import PostCard from '../components/PostCard';

// 정적 컨텐츠라 컴포넌트 밖에 둔다
const GUIDES = [
    { icon: '📍', title: '운영자 직접 방문', desc: '직접 방문한 칼국수 음식점을 평가합니다' },
    { icon: '⭐', title: '정직한 리뷰', desc: '광고 없이, 솔직하게 기록합니다' },
    { icon: '📝', title: '운영자의 주관적인 평가', desc: '평가는 주관적입니다' },
    { icon: '🔄', title: '지속적인 업데이트', desc: '새로운 칼국수 음식점을 꾸준히 찾아갑니다' },
]

function HomePage() {
    const [reviews, setReviews] = useState([]);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            apiFetch('/api/owner-reviews?page=0&size=4&sort=createdAt,desc'),
            apiFetch('/api/posts?page=0&size=4&sort=createdAt,desc'),
        ])
        .then(([reviewPage, postPage]) => {
            setReviews(reviewPage.content);
            setPosts(postPage.content);
        })
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className='home-layout'>
            {/* - 왼쪽: 최신 글 두 묶음 - */}
            <div>
                <div className="section-head" style={{ marginTop: 0 }}>
                    <h2>칼슐랭로드 최신 글</h2>
                    <Link to = "/owner-reviews" className="meta">전체 보기 →</Link>
                </div>

                {loading && <p>불러오는 중...</p>}
                {error && <p>에러: {error}</p>}
                {!loading && !error && (
                    <div className="card-grid cols-4">
                        {reviews.map(r => <OwnerReviewCard key = {r.id} review={r} />)}
                    </div>
                )}
                <div className="section-head">
                    <h2>Kal's 로그 최신 글</h2>
                    <Link to="/community" className="meta">전체 보기 →</Link>
                </div>

                {!loading && !error && (
                    <div className="card-grid cols-4">
                        {posts.map(p => <PostCard key={p.id} post = {p} />)}
                    </div>
                )}
            </div>

            {/* ── 오른쪽: 사이드바 ── */}
            <aside>
                <section className="card" style={{ marginBottom: 20 }}>
                    <h2>오늘의 한 그릇</h2>
                    <div className="placeholder">
                        커뮤니티 글 중 하루에 하나를 무작위로 소개합니다.
                        <br />
                        <span style={{ fontSize: 12 }}>(준비 중)</span>
                    </div>
                </section>

                <section className="card">
                    <h2>칼슐랭로드 가이드</h2>
                    <ul className="guide-list">
                        {GUIDES.map(g => (
                            <li key={g.title}>
                                <span className="icon">{g.icon}</span>
                                <div>
                                    <div className="title">{g.title}</div>
                                    <div className="desc">{g.desc}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </aside>
        </div>
    );
}

export default HomePage;