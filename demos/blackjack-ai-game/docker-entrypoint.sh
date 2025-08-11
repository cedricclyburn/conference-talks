#!/bin/sh

# Replace environment variables in index.html at runtime
# This allows us to inject environment variables into the built application

# Use a temporary file in a writable directory
envsubst '
    ${VITE_LOCAL_AI_ENDPOINT}
    ${VITE_REMOTE_AI_ENDPOINT}
    ${VITE_REMOTE_AI_KEY}
    ${VITE_USE_LOCAL_AI}
    ${VITE_SHOW_PERFORMANCE_MONITOR}
    ${VITE_ENABLE_BALANCE_NOTIFICATIONS}
    ${VITE_NTFY_SERVER}
    ${VITE_NTFY_TOPIC}
' < /usr/share/nginx/html/index.html > /tmp/index.html && \
cp /tmp/index.html /usr/share/nginx/html/index.html && \
rm -f /tmp/index.html

# Execute the main container command
exec "$@"