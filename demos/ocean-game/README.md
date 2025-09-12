## Ocean of Tokens

Build a small web game to stress-test LLM inference backends (llama.cpp via Ollama API vs vLLM via OpenAI API).

### Features
- Add floating sea creatures; each triggers an LLM request for playful onomatopoeia
- Backend selectable at runtime (OpenAI-compatible vs Ollama)
- HUD with metrics (creatures, inflight, avg latency, errors)
- Auto-spawn with adjustable rate

### Configuration
Build-time via Vite envs (defaults shown):

```
VITE_LLM_API=ollama
VITE_LLM_BASE=http://localhost:11434
VITE_MODEL=ramalama
```

Runtime via `public/config.js`:

```js
window.__OCEAN_CONFIG__ = {
  VITE_LLM_API: 'ollama', // or 'openai'
  VITE_LLM_BASE: 'http://localhost:11434',
  VITE_MODEL: 'ramalama'
};
```

### Local Development
```bash
npm install
npm run dev
# open http://localhost:5173
```

### Build
```bash
npm run build
npm run preview
```

### Docker
```bash
docker build -t ocean-game:latest .
docker run -p 8080:8080 ocean-game:latest
```

### OpenShift
```bash
oc apply -f kubernetes/configmap.yaml
oc apply -f kubernetes/deployment.yaml
oc apply -f kubernetes/service.yaml
oc apply -f kubernetes/route.yaml
oc apply -f kubernetes/hpa.yaml
```

Set `VITE_LLM_BASE` in `kubernetes/configmap.yaml` to your RamaLama/vLLM endpoint.

