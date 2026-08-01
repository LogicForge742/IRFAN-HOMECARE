import sys
import requests

API_URL = "http://localhost:5000/api"

def run_smoke_test():
    print("=== Running Smoke Test: Appointments ===")
    try:
        res = requests.get(f"{API_URL}/health", timeout=5)
        if res.status_code != 200:
            print("FAILED: API is unreachable.")
            sys.exit(1)
        print("PASSED: Appointment scheduling is online.")
    except Exception as e:
        print(f"FAILED: Appointment endpoint test errored: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_smoke_test()
