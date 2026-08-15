import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../api';
import { useAuth } from '../AuthContext';

function LoginPage() {
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    
    async function handleSubmit(e) {
        e.preventDefault();     // 폼의 기본 동작(새로고침)을 막는다
        setError(null);
        setSubmitting(true);

        try {
            await login(username, password);   
            navigate('/');      // 성공하면 홈으로
        } catch (err) {
            setError(err.message)   // 백엔드가 준 401 메시지가 그대로 들어온다
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div style={{ maxWidth: 380, margin: '48px auto' }}>
            <h1>로그인</h1>
            <p className="meta">칼국수를 좋아하는 사람들의 공간</p>

            <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
                <label style={{ display: 'block', marginBottom: 14 }}>
                    <div className="meta" style={{ marginBottom: 4 }}>아이디</div>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                        style={inputStyle}
                    />
                </label>

                <label style={{ display: 'block', marginBottom: 18 }}>
                    <div className="meta" style={{ marginBottom: 4 }}>비밀번호</div>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        style={inputStyle}
                    />
                </label>

                {error && (
                    <p style={{ color: '#c0392b', fontSize: 13, margin: '0 0 12px' }}>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        width: '100%', padding: '10px',
                        background: 'var(--brown)', color: '#fff', border: 'none',
                    }}
                >
                    {submitting ? '로그인 중...' : '로그인'}
                </button>
            </form>

            <p className="meta" style={{ marginTop: 16, textAlign: 'center' }}>
                아직 계정이 없나요? <Link to="/signup">회원가입</Link>
            </p>
        </div>
    );
}

// 입력칸 스타일 - 컴포넌트 밖에 두어 매 렌더링마다 새로 만들지 않게
// 입력칸 스타일 — 컴포넌트 밖에 두어 매 렌더링마다 새로 만들지 않게
const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid var(--border)',
    borderRadius: 8,
    background: 'var(--surface)',
    font: 'inherit',
};

export default LoginPage;