import sys
import requests

API_URL = "http://localhost:5000/api"

def run_smoke_test():
    print("=== Running Smoke Test: Payments ===")
    try:
        res = requests.get(f"{API_URL}/health", timeout=5)
        if res.status_code != 200:
            print("FAILED: API is unreachable.")
            sys.exit(1)
        print("PASSED: Payment APIs health check passed.")
    except Exception as e:
        print(f"FAILED: Payment endpoint test errored: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_smoke_test()
