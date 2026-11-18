"""
AlgoVision - Flask Server & RESTful API Service
Author: AlgoVision Core Engineering Team
"""

import os
import uuid
import time
from flask import Flask, render_template, request, jsonify, session
from database import init_db
from models import UserModel, HistoryModel, BookmarkModel, LearningProgressModel, GraphModel
from algorithms_data import ALGORITHMS

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "algovision_secret_secure_key_2026_dsa_platform")
app.config['JSON_SORT_KEYS'] = False

# Ensure database is initialized on startup
init_db()

def get_current_actor():
    """Identifies the requesting actor: authenticated user_id or guest session_id."""
    user_id = session.get("user_id")
    guest_id = session.get("guest_id")
    if not user_id and not guest_id:
        guest_id = str(uuid.uuid4())
        session["guest_id"] = guest_id
    return user_id, guest_id

# -------------------------------------------------------------
# Frontend SPA Route
# -------------------------------------------------------------
@app.route("/")
def index():
    user_id, guest_id = get_current_actor()
    return render_template("index.html")

# -------------------------------------------------------------
# Algorithm Catalog API
# -------------------------------------------------------------
@app.route("/api/algorithms", methods=["GET"])
def get_algorithms():
    category = request.args.get("category")
    if category:
        filtered = {k: v for k, v in ALGORITHMS.items() if v.get("category") == category}
        return jsonify({"status": "success", "algorithms": filtered})
    return jsonify({"status": "success", "algorithms": ALGORITHMS})

@app.route("/api/algorithms/<algo_id>", methods=["GET"])
def get_algorithm(algo_id):
    algo = ALGORITHMS.get(algo_id)
    if not algo:
        return jsonify({"status": "error", "message": f"Algorithm '{algo_id}' not found"}), 404
    return jsonify({"status": "success", "algorithm": algo})

# -------------------------------------------------------------
# Authentication API
# -------------------------------------------------------------
@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not username or len(username) < 3:
        return jsonify({"status": "error", "message": "Username must be at least 3 characters."}), 400
    if not email or "@" not in email:
        return jsonify({"status": "error", "message": "Valid email address is required."}), 400
    if not password or len(password) < 6:
        return jsonify({"status": "error", "message": "Password must be at least 6 characters."}), 400

    if UserModel.get_by_username_or_email(username):
        return jsonify({"status": "error", "message": "Username already taken."}), 409
    if UserModel.get_by_username_or_email(email):
        return jsonify({"status": "error", "message": "Email address already registered."}), 409

    try:
        user_id = UserModel.create_user(username, email, password)
        session["user_id"] = user_id
        session["username"] = username
        return jsonify({
            "status": "success",
            "message": "Registration successful.",
            "user": {"id": user_id, "username": username, "email": email}
        }), 201
    except Exception as e:
        return jsonify({"status": "error", "message": f"Registration failed: {str(e)}"}), 500

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    identifier = data.get("identifier", "").strip()
    password = data.get("password", "")

    if not identifier or not password:
        return jsonify({"status": "error", "message": "Credentials required."}), 400

    user = UserModel.get_by_username_or_email(identifier)
    if not user or not UserModel.verify_password(user["password_hash"], password):
        return jsonify({"status": "error", "message": "Invalid username/email or password."}), 401

    session["user_id"] = user["id"]
    session["username"] = user["username"]

    return jsonify({
        "status": "success",
        "message": "Login successful.",
        "user": {"id": user["id"], "username": user["username"], "email": user["email"]}
    })

@app.route("/api/auth/logout", methods=["POST"])
def logout():
    session.pop("user_id", None)
    session.pop("username", None)
    return jsonify({"status": "success", "message": "Logged out successfully."})

@app.route("/api/auth/me", methods=["GET"])
def me():
    user_id, guest_id = get_current_actor()
    if user_id:
        user = UserModel.get_by_id(user_id)
        if user:
            return jsonify({
                "status": "success",
                "authenticated": True,
                "user": user,
                "guest_id": guest_id
            })
    return jsonify({
        "status": "success",
        "authenticated": False,
        "guest_id": guest_id
    })

# -------------------------------------------------------------
# Visualization History & Metrics API
# -------------------------------------------------------------
@app.route("/api/history", methods=["GET", "POST"])
def history():
    user_id, guest_id = get_current_actor()

    if request.method == "POST":
        data = request.get_json() or {}
        algo_id = data.get("algorithm_id")
        category = data.get("category", "sorting")
        array_size = data.get("array_size", 0)
        operations_count = data.get("operations_count", 0)
        comparisons_count = data.get("comparisons_count", 0)
        swaps_count = data.get("swaps_count", 0)
        execution_time_ms = data.get("execution_time_ms", 0.0)

        if not algo_id:
            return jsonify({"status": "error", "message": "algorithm_id is required."}), 400

        record_id = HistoryModel.record_run(
            user_id=user_id,
            session_id=guest_id,
            algorithm_id=algo_id,
            category=category,
            array_size=array_size,
            operations_count=operations_count,
            comparisons_count=comparisons_count,
            swaps_count=swaps_count,
            execution_time_ms=execution_time_ms
        )
        return jsonify({"status": "success", "record_id": record_id}), 201

    limit = request.args.get("limit", 15, type=int)
    recent = HistoryModel.get_recent(user_id=user_id, session_id=guest_id, limit=limit)
    stats = HistoryModel.get_aggregate_stats(user_id=user_id, session_id=guest_id)
    return jsonify({"status": "success", "history": recent, "stats": stats})

# -------------------------------------------------------------
# Bookmarks API
# -------------------------------------------------------------
@app.route("/api/bookmarks", methods=["GET", "POST"])
def bookmarks():
    user_id, guest_id = get_current_actor()

    if request.method == "POST":
        data = request.get_json() or {}
        algo_id = data.get("algorithm_id")
        if not algo_id:
            return jsonify({"status": "error", "message": "algorithm_id required."}), 400
        res = BookmarkModel.toggle(user_id=user_id, session_id=guest_id, algorithm_id=algo_id)
        return jsonify({"status": "success", **res})

    items = BookmarkModel.get_all(user_id=user_id, session_id=guest_id)
    return jsonify({"status": "success", "bookmarks": items})

# -------------------------------------------------------------
# Learning Progress & Quiz Score API
# -------------------------------------------------------------
@app.route("/api/progress", methods=["GET", "POST"])
def progress():
    user_id, guest_id = get_current_actor()

    if request.method == "POST":
        data = request.get_json() or {}
        module_id = data.get("module_id")
        completed = data.get("completed", 1)
        quiz_score = data.get("quiz_score")

        if not module_id:
            return jsonify({"status": "error", "message": "module_id required."}), 400

        LearningProgressModel.update_progress(
            user_id=user_id,
            session_id=guest_id,
            module_id=module_id,
            completed=completed,
            quiz_score=quiz_score
        )
        return jsonify({"status": "success", "message": "Progress recorded."})

    prog = LearningProgressModel.get_progress(user_id=user_id, session_id=guest_id)
    return jsonify({"status": "success", "progress": prog})

# -------------------------------------------------------------
# Saved Custom Graphs API
# -------------------------------------------------------------
@app.route("/api/graphs", methods=["GET", "POST", "DELETE"])
def custom_graphs():
    user_id, guest_id = get_current_actor()

    if request.method == "POST":
        data = request.get_json() or {}
        name = data.get("name", "Custom Graph").strip()
        graph_data = data.get("graph_data", {})
        graph_id = GraphModel.save_graph(user_id=user_id, session_id=guest_id, name=name, graph_data=graph_data)
        return jsonify({"status": "success", "graph_id": graph_id}), 201

    elif request.method == "DELETE":
        graph_id = request.args.get("id", type=int)
        if not graph_id:
            return jsonify({"status": "error", "message": "id required"}), 400
        GraphModel.delete_graph(graph_id, user_id=user_id, session_id=guest_id)
        return jsonify({"status": "success", "message": "Graph deleted."})

    graphs = GraphModel.get_graphs(user_id=user_id, session_id=guest_id)
    return jsonify({"status": "success", "graphs": graphs})

# -------------------------------------------------------------
# Server-side Benchmark Execution (Empirical Analysis Tool)
# -------------------------------------------------------------
@app.route("/api/benchmark/run", methods=["POST"])
def run_benchmark():
    """Runs high-precision empirical sorting performance benchmark on selected algorithms and array sizes."""
    import random
    data = request.get_json() or {}
    algorithms_to_run = data.get("algorithms", ["bubble-sort", "insertion-sort", "merge-sort", "quick-sort"])
    sizes = data.get("sizes", [20, 50, 100, 200])
    distribution = data.get("distribution", "random") # random, nearly_sorted, reversed, duplicates

    results = {}

    for size in sizes:
        # Generate base array
        if distribution == "random":
            base = [random.randint(1, 1000) for _ in range(size)]
        elif distribution == "nearly_sorted":
            base = list(range(1, size + 1))
            # swap 5% of pairs
            for _ in range(max(1, size // 20)):
                i1, i2 = random.randint(0, size - 1), random.randint(0, size - 1)
                base[i1], base[i2] = base[i2], base[i1]
        elif distribution == "reversed":
            base = list(range(size, 0, -1))
        elif distribution == "duplicates":
            base = [random.choice([10, 20, 30, 40, 50]) for _ in range(size)]
        else:
            base = [random.randint(1, 1000) for _ in range(size)]

        for algo in algorithms_to_run:
            if algo not in results:
                results[algo] = []

            arr = list(base)
            comparisons = 0
            swaps = 0
            start_t = time.perf_counter()

            if algo == "bubble-sort":
                n = len(arr)
                for i in range(n - 1):
                    swapped = False
                    for j in range(n - i - 1):
                        comparisons += 1
                        if arr[j] > arr[j + 1]:
                            arr[j], arr[j + 1] = arr[j + 1], arr[j]
                            swaps += 1
                            swapped = True
                    if not swapped:
                        break
            elif algo == "selection-sort":
                n = len(arr)
                for i in range(n - 1):
                    min_idx = i
                    for j in range(i + 1, n):
                        comparisons += 1
                        if arr[j] < arr[min_idx]:
                            min_idx = j
                    if min_idx != i:
                        arr[i], arr[min_idx] = arr[min_idx], arr[i]
                        swaps += 1
            elif algo == "insertion-sort":
                for i in range(1, len(arr)):
                    key = arr[i]
                    j = i - 1
                    while j >= 0:
                        comparisons += 1
                        if arr[j] > key:
                            arr[j + 1] = arr[j]
                            swaps += 1
                            j -= 1
                        else:
                            break
                    arr[j + 1] = key
            elif algo == "merge-sort":
                def py_merge_sort(a):
                    nonlocal comparisons, swaps
                    if len(a) <= 1:
                        return a
                    m = len(a) // 2
                    left = py_merge_sort(a[:m])
                    right = py_merge_sort(a[m:])
                    res = []
                    i = j = 0
                    while i < len(left) and j < len(right):
                        comparisons += 1
                        if left[i] <= right[j]:
                            res.append(left[i])
                            i += 1
                        else:
                            res.append(right[j])
                            j += 1
                        swaps += 1
                    res.extend(left[i:])
                    res.extend(right[j:])
                    return res
                arr = py_merge_sort(arr)
            elif algo == "quick-sort":
                def py_quick_sort(a, low, high):
                    nonlocal comparisons, swaps
                    if low < high:
                        # Lomuto
                        pivot = a[high]
                        i = low - 1
                        for j in range(low, high):
                            comparisons += 1
                            if a[j] <= pivot:
                                i += 1
                                a[i], a[j] = a[j], a[i]
                                swaps += 1
                        a[i + 1], a[high] = a[high], a[i + 1]
                        swaps += 1
                        p = i + 1
                        py_quick_sort(a, low, p - 1)
                        py_quick_sort(a, p + 1, high)
                py_quick_sort(arr, 0, len(arr) - 1)
            elif algo == "heap-sort":
                def heapify(a, n, i):
                    nonlocal comparisons, swaps
                    largest = i
                    l = 2 * i + 1
                    r = 2 * i + 2
                    if l < n:
                        comparisons += 1
                        if a[l] > a[largest]:
                            largest = l
                    if r < n:
                        comparisons += 1
                        if a[r] > a[largest]:
                            largest = r
                    if largest != i:
                        a[i], a[largest] = a[largest], a[i]
                        swaps += 1
                        heapify(a, n, largest)
                n = len(arr)
                for i in range(n // 2 - 1, -1, -1):
                    heapify(arr, n, i)
                for i in range(n - 1, 0, -1):
                    arr[0], arr[i] = arr[i], arr[0]
                    swaps += 1
                    heapify(arr, i, 0)
            elif algo == "counting-sort":
                if arr:
                    min_v, max_v = min(arr), max(arr)
                    k = max_v - min_v + 1
                    count = [0] * k
                    output = [0] * len(arr)
                    for x in arr:
                        count[x - min_v] += 1
                        swaps += 1
                    for i in range(1, k):
                        count[i] += count[i - 1]
                    for x in reversed(arr):
                        count[x - min_v] -= 1
                        output[count[x - min_v]] = x
                        swaps += 1
                    arr = output

            elapsed_ms = (time.perf_counter() - start_t) * 1000.0

            results[algo].append({
                "size": size,
                "comparisons": comparisons,
                "swaps": swaps,
                "operations": comparisons + swaps,
                "time_ms": round(elapsed_ms, 3)
            })

    return jsonify({
        "status": "success",
        "distribution": distribution,
        "results": results
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
