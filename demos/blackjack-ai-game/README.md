# Blackjack AI Game

Vue-based blackjack experience that compares basic strategy against a local AI advisor. The current repo focuses on two workflows:

- **Local demo:** Containers for Ollama, Llama Stack, and this UI so anyone can run it in minutes (see [docs/deploy-demo-local.md](./docs/deploy-demo-local.md)).
- **OpenShift demo:** Kustomize overlays and scripts in `kubernetes/` + `scripts/` mirror what we deploy in OpenShift clusters.

https://blackjack-app-blackjack-ai-demo.apps.prod.rhoai.rh-aiservices-bu.com

## Quickstart (local containers)

```bash
# Launch Llama Stack (connects to local Ollama)
podman run --rm -it \
  --name blackjack-llamastack \
  -p 8321:8321 \
  -e OLLAMA_URL=http://host.containers.internal:11434 \
  -e RAMALAMA_MODEL=llama3.2:1b \
  quay.io/cclyburn/blackjack-llama-stack:latest \
  --port 8321 \
  --yaml-config /app/run-config-ollama.yaml

# Launch the game UI
podman run --rm -it \
  --name blackjack-game \
  -p 8080:8080 \
  -e VITE_USE_LOCAL_AI=true \
  -e VITE_LLAMA_STACK_ENDPOINT=http://host.containers.internal:8321 \
  quay.io/cclyburn/blackjack-ai-game:local
```

Open http://localhost:8080 to play.

## Development

```bash
npm install
npm run dev
```

Lint + type-check:

```bash
npm run lint
npm run type-check
```

## License

[MIT](http://opensource.org/licenses/MIT)