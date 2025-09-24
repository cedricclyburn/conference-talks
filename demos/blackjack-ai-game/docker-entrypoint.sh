#!/bin/sh

# Set sensible defaults so the container works out of the box.
: "${VITE_USE_LOCAL_AI:=true}"
: "${VITE_LLAMA_STACK_ENDPOINT:=}"

# Inject runtime env vars into the static build so the UI picks them up.
ENV_VARS='
    ${VITE_LLAMA_STACK_ENDPOINT}
    ${VITE_USE_LOCAL_AI}
'

envsubst "$ENV_VARS" < /usr/share/nginx/html/index.html > /tmp/index.html && \
cp /tmp/index.html /usr/share/nginx/html/index.html && \
rm -f /tmp/index.html

exec "$@"