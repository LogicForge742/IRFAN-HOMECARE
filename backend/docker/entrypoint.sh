#!/usr/bin/env sh
set -e

echo "Waiting for database connection..."
HOST="${DB_HOST:-postgres}"
PORT="${DB_PORT:-5432}"

while ! nc -z "$HOST" "$PORT"; do
  sleep 0.5
done
echo "Database is ready!"

echo "Running database migrations..."
flask db upgrade

echo "Starting application server..."
exec "$@"
