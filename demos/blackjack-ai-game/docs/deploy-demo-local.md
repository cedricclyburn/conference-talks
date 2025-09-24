# Local Container Demo: Blackjack + Llama Stack + Ollama

This walkthrough gets the entire demo running locally with containers so you can mirror the OpenShift experience on your laptop.

## Prerequisites

- Podman 4.6+ or Docker 24+
- [Ollama](https://ollama.com/download) (running locally with GPU or CPU support)
- Internet access to pull container images (Quay.io + docker.io)

> **Tip:** Commands below use `podman`. Swap with `docker` if you prefer.

## 1. Start Ollama and preload the model

```bash
ollama run llama3.2:3b --keepalive 60m
```

## 2. Run Llama Stack

```bash
podman run --rm -it \
  --name blackjack-llamastack \
  -p 8321:8321 \
  -v ~/.llama:/root/.llama \
  llamastack/distribution-starter \
  --port 8321 \
  --env OLLAMA_URL=http://host.containers.internal:11434
```

## 3. Run the blackjack UI

```bash
podman run --rm -it \
  --name blackjack-game \
  -p 8080:8080 \
  quay.io/cclyburn/blackjack-ai-game:latest
```

Then open http://localhost:8080 to play.

## 4. Smoke test Llama Stack

```bash
curl -s http://localhost:8321/v1/inference/chat-completion \
  -H 'Content-Type: application/json' \
  -d '{"model_id":"ollama/llama3.2:3b","messages":[{"role":"user","content":"Say hello"}]}'
```

## 5. Tear down

```bash
podman stop blackjack-game blackjack-llamastack
```

Troubleshooting tips:
- First call to Ollama can take 30–60 seconds while the model warms up.
- Replace `host.containers.internal` with your machine IP if Podman/Docker can’t resolve it.
- Try `ollama run llama3.2:3b --keepalive 60m` if the container says the model is unloaded.