#!/bin/sh

# Replace environment variables in index.html at runtime
# This allows us to inject environment variables into the built application

envsubst '
    ${VITE_LOCAL_AI_ENDPOINT}
    ${VITE_REMOTE_AI_ENDPOINT}
    ${VITE_REMOTE_AI_KEY}
    ${VITE_USE_LOCAL_AI}
    ${VITE_SHOW_PERFORMANCE_MONITOR}
' < /usr/share/nginx/html/index.html > /tmp/index.html && \
mv /tmp/index.html /usr/share/nginx/html/index.html

# Execute the main container command
exec "$@"