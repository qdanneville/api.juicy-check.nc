#!/bin/sh
set -e

echo "Running drizzle-kit push..."
npx drizzle-kit push

echo "Starting application..."
exec node dist/main
