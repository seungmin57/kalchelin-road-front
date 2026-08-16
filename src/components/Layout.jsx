import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Layout() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/');
    }
    
    return (
        <>
            <header className="site-header">
                <div className="inner">
                    <Link to='/' className="logo-link">
                        <div>
                            <div className="logo">🍜 칼슐랭로드</div>
                            <div className="tagline">칼국수를 좋아하는 사람들의 공간</div>
                        </div>
                    </Link>
                    <nav>
                        <NavLink to="/owner-reviews">칼슐랭로드</NavLink>
                        <NavLink to="/community">Kal's 로그</NavLink>
                        <NavLink to="/mypage">마이페이지</NavLink>
                    </nav>

                    <div className="spacer" />

                    {/* 확인 중일 땐 아무것도 안 보여준다 */}
                    {!loading && (
                        user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 14 }}>{user.username}</span>
                                <button onClick={handleLogout}>로그아웃</button>
                            </div>
                        ) : (
                            <Link to="/login" className="meta">로그인</Link>
                        )
                    )}
                </div>
            </header>

            <main className="page">
                <Outlet />
            </main>

            <footer className="site-footer">
                🍜 오늘도 맛있는 한 그릇 하세요!
            </footer>
        </>
    );
}

export default Layout;