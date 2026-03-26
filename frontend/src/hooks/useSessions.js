import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api.js';

export function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getSessions();
      setSessions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  const addSession = useCallback(async (formData) => {
    const created = await api.createSession(formData);
    setSessions((prev) => [created, ...prev]);
    return created;
  }, []);

  const removeSession = useCallback(async (id) => {
    await api.deleteSession(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { sessions, loading, error, addSession, removeSession, refresh: fetchSessions };
}
