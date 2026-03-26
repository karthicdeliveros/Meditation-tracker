import React from 'react';

const MOOD_EMOJI = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };

export default function SessionList({ sessions, onDelete }) {
  if (!sessions.length) {
    return <div className="card"><p className="empty">No sessions yet — log your first one above!</p></div>;
  }

  return (
    <div className="card">
      <h2>Sessions</h2>
      <ul className="session-list">
        {sessions.map((s) => (
          <li key={s.id} className="session-item">
            <div>
              <strong>{s.type}</strong>
              {s.mood && <span className="mood-badge">{MOOD_EMOJI[s.mood]} {s.mood}/5</span>}
              <div className="session-meta">
                {new Date(s.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                &nbsp;&bull;&nbsp;{s.duration_minutes} min
              </div>
              {s.notes && <div className="session-notes">"{s.notes}"</div>}
            </div>
            <button className="btn btn-danger" onClick={() => onDelete(s.id)} aria-label="Delete session">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
