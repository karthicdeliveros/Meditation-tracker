import React from 'react';
import { useSessions } from './hooks/useSessions.js';
import AddSessionForm from './components/AddSessionForm.jsx';
import SessionList from './components/SessionList.jsx';
import StatsDashboard from './components/StatsDashboard.jsx';

export default function App() {
  const { sessions, loading, error, addSession, removeSession } = useSessions();

  return (
    <>
      <h1>Meditation Tracker</h1>

      {error && <div className="error">Could not load sessions: {error}</div>}

      {!loading && <StatsDashboard sessions={sessions} />}

      <AddSessionForm onAdd={addSession} />

      {loading
        ? <div className="loading">Loading sessions…</div>
        : <SessionList sessions={sessions} onDelete={removeSession} />
      }
    </>
  );
}
