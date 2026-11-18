# AlgoVision – Interactive Algorithm Learning & Visualization Platform

[![Engineered for CS Excellence](https://img.shields.io/badge/Platform-AlgoVision-38bdf8.svg)](#)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.1-000000.svg)](https://flask.palletsprojects.com/)
[![SQLite](https://img.shields.io/badge/Database-SQLite3-003B57.svg)](https://www.sqlite.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

**AlgoVision** is a web-based learning and experimentation platform designed for computer science students and software engineers to master Data Structures and Algorithms through real-time, deterministic visual execution.

Instead of passive diagrams or black-box animations, AlgoVision executes algorithms through an atomic step-generation engine that records comparisons, swaps, partition boundaries, and graph traversals with true bi-directional time travel, synchronized pseudocode highlighting, empirical performance benchmarking, and multi-algorithm side-by-side comparison.

---

## 1. Project Folder Structure

```
Alog-Vision/
│
├── app.py                      # Master Flask application & RESTful routing
├── database.py                 # SQLite schema initialization, connection pooling, context manager
├── models.py                   # Data access layer (User, History, Bookmarks, LearningProgress)
├── algorithms_data.py          # Academic specifications, complexities, pseudocode & multi-language code
├── requirements.txt            # Python dependencies (Flask, Werkzeug)
├── algovision.db               # SQLite database file (auto-generated)
├── README.md                   # Complete architectural & operational guide
│
├── static/
│   ├── css/
│   │   ├── main.css            # Dark developer-workspace design tokens, navbar, buttons, modals
│   │   ├── landing.css         # Hero preview, domain cards, architectural pipeline
│   │   ├── workspace.css       # Core visualizer stage, playback toolbar, line-synced code viewer
│   │   ├── compare.css         # Multi-canvas concurrent comparison grid & comparative chart
│   │   ├── library.css         # 15-algorithm explorer catalog with category/difficulty filters
│   │   ├── learn.css           # DSA theory chapters, Big-O growth graph, knowledge check quizzes
│   │   └── dashboard.css       # Verified stats, execution history table, bookmarks, progress
│   │
│   ├── js/
│   │   ├── api.js              # RESTful client layer (auth, history, bookmarks, progress)
│   │   ├── state.js            # Central reactive application state store & event bus
│   │   ├── router.js           # Single-page application hash router
│   │   ├── app.js              # Master application bootstrap orchestrator
│   │   │
│   │   ├── algorithms/
│   │   │   ├── sorting.js      # Step generators: Bubble, Selection, Insertion, Merge, Quick, Heap, Counting
│   │   │   ├── searching.js    # Step generators: Linear, Binary, Jump, Interpolation
│   │   │   └── graphs.js       # Step generators: BFS, DFS, Dijkstra, A* Search
│   │   │
│   │   ├── engine/
│   │   │   ├── playback.js     # Time-travel playback controller (Play, Pause, Step, Scrub, Speed)
│   │   │   ├── sort-engine.js  # High-DPI Canvas array bar renderer with state-based color coding
│   │   │   ├── search-engine.js# Canvas search cell renderer with pointers & range elimination
│   │   │   └── graph-engine.js # Interactive Canvas graph visualizer (drag nodes, add edges/weights)
│   │   │
│   │   ├── views/
│   │   │   ├── landing.js      # Landing page view with interactive hero preview
│   │   │   ├── workspace.js    # Core IDE visualization workspace controller
│   │   │   ├── compare.js      # Multi-algorithm side-by-side comparator
│   │   │   ├── performance.js  # Empirical performance analysis lab with Chart.js line graphs
│   │   │   ├── library.js      # Filterable algorithm card explorer
│   │   │   ├── learn.js        # Theory modules & interactive knowledge quizzes
│   │   │   ├── dashboard.js    # User & Guest learning dashboard
│   │   │   └── auth-modal.js   # Registration, Login, and Session management
│   │   │
│   │   └── vendor/
│   │       ├── chart.umd.js    # Chart.js local bundle (100% offline standalone)
│   │       └── lucide.min.js   # Lucide icons local bundle
│   │
│   └── assets/
│
├── templates/
│   └── index.html              # Master SPA HTML5 application shell
│
└── tests/
    ├── test_api.py             # Flask API and template integration test suite
    ├── test_algorithms.js      # 100-assertion algorithm verification test suite
    └── test_live_server.py     # Live socket server HTTP probe
```

---

## 2. Technologies Used

- **Frontend Core:** HTML5, CSS3, Modern JavaScript (ES6+ Modules), HTML5 Canvas with HiDPI support.
- **Visual Analytics:** Chart.js (v4.4.x UMD local bundle for performance charts, Big-O curves, and comparative bar graphs).
- **Backend Framework:** Python 3.10+, Flask 3.1.
- **Database:** SQLite3 with context-managed connections, foreign key constraints, and indexing.
- **Security:** Werkzeug secure password hashing (PBKDF2/SHA256), session-backed authentication, input sanitization.
- **Typography:** Inter (primary interface) and JetBrains Mono (code and metrics).
- **Architecture:** Decoupled Model-View-Controller with event-driven immutable step generation.

---

## 3. Features Implemented

### A. Core Visualization Engine & Workspace
- **True Time-Travel Playback:** Play, Pause, Single Step Forward, Single Step Backward, Scrubbing Slider (0 to total steps), and Restart.
- **Dynamic Speed Modulation:** Continuous slider from 20ms to 1000ms per step without desynchronization.
- **Line-Synchronized Code:** Pseudocode and multi-language reference implementations (JavaScript, Python, C++) highlight the active code statement in unison with the current execution step.
- **Custom Input Modals:** Support for entering arbitrary integer sequences, with automatic validation.
- **Live Metrics Dashboard:** Real-time counters for comparisons, array writes/swaps, and atomic operations.
- **Operation Callouts:** Plain-English, human-readable explanations displayed for every single step.

### B. 15 Fully Implemented Algorithms

#### 1. Sorting Algorithms (7)
1. **Bubble Sort:** Adjacent element comparisons, early break termination on sorted passes.
2. **Selection Sort:** Unsorted subarray minimum tracking and single-swap placement.
3. **Insertion Sort:** Key extraction and backward shifting into sorted prefixes.
4. **Merge Sort:** Recursive divide-and-conquer with auxiliary buffer merging and overwrites.
5. **Quick Sort:** Lomuto partitioning, pivot selection, and recursive sub-partition bounds.
6. **Heap Sort:** Max-Heap construction phase and root extraction with sift-down heapify.
7. **Counting Sort:** Non-comparison linear sort with frequency tallies, prefix sums, and stable output placement.

#### 2. Searching Algorithms (4)
1. **Linear Search:** Sequential element inspection on arbitrary arrays.
2. **Binary Search:** Logarithmic interval bisection with low, mid, and high pointers.
3. **Jump Search:** Block stepping by optimal $\sqrt{N}$ and linear backward scanning.
4. **Interpolation Search:** Slope-based probe index calculation for uniform key distributions.

#### 3. Graph Algorithms (4)
1. **Breadth-First Search (BFS):** FIFO queue frontier exploration, unweighted shortest path reconstruction.
2. **Depth-First Search (DFS):** Call-stack depth exploration with backtracking from dead ends.
3. **Dijkstra's Algorithm:** Min-distance greedy edge relaxation on weighted networks.
4. **A* Search Algorithm:** Euclidean distance heuristic $f(n) = g(n) + h(n)$ optimal pathfinding.

#### 4. Interactive Graph Workbench
- Click-and-drag node repositioning with boundary containment.
- Click-to-add nodes with automatic alphabetical labeling.
- Interactive edge creation with customizable edge weights.
- Designate Start and Destination/Goal nodes with distinct glowing indicators.
- Built-in topology presets: Weighted Network, Balanced Binary Tree, Cyclic Graph, and Disconnected Components.

### C. Multi-Algorithm Comparison Workbench
- Select 2 to 4 sorting algorithms to execute concurrently on the exact same array.
- Multi-canvas side-by-side animation synchronized with a single controller.
- Real-time comparison bar chart (Comparisons vs Swaps).
- Preset distributions: Uniform Random, Strictly Reversed (Worst Case), and Nearly Sorted.

### D. Empirical Performance Laboratory
- Test algorithms across scales ($N = 20, 50, 100, 200, 400$) and distribution profiles.
- Verified measurements of comparisons, writes, total operations, and CPU execution milliseconds.
- Chart.js asymptotic curves demonstrating $O(N^2)$ vs $O(N \log N)$ vs $O(N)$ growth.

### E. Algorithm Library & Explorer
- 15 algorithm cards with category tags, difficulty badges, and worst/average/space complexity pills.
- Real-time text search and category/difficulty filtering.
- One-click bookmarking system.

### F. Interactive Learning Curriculum & Quizzes
- Four comprehensive modules: Big-O Foundations, Sorting Paradigms, Searching Techniques, and Graph Theory.
- Interactive Big-O growth graph.
- Multiple-choice knowledge check quizzes with immediate answer evaluation and score tracking.

### G. User & Guest Learning Dashboard
- Verified statistics: total visualizations run, unique algorithms explored, total operations executed.
- Real execution history table with replay shortcuts.
- Bookmarked algorithm quick-launch shelf.
- Curriculum completion progress bars.
- Guest mode support with SQLite session tracking and optional registered account authentication.

---

## 4. Instructions to Install Dependencies

### Prerequisites
- Python 3.10 or higher.
- `pip` package manager.

### Installation
From the root directory of the project (`d:\Alog-Vision`):

```bash
pip install -r requirements.txt
```

*(Note: All frontend dependencies including Chart.js and Lucide are locally vendored inside `static/vendor/`, ensuring 100% offline functionality without external CDN requirements).*

---

## 5. Instructions to Run the Application

Start the Flask server:

```bash
python app.py
```

Open your browser and navigate to:

```
http://127.0.0.1:5000
```

The application loads directly into the interactive Single-Page Application (SPA) environment with guest access enabled by default.

---

## 6. Database Setup Instructions

The database initializes automatically when `app.py` is executed.

To manually re-initialize or reset the SQLite database schema:

```bash
python database.py
```

This creates `algovision.db` in the project root with the following tables:
- `users`: Registered user accounts with hashed credentials.
- `visualization_history`: Records of completed algorithm runs and metric counts.
- `bookmarks`: User and guest bookmarked algorithms.
- `learning_progress`: Module completion statuses and quiz scores.
- `user_preferences`: Playback speed and layout settings.
- `saved_graphs`: Custom graph networks created in the workspace.

---

## 7. Testing & Quality Assurance Summary

AlgoVision has been verified with two automated test suites:

### 1. Algorithm Step Correctness Suite (`tests/test_algorithms.js`)
Tests all 15 algorithms under edge conditions (already sorted, reversed, all duplicates, single element, negative numbers, missing search targets, edge indices, disconnected graph nodes):

```bash
node tests/test_algorithms.js
```
**Result:** `100/100 assertions passed with 0 errors`.

### 2. Backend & REST API Integration Suite (`tests/test_api.py`)
Tests template rendering, static asset availability, algorithm catalog responses, user registration/login, visualization history logging, bookmark toggling, progress recording, and empirical benchmarks:

```bash
python -m unittest tests/test_api.py
```
**Result:** `8/8 test cases passed in 1.288s with 0 errors`.

### 3. Live Server Probe (`tests/test_live_server.py`)
Tests real HTTP request/response cycles against the live running server:
**Result:** `100% HTTP 200 OK across all endpoints and assets`.

---

## 8. Known Limitations

1. **Counting Sort Input Domain:** Counting Sort requires integer values. Non-integer floating point numbers and extreme integer ranges ($K > 100,000$) are not supported by Counting Sort due to memory table sizing.
2. **A* Coordinate Heuristics:** In the graph visualizer, the A* algorithm heuristic calculates Euclidean pixel distance based on node coordinates. If nodes are positioned in non-Euclidean arrangements, the heuristic remains admissible with respect to Euclidean distance but may explore extra branches if edge weights deviate substantially from geometric distances.
3. **Browser Execution Timing:** In the Comparison and Performance sections, measured durations are reported in milliseconds. Because browser JavaScript engines execute in a shared runtime with garbage collection and UI event loops, microsecond-level hardware benchmarks should be interpreted comparatively rather than as absolute real-time computing benchmarks.
