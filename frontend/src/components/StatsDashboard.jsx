import React, { useMemo } from 'react';

export default function StatsDashboard({ sessions }) {
  const stats = useMemo(() => {
    if (!sessions.length) return null;
    const totalMinutes = sessions.reduce((sum, s) => sum + Number(s.duration_minutes), 0);
    const moodSessions = sessions.filter((s) => s.mood != null);
    const avgMood = moodSessions.length
      ? (moodSessions.reduce((sum, s) => sum + Number(s.mood), 0) / moodSessions.length).toFixed(1)
      : '—';
    const typeCounts = sessions.reduce((acc, s) => {
      acc[s.type] = (acc[s.type] ?? 0) + 1;
      return acc;
    }, {});
    const topType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
    return { totalMinutes, avgMood, topType, count: sessions.length };
  }, [sessions]);

  if (!stats) return null;

  return (
    <div className="card">
      <h2>Overview</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.count}</div>
          <div className="stat-label">Total Sessions</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.totalMinutes}</div>
          <div className="stat-label">Total Minutes</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{Math.round(stats.totalMinutes / stats.count)}</div>
          <div className="stat-label">Avg. Duration</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.avgMood}</div>
          <div className="stat-label">Avg. Mood</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ fontSize: '1rem' }}>{stats.topType}</div>
          <div className="stat-label">Top Type</div>
        </div>
      </div>
    </div>
  );
}
