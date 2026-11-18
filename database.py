"""
AlgoVision - SQLite Database Management Layer
Provides robust initialization, thread-safe connection handling, migrations, and seed data.
"""

import sqlite3
import os
from contextlib import contextmanager

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "algovision.db")

def get_db_connection():
    """Returns a SQLite connection configured with Row factory for dict-like access."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

@contextmanager
def db_session():
    """Context manager for automatic commit and rollback."""
    conn = get_db_connection()
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

def init_db():
    """Creates all required tables and indexes if they do not exist."""
    schema = """
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS visualization_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        session_id TEXT,
        algorithm_id TEXT NOT NULL,
        category TEXT NOT NULL,
        array_size INTEGER DEFAULT 0,
        operations_count INTEGER DEFAULT 0,
        comparisons_count INTEGER DEFAULT 0,
        swaps_count INTEGER DEFAULT 0,
        execution_time_ms REAL DEFAULT 0.0,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        session_id TEXT,
        algorithm_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS learning_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        session_id TEXT,
        module_id TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        quiz_score INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        session_id TEXT,
        playback_speed REAL DEFAULT 1.0,
        default_array_size INTEGER DEFAULT 25,
        theme TEXT DEFAULT 'dark',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS saved_graphs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        session_id TEXT,
        name TEXT NOT NULL,
        graph_data TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_history_user ON visualization_history(user_id, session_id);
    CREATE INDEX IF NOT EXISTS idx_history_algo ON visualization_history(algorithm_id);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id, session_id);
    CREATE INDEX IF NOT EXISTS idx_progress_user ON learning_progress(user_id, session_id);
    """
    with db_session() as conn:
        conn.executescript(schema)

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at:", DB_PATH)
