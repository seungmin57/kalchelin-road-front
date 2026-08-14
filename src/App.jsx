import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import OwnerReviewListPage from './pages/OwnerReviewListPage';
import OwnerReviewDetailPage from './pages/OwnerReviewDetailPage';
import CommunityPage from './pages/CommunityPage';
import PostDetailPage from './pages/PostDetailPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Routes>
            {/* Layout이 헤더, 푸터를 담당, 자식 라우트가 <Outlet>자리에 들어감 */}
            <Route element={<Layout />}>
                <Route path = "/" element = {<HomePage />} />
                <Route path = "/owner-reviews" element = {<OwnerReviewListPage />} />
                <Route path = "/owner-reviews/:id" element = {<OwnerReviewDetailPage />} />
                <Route path = "/community" element = {<CommunityPage />} />
                <Route path = "/community/:id" element = {<PostDetailPage />} />
                <Route path = "/mypage" element={<MyPage />} />
                <Route path = "/login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default App;