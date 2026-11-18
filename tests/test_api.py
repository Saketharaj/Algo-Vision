"""
AlgoVision - API Integration & Backend Test Suite
Tests authentication, algorithm catalog retrieval, history logging, progress tracking, and benchmarks.
"""

import unittest
import json
import os
import tempfile
import database
import app as flask_app

class AlgoVisionApiTestCase(unittest.TestCase):
    def setUp(self):
        # Configure test database
        self.db_fd, self.temp_db_path = tempfile.mkstemp()
        database.DB_PATH = self.temp_db_path
        database.init_db()

        flask_app.app.config["TESTING"] = True
        flask_app.app.config["SECRET_KEY"] = "test_secret_key"
        self.client = flask_app.app.test_client()

    def tearDown(self):
        os.close(self.db_fd)
        if os.path.exists(self.temp_db_path):
            os.remove(self.temp_db_path)

    def test_index_page(self):
        res = self.client.get("/")
        self.assertEqual(res.status_code, 200)
        self.assertIn(b"AlgoVision", res.data)
        self.assertIn(b"view-workspace", res.data)
        self.assertIn(b"view-compare", res.data)
        self.assertIn(b"view-performance", res.data)
        self.assertIn(b"view-library", res.data)
        self.assertIn(b"view-learn", res.data)
        self.assertIn(b"view-dashboard", res.data)

    def test_static_css_and_js_served(self):
        res_css = self.client.get("/static/css/main.css")
        self.assertEqual(res_css.status_code, 200)
        self.assertIn(b"--accent-cyan", res_css.data)

        res_js = self.client.get("/static/js/app.js")
        self.assertEqual(res_js.status_code, 200)
        self.assertIn(b"DOMContentLoaded", res_js.data)

        res_vendor = self.client.get("/static/vendor/chart.umd.js")
        self.assertEqual(res_vendor.status_code, 200)

    def test_algorithms_catalog(self):
        res = self.client.get("/api/algorithms")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "success")
        self.assertIn("bubble-sort", data["algorithms"])
        self.assertIn("quick-sort", data["algorithms"])
        self.assertIn("binary-search", data["algorithms"])
        self.assertIn("dijkstra", data["algorithms"])
        self.assertIn("a-star", data["algorithms"])

    def test_single_algorithm(self):
        res = self.client.get("/api/algorithms/merge-sort")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["algorithm"]["name"], "Merge Sort")
        self.assertEqual(data["algorithm"]["category"], "sorting")
        self.assertEqual(data["algorithm"]["timeComplexity"]["worst"], "O(N log N)")

    def test_auth_workflow(self):
        # Register user
        reg_res = self.client.post("/api/auth/register", json={
            "username": "coder_jane",
            "email": "jane@example.com",
            "password": "securepassword123"
        })
        self.assertEqual(reg_res.status_code, 201)

        # Check me
        me_res = self.client.get("/api/auth/me")
        me_data = me_res.get_json()
        self.assertTrue(me_data["authenticated"])
        self.assertEqual(me_data["user"]["username"], "coder_jane")

        # Logout
        logout_res = self.client.post("/api/auth/logout")
        self.assertEqual(logout_res.status_code, 200)

        # Check me again
        me_res2 = self.client.get("/api/auth/me")
        self.assertFalse(me_res2.get_json()["authenticated"])

        # Login
        login_res = self.client.post("/api/auth/login", json={
            "identifier": "jane@example.com",
            "password": "securepassword123"
        })
        self.assertEqual(login_res.status_code, 200)

    def test_history_and_bookmarks(self):
        # Record run as guest or user
        post_hist = self.client.post("/api/history", json={
            "algorithm_id": "quick-sort",
            "category": "sorting",
            "array_size": 30,
            "operations_count": 142,
            "comparisons_count": 88,
            "swaps_count": 54,
            "execution_time_ms": 12.5
        })
        self.assertEqual(post_hist.status_code, 201)

        # Retrieve history
        get_hist = self.client.get("/api/history")
        self.assertEqual(get_hist.status_code, 200)
        hist_data = get_hist.get_json()
        self.assertGreaterEqual(len(hist_data["history"]), 1)
        self.assertEqual(hist_data["history"][0]["algorithm_id"], "quick-sort")

        # Toggle bookmark
        bm_res = self.client.post("/api/bookmarks", json={"algorithm_id": "quick-sort"})
        self.assertEqual(bm_res.status_code, 200)
        self.assertTrue(bm_res.get_json()["bookmarked"])

        # Toggle again -> should remove
        bm_res2 = self.client.post("/api/bookmarks", json={"algorithm_id": "quick-sort"})
        self.assertFalse(bm_res2.get_json()["bookmarked"])

    def test_progress_tracking(self):
        res = self.client.post("/api/progress", json={
            "module_id": "big-o-foundations",
            "completed": 1,
            "quiz_score": 100
        })
        self.assertEqual(res.status_code, 200)

        get_res = self.client.get("/api/progress")
        prog_data = get_res.get_json()
        self.assertIn("big-o-foundations", prog_data["progress"])
        self.assertEqual(prog_data["progress"]["big-o-foundations"]["quiz_score"], 100)

    def test_benchmark_endpoint(self):
        res = self.client.post("/api/benchmark/run", json={
            "algorithms": ["bubble-sort", "insertion-sort"],
            "sizes": [10, 20],
            "distribution": "random"
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("bubble-sort", data["results"])
        self.assertEqual(len(data["results"]["bubble-sort"]), 2)

if __name__ == "__main__":
    unittest.main()
