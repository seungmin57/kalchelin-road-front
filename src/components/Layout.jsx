import { NavLink, Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <header className="site-header">
                <div className="inner">
                    <div>
                        <div className="logo">🍜 칼슐랭로드</div>
                        <div className="tagline">칼국수를 좋아하는 사람들의 공간</div>
                    </div>

                    <nav>
                        <NavLink to="/owner-reviews">칼슐랭로드</NavLink>
                        <NavLink to="/community">Kal's 로그</NavLink>
                        <NavLink to="/mypage">마이페이지</NavLink>
                    </nav>

                    <div className="spacer" />

                    {/* 로그인 상태 표시는 다음 작업 */}
                    <span className="meta">로그인 필요</span>
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