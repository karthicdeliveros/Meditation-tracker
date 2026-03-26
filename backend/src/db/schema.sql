CREATE TABLE IF NOT EXISTS sessions (
  id            SERIAL PRIMARY KEY,
  date          DATE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  type          VARCHAR(100) NOT NULL,
  notes         TEXT,
  mood          SMALLINT CHECK (mood BETWEEN 1 AND 5),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
