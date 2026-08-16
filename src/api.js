export const API_BASE = "http://localhost:8080";

/**
 *  fetch 공통 처리.
 *  - res.ok 검사를 한 곳에서
 *  - 서버가 준 ErrorResponse.message를 꺼내 에러로 던짐
 */

// 쿠키에서 값 하나를 꺼낸다
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

export async function apiFetch(path, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const headers = {...options.headers };

    // 상태를 바꾸는 요청에만 CSRF 토큰을 싣는다
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        const token = getCookie('XSRF-TOKEN');
        console.log('method:', method, 'token:', token); 
        if (token) headers['X-XSRF-TOKEN'] = token;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',         // 세션 쿠키를 항상 실어보낸다
        ...options,
        headers,
    });

    if (!res.ok) {
        let message = `서버 오류(${res.status})`;
        let fieldErrors = null;
        try {
            const body = await res.json();
            if (body.message) message = body.message;
            if (Array.isArray(body.errors)) {
                fieldErrors = Object.fromEntries(
                body.errors.map(e => [e.field, e.reason])
                );
        } 
        } catch {
            // 본문이 json이 아니면 기본 메시지 유지
        }
        const error = new Error(message);
        error.fieldErrors = fieldErrors;
        throw error;
    }

    // 204, 또는 200인데 body가 비어 있는 경우(로그인 성공 읍답)를 함께 처리
    const text = await res.text();
    return text ? JSON.parse(text) : null;
    
}