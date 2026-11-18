"""
AlgoVision - Live Flask Server Probe Script
Starts server in child process, performs HTTP requests against all primary endpoints,
and shuts down cleanly.
"""

import subprocess
import time
import urllib.request
import json
import sys

def run_tests():
    print("Starting AlgoVision Flask server on http://127.0.0.1:5000...")
    proc = subprocess.Popen([sys.executable, "app.py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(2)

    base_url = "http://127.0.0.1:5000"
    endpoints = [
        ("/", 200, "text/html"),
        ("/static/css/main.css", 200, "text/css"),
        ("/static/css/workspace.css", 200, "text/css"),
        ("/static/js/app.js", 200, "application/javascript"),
        ("/static/vendor/chart.umd.js", 200, "application/javascript"),
        ("/api/algorithms", 200, "application/json"),
        ("/api/algorithms/quick-sort", 200, "application/json"),
        ("/api/auth/me", 200, "application/json"),
        ("/api/history", 200, "application/json")
    ]

    all_passed = True

    try:
        for path, expected_code, expected_content_type in endpoints:
            url = f"{base_url}{path}"
            req = urllib.request.Request(url)
            try:
                with urllib.request.urlopen(req, timeout=5) as response:
                    status = response.getcode()
                    content_type = response.headers.get("Content-Type", "")
                    content_len = len(response.read())

                    if status == expected_code:
                        print(f"  ✓ {path.ljust(35)} -> {status} OK ({content_len} bytes, {content_type.split(';')[0]})")
                    else:
                        print(f"  ❌ {path.ljust(35)} -> Got {status}, expected {expected_code}")
                        all_passed = False
            except Exception as e:
                print(f"  ❌ {path.ljust(35)} -> Failed with exception: {e}")
                all_passed = False

        # Test POST /api/benchmark/run
        post_req = urllib.request.Request(
            f"{base_url}/api/benchmark/run",
            data=json.dumps({"algorithms": ["quick-sort", "merge-sort"], "sizes": [10, 25]}).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(post_req, timeout=5) as post_res:
            res_data = json.loads(post_res.read().decode("utf-8"))
            if post_res.getcode() == 200 and res_data.get("status") == "success":
                print(f"  ✓ {'/api/benchmark/run (POST)'.ljust(35)} -> 200 OK (Results: {list(res_data['results'].keys())})")
            else:
                print(f"  ❌ {'/api/benchmark/run (POST)'.ljust(35)} -> Unexpected response: {res_data}")
                all_passed = False

    finally:
        print("Terminating server process...")
        proc.terminate()
        proc.wait(timeout=3)
        print("Server process terminated cleanly.")

    if all_passed:
        print("\n🎉 ALL ENDPOINTS AND ASSETS VERIFIED WITH 100% SUCCESS!")
    else:
        print("\n❌ Some tests failed.")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
