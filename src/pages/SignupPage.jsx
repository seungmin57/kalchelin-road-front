import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../api';

function SignupPage() {
    const [form, setForm] = useState({username: '', password: '', email: ''});
    const [fieldErrors, setFieldErrors] = useState({});
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const navigate = useNavigate();

    // 입력칸이 셋이라 핸들러를 하나로 묶는다
    function handleChange(e) {
        const {name, value } = e.target;
        setForm(prev => ({...prev, [name]: value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        setSubmitting(true);

        try {
            await apiFetch('/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });
            setDone(true);      // 가입 성공 -> 안내 화면으로 전환
        } catch (err) {
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
            else setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    // 가입 직후: 아직 로그인할 수 없다(이메일 인증 필요)
    if (done) {
        return (
            <div style={{ maxWidth: 380, margin: '48px auto', textAlign: 'center' }}>
                <h1>가입 완료</h1>
                <p style={{ marginTop: 16 }}>
                    <strong>{form.email}</strong> 로 인증 메일을 보냈어요.
                </p>
                <p className="meta">
                    메일의 링크를 눌러 인증을 마쳐야 글과 댓글을 쓸 수 있습니다.
                </p>
                <button onClick={() => navigate('/login')} style={{ marginTop: 20 }}>
                    로그인하러 가기
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 380, margin: '48px auto' }}>
            <h1>회원가입</h1>
            <p className="meta">칼국수를 좋아하는 사람들의 공간</p>

            <form onSubmit={handleSubmit} noValidate style={{ marginTop: 24 }}>
                <Field
                    label="아이디" name="username" value={form.username}
                    onChange={handleChange} error={fieldErrors.username}
                    autoComplete="username"
                    hint="영문, 숫자, 언더바 4~20자"
                />
                <Field
                    label="비밀번호" name="password" type="password" value={form.password}
                    onChange={handleChange} error={fieldErrors.password}
                    autoComplete="new-password"
                    hint="8자 이상"
                />
                <Field
                    label="이메일" name="email" type="email" value={form.email}
                    onChange={handleChange} error={fieldErrors.email}
                    autoComplete="email"
                    hint="가입 인증 메일을 받을 주소"
                />

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
                    {submitting ? '가입 중...' : '가입하기'}
                </button>
            </form>

            <p className="meta" style={{ marginTop: 16, textAlign: 'center' }}>
                이미 계정이 있나요? <Link to="/login">로그인</Link>
            </p>
        </div>
    );
}

// 입력칸 하나 = 라벨 + input + 힌트/에러. 세 번 반복되니 컴포넌트로 뺀다
function Field({ label, name, value, onChange, error, hint, type = 'text', autoComplete }) {
    return (
        <label style={{ display: 'block', marginBottom: 14 }}>
            <div className="meta" style={{ marginBottom: 4 }}>{label}</div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                style={{
                    width: '100%', padding: '9px 12px',
                    border: `1px solid ${error ? '#c0392b' : 'var(--border)'}`,
                    borderRadius: 8, background: 'var(--surface)', font: 'inherit',
                }}
            />
            <div style={{ fontSize: 12, marginTop: 4, color: error ? '#c0392b' : 'var(--text-weak)' }}>
                {error || hint}
            </div>
        </label>
    );
}

export default SignupPage;