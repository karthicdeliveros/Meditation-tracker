import React, { useState } from 'react';

const TYPES = ['Mindfulness', 'Breathing', 'Body Scan', 'Loving-Kindness', 'Visualization', 'Yoga Nidra', 'Other'];

const defaultForm = {
  date: new Date().toISOString().split('T')[0],
  duration_minutes: '',
  type: 'Mindfulness',
  notes: '',
  mood: '',
};

export default function AddSessionForm({ onAdd }) {
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      await onAdd({
        ...form,
        duration_minutes: Number(form.duration_minutes),
        mood: form.mood ? Number(form.mood) : null,
      });
      setForm(defaultForm);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card">
      <h2>Log a Session</h2>
      {formError && <div className="error">{formError}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="duration_minutes">Duration (minutes)</label>
            <input id="duration_minutes" name="duration_minutes" type="number" min="1" value={form.duration_minutes} onChange={handleChange} required placeholder="20" />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select id="type" name="type" value={form.type} onChange={handleChange} required>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mood">Mood after (1–5)</label>
            <input id="mood" name="mood" type="number" min="1" max="5" value={form.mood} onChange={handleChange} placeholder="Optional" />
          </div>
          <div className="form-group full">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} placeholder="How did it go?" />
          </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={saving} style={{ marginTop: '1rem' }}>
          {saving ? 'Saving…' : 'Add Session'}
        </button>
      </form>
    </div>
  );
}
