import { Link } from 'react-router-dom';

function MyPage() {
    return (
        <>
            <div style={{ margin: '28px 0 16px'}}>
                <h1>마이페이지</h1>
                <p className="meta">내 활동과 칼국수 기록을 한눈에 확인하세요.</p>
            </div>
            <div className="card">
                <p>로그인 기능을 만든 뒤 채움</p>
                <p className="meta">
                    작성한 글 / 스크랩한 글 / 받은 좋아요 / 받은 댓글 통계는 백엔드 API가 아직 없음
                </p>
                <Link to="/">← 홈으로</Link>
            </div>
        </>
    )
}

export default MyPage;