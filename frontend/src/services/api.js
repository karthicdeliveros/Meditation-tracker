const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getSessions: () => request('/api/sessions'),
  createSession: (data) => request('/api/sessions', { method: 'POST', body: JSON.stringify(data) }),
  deleteSession: (id) => request(`/api/sessions/${id}`, { method: 'DELETE' }),
  health: () => request('/api/health'),
};
