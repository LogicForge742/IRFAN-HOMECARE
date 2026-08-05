import os
import sys
import shutil
import socket
from urllib.parse import urlparse

def check_postgres_conn(db_url):
    try:
        parsed = urlparse(db_url)
        host = parsed.hostname or "localhost"
        port = parsed.port or 5432
        s = socket.create_connection((host, port), timeout=3)
        s.close()
        print("Startup: PostgreSQL connection check passed.")
        return True
    except Exception as e:
        print(f"CRITICAL STARTUP ERROR: PostgreSQL is unreachable: {e}")
        return False

def check_redis_conn(redis_url):
    try:
        parsed = urlparse(redis_url)
        host = parsed.hostname or "localhost"
        port = parsed.port or 6379
        s = socket.create_connection((host, port), timeout=3)
        s.close()
        print("Startup: Redis connection check passed.")
        return True
    except Exception as e:
        print(f"CRITICAL STARTUP ERROR: Redis is unreachable: {e}")
        return False

def check_disk_space(path="/", min_gb=None):
    if min_gb is None:
        try:
            min_gb = float(os.getenv("MIN_DISK_SPACE_GB", "0.1"))
        except ValueError:
            min_gb = 0.1
    total, used, free = shutil.disk_usage(path)
    free_gb = free / (2**30)
    if free_gb < min_gb:
        print(f"CRITICAL STARTUP ERROR: Insufficient disk space on {path}: {free_gb:.2f} GB free (required min: {min_gb} GB)")
        return False
    print(f"Startup: Disk space check passed ({free_gb:.2f} GB free).")
    return True

def check_directories_and_permissions():
    uploads_dir = os.path.join(os.getcwd(), "uploads")
    os.makedirs(uploads_dir, exist_ok=True)
    if not os.access(uploads_dir, os.W_OK):
        print(f"CRITICAL STARTUP ERROR: Uploads directory {uploads_dir} is not writable.")
        return False
    print("Startup: Uploads directory permissions verified.")
    return True

def run_system_checks():
    db_url = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/irfan_db")
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    checks = [
        check_postgres_conn(db_url),
        check_redis_conn(redis_url),
        check_disk_space(),
        check_directories_and_permissions()
    ]
    
    if not all(checks):
        print("CRITICAL: One or more startup system checks failed. Terminating.")
        sys.exit(1)
