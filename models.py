"""
AlgoVision - Data Access Models & Business Logic
Handles database queries, secure authentication, user state, and learning tracking.
"""

from werkzeug.security import generate_password_hash, check_password_hash
from database import db_session
import json

class UserModel:
    @staticmethod
    def create_user(username, email, password):
        """Registers a new user with securely hashed password."""
        hashed = generate_password_hash(password)
        with db_session() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
                (username.strip(), email.strip().lower(), hashed)
            )
            return cursor.lastrowid

    @staticmethod
    def get_by_id(user_id):
        with db_session() as conn:
            row = conn.execute("SELECT id, username, email, created_at FROM users WHERE id = ?", (user_id,)).fetchone()
            return dict(row) if row else None

    @staticmethod
    def get_by_username_or_email(identifier):
        with db_session() as conn:
            row = conn.execute(
                "SELECT * FROM users WHERE username = ? OR email = ?",
                (identifier.strip(), identifier.strip().lower())
            ).fetchone()
            return dict(row) if row else None

    @staticmethod
    def verify_password(stored_hash, candidate_password):
        return check_password_hash(stored_hash, candidate_password)


class HistoryModel:
    @staticmethod
    def record_run(user_id, session_id, algorithm_id, category, array_size, operations_count, comparisons_count, swaps_count, execution_time_ms):
        with db_session() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO visualization_history 
                (user_id, session_id, algorithm_id, category, array_size, operations_count, comparisons_count, swaps_count, execution_time_ms)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (user_id, session_id, algorithm_id, category, array_size, operations_count, comparisons_count, swaps_count, execution_time_ms))
            return cursor.lastrowid

    @staticmethod
    def get_recent(user_id=None, session_id=None, limit=10):
        with db_session() as conn:
            if user_id:
                rows = conn.execute("""
                    SELECT * FROM visualization_history 
                    WHERE user_id = ? 
                    ORDER BY completed_at DESC LIMIT ?
                """, (user_id, limit)).fetchall()
            elif session_id:
                rows = conn.execute("""
                    SELECT * FROM visualization_history 
                    WHERE session_id = ? AND user_id IS NULL 
                    ORDER BY completed_at DESC LIMIT ?
                """, (session_id, limit)).fetchall()
            else:
                rows = conn.execute("""
                    SELECT * FROM visualization_history 
                    ORDER BY completed_at DESC LIMIT ?
                """, (limit,)).fetchall()
            return [dict(r) for r in rows]

    @staticmethod
    def get_aggregate_stats(user_id=None, session_id=None):
        with db_session() as conn:
            where_clause = "user_id = ?" if user_id else ("session_id = ? AND user_id IS NULL" if session_id else "1=1")
            param = (user_id,) if user_id else ((session_id,) if session_id else ())
            
            row = conn.execute(f"""
                SELECT 
                    COUNT(*) as total_visualizations,
                    COUNT(DISTINCT algorithm_id) as unique_algorithms,
                    COALESCE(SUM(operations_count), 0) as total_operations,
                    COALESCE(SUM(comparisons_count), 0) as total_comparisons
                FROM visualization_history
                WHERE {where_clause}
            """, param).fetchone()
            return dict(row) if row else {
                "total_visualizations": 0,
                "unique_algorithms": 0,
                "total_operations": 0,
                "total_comparisons": 0
            }


class BookmarkModel:
    @staticmethod
    def toggle(user_id, session_id, algorithm_id):
        with db_session() as conn:
            where_sql = "user_id = ? AND algorithm_id = ?" if user_id else "session_id = ? AND user_id IS NULL AND algorithm_id = ?"
            param = (user_id, algorithm_id) if user_id else (session_id, algorithm_id)
            existing = conn.execute(f"SELECT id FROM bookmarks WHERE {where_sql}", param).fetchone()
            if existing:
                conn.execute(f"DELETE FROM bookmarks WHERE id = ?", (existing["id"],))
                return {"bookmarked": False}
            else:
                conn.execute(
                    "INSERT INTO bookmarks (user_id, session_id, algorithm_id) VALUES (?, ?, ?)",
                    (user_id, session_id, algorithm_id)
                )
                return {"bookmarked": True}

    @staticmethod
    def get_all(user_id=None, session_id=None):
        with db_session() as conn:
            if user_id:
                rows = conn.execute("SELECT algorithm_id, created_at FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC", (user_id,)).fetchall()
            elif session_id:
                rows = conn.execute("SELECT algorithm_id, created_at FROM bookmarks WHERE session_id = ? AND user_id IS NULL ORDER BY created_at DESC", (session_id,)).fetchall()
            else:
                rows = []
            return [dict(r) for r in rows]


class LearningProgressModel:
    @staticmethod
    def update_progress(user_id, session_id, module_id, completed=1, quiz_score=None):
        with db_session() as conn:
            where_sql = "user_id = ? AND module_id = ?" if user_id else "session_id = ? AND user_id IS NULL AND module_id = ?"
            param = (user_id, module_id) if user_id else (session_id, module_id)
            existing = conn.execute(f"SELECT id, quiz_score FROM learning_progress WHERE {where_sql}", param).fetchone()
            
            score_to_save = quiz_score if quiz_score is not None else (existing["quiz_score"] if existing else 0)
            
            if existing:
                conn.execute("""
                    UPDATE learning_progress 
                    SET completed = ?, quiz_score = ?, updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?
                """, (completed, score_to_save, existing["id"]))
            else:
                conn.execute("""
                    INSERT INTO learning_progress (user_id, session_id, module_id, completed, quiz_score)
                    VALUES (?, ?, ?, ?, ?)
                """, (user_id, session_id, module_id, completed, score_to_save))

    @staticmethod
    def get_progress(user_id=None, session_id=None):
        with db_session() as conn:
            if user_id:
                rows = conn.execute("SELECT module_id, completed, quiz_score, updated_at FROM learning_progress WHERE user_id = ?", (user_id,)).fetchall()
            elif session_id:
                rows = conn.execute("SELECT module_id, completed, quiz_score, updated_at FROM learning_progress WHERE session_id = ? AND user_id IS NULL", (session_id,)).fetchall()
            else:
                rows = []
            return {r["module_id"]: dict(r) for r in rows}


class GraphModel:
    @staticmethod
    def save_graph(user_id, session_id, name, graph_data):
        with db_session() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO saved_graphs (user_id, session_id, name, graph_data)
                VALUES (?, ?, ?, ?)
            """, (user_id, session_id, name, json.dumps(graph_data)))
            return cursor.lastrowid

    @staticmethod
    def get_graphs(user_id=None, session_id=None):
        with db_session() as conn:
            if user_id:
                rows = conn.execute("SELECT id, name, graph_data, created_at FROM saved_graphs WHERE user_id = ? ORDER BY created_at DESC", (user_id,)).fetchall()
            elif session_id:
                rows = conn.execute("SELECT id, name, graph_data, created_at FROM saved_graphs WHERE session_id = ? AND user_id IS NULL ORDER BY created_at DESC", (session_id,)).fetchall()
            else:
                rows = []
            result = []
            for r in rows:
                item = dict(r)
                try:
                    item["graph_data"] = json.loads(item["graph_data"])
                except Exception:
                    pass
                result.append(item)
            return result

    @staticmethod
    def delete_graph(graph_id, user_id=None, session_id=None):
        with db_session() as conn:
            if user_id:
                conn.execute("DELETE FROM saved_graphs WHERE id = ? AND user_id = ?", (graph_id, user_id))
            elif session_id:
                conn.execute("DELETE FROM saved_graphs WHERE id = ? AND session_id = ?", (graph_id, session_id))
