import sys
import requests

API_URL = "http://localhost:5000/api"

def run_smoke_test():
    print("=== Running Smoke Test: Login ===")
    try:
        res = requests.get(f"{API_URL}/health", timeout=5)
        if res.status_code != 200:
            print("FAILED: API health check failed.")
            sys.exit(1)
        print("PASSED: API is online and healthy.")
    except Exception as e:
        print(f"FAILED: Connection error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_smoke_test()
