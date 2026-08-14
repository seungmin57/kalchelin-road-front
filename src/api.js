export const API_BASE = "http://localhost:8080";

/**
 *  fetch 공통 처리.
 *  - res.ok 검사를 한 곳에서
 *  - 서버가 준 ErrorResponse.message를 꺼내 에러로 던짐
 */

export async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',         // 세션 쿠키를 항상 실어보낸다
        ...options,
    });

    if (!res.ok) {
        let message = `서버 오류(${res.status})`;
        try {
            const body = await res.json();
            if (body.message) message = body.message;
        } catch {
            // 본문이 json이 아니면 기본 메시지 유지
        }
        throw new Error(message);
    }

    // 204, 또는 200인데 body가 비어 있는 경우(로그인 성공 읍답)를 함께 처리
    const text = await res.text();
    return text ? JSON.parse(text) : null;
    
}