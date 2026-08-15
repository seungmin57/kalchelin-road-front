import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from './api';

// 값을 담아둘 상자. 기본값은 null이지만 실제로는 Provider가 채운다
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);     // 로그인한 사용자, 없으면 null
    const [loading, setLoading] = useState(true);   // "아직 확인 중"인 상태

    // 앱이 처음 뜰 때 딱 한 번: 쿠키가 살아있는지 서버에 물어본다
    useEffect(() => {
        apiFetch('/api/users/me')
            .then(data => setUser(data))
            .catch(() => setUser(null))     // 401은 정상 - 그냥 비로그인
            .finally(() => setLoading(false));
    }, []);

    async function login(username, password) {
        const data = await apiFetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password }),
        });
        setUser(data);          // 응답에 담겨온 사용자 정보를 그대로 저장
        return data;
    }

    async function logout() {
        try {
            await apiFetch('/api/logout', { method: 'POST'});
        } finally {
            setUser(null);      // 서버 호출이 실패해도 프론트는 로그아웃 처리
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 꺼내 쓰는 쪽을 짧게 만들어주는 도우미
export function useAuth() {
    return useContext(AuthContext);
}