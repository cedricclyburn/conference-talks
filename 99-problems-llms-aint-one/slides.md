---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: I’ve Got 99 Problems, but LLMs Ain’t One!
exportFilename: Ai4 2025 - 99 Problems but LLMs Ain't One
lineNumbers: false
mdc: true
clicks: 0
glowSeed: 777
routerMode: hash
---

<div translate-x--12>

<h1>I’ve Got 99 Problems, but LLMs Ain’t One!</h1>

Cedric Clyburn · Senior Developer Advocate, Red Hat

</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-between gap-4 px-5>
    <div text-sm opacity-70>
      Ai4 Las Vegas · 2025
    </div>
    <div flex items-center gap-4>
      <!-- Placeholder logos -->
      <div w-28 h-10 bg="white/10" rounded-md flex items-center justify-center text-xs opacity-70>Ai4 Logo</div>
      <div w-10 h-10 bg="white/10" rounded-full flex items-center justify-center text-xs opacity-70>Headshot</div>
    </div>
  </div>
</div>

---
layout: intro
class: px-32
glowSeed: 205
---

<div grid grid-cols-3 gap-8 items-center>
  <div col-span-2>
    <div text-5xl font-bold>Why private and local AI?</div>
    <div mt-4 text-xl opacity-80>
      83% of organizations are moving workloads back to private cloud or on‑prem for privacy and cost.
    </div>
    <div mt-6 grid grid-cols-2 gap-3 text-sm>
      <div bg="white/5" border="1 solid white/10" rounded-lg p-3>
        <div font-bold>Control & Privacy</div>
        Keep data on your infra, control updates and versions
      </div>
      <div bg="white/5" border="1 solid white/10" rounded-lg p-3>
        <div font-bold>Cost Predictability</div>
        Avoid unpredictable egress/inference bills
      </div>
      <div bg="white/5" border="1 solid white/10" rounded-lg p-3>
        <div font-bold>Customization</div>
        Tune models, add guardrails, ship your cadence
      </div>
      <div bg="white/5" border="1 solid white/10" rounded-lg p-3>
        <div font-bold>Portability</div>
        Run on Linux, Kubernetes, or bare metal
      </div>
    </div>
  </div>
  <div>
    <div text-3xl font-semibold mb-2>About me</div>
    <div>• Cedric Clyburn</div>
    <div>• Senior Developer Advocate, Red Hat</div>
    <div>• Organizer, KCD New York City</div>
    <div>• Open source engineer</div>
    <div>• I make technical tutorials on YouTube</div>
  </div>
</div>

---
class: py-10
---

# Agenda

<div grid grid-cols-2 gap-4 mt-4>
  <div bg="white/5" border="1 solid white/10" rounded-lg p-4>
    <div i-carbon:explode text-yellow-300 mr-2 inline-block /> Explosion of open source models
  </div>
  <div bg="white/5" border="1 solid white/10" rounded-lg p-4>
    <div i-carbon:face-dissatisfied mr-2 inline-block /> Why hosted APIs aren’t always enough
  </div>
  <div bg="white/5" border="1 solid white/10" rounded-lg p-4>
    <div i-carbon:edge-cluster mr-2 inline-block /> Private & sovereign AI options
  </div>
  <div bg="white/5" border="1 solid white/10" rounded-lg p-4>
    <div i-carbon:list mr-2 inline-block /> How to deploy: local → production
  </div>
  <div bg="white/5" border="1 solid white/10" rounded-lg p-4>
    <div i-carbon:flow-modeler mr-2 inline-block /> Transformers in 90 seconds
  </div>
  <div bg="white/5" border="1 solid white/10" rounded-lg p-4>
    <div i-carbon:colo-palette mr-2 inline-block /> Tooling: llama.cpp, vLLM
  </div>
  <div bg="white/5" border="1 solid white/10" rounded-lg p-4>
    <div i-carbon:money mr-2 inline-block /> Cut GPU cost by ~50%: quantization
  </div>
  <div bg="white/5" border="1 solid white/10" rounded-lg p-4>
    <div i-carbon:virtual-private-cloud mr-2 inline-block /> Live demos & recap
  </div>
</div>

---
class: py-10
glowSeed: 130
---

# Open Source Model Explosion

<div mt-2 grid grid-cols-3 gap-4>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Foundation models</div>
    Llama 3.x, Qwen, DeepSeek, Mistral, Gemma
  </div>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Modalities</div>
    Text, vision, audio, diffusion, multi‑modal
  </div>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Ecosystem</div>
    Tokenizers, safetensors, GGUF, serving runtimes
  </div>
</div>

<div v-click mt-6 border="2 dashed white/20" rounded-lg p-4 text-sm opacity-90>
  The weights are accessible… but how do we deploy, serve, and scale them responsibly?
  Think data gravity, GPUs/NUMA, batching, safety, updates, and SLOs.
  
</div>

---
class: py-10
glow: right
---

# Options to use LLMs today

<div grid grid-cols-3 gap-4 mt-4>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Model lab portals</div>
    + Latest models, minimal ops
    <br>− Rate limits, policy shifts, data control concerns
  </div>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Hyperscalers (managed)</div>
    + Managed scaling and tooling
    <br>− Cost surprises, limited customization, provider lock‑in
  </div>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Private/Sovereign AI</div>
    + Data control, cost governance, custom releases
    <br>− You own hardware, serving, and reliability
  </div>
</div>

---
layout: center
---

# Private and Sovereign AI

Own your stack from weights → runtime → platform.

<div grid grid-cols-3 gap-3 mt-6 text-sm>
  <div bg="white/5" rounded-lg p-3>
    <div font-bold>Infra</div>
    Linux, GPUs, Kubernetes, observability
  </div>
  <div bg="white/5" rounded-lg p-3>
    <div font-bold>Serving</div>
    llama.cpp (CPU/GGUF), vLLM (GPU), TGI, Text Gen WebUI
  </div>
  <div bg="white/5" rounded-lg p-3>
    <div font-bold>Governance</div>
    Security, access, model registries, evaluations
  </div>
</div>

---
class: py-10
glowSeed: 190
---

# Transformers in 90 seconds

<div grid grid-cols-2 gap-6 mt-4>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Key pieces</div>
    • Tokenization → embeddings
    <br>• Self‑attention with KV cache
    <br>• Feed‑forward blocks, residuals, norms
  </div>
  <div bg="white/5" rounded-lg p-4 font-mono text-xs>
    <div text-sm mb-2>Shape intuition</div>
    seq_len × hidden_dim → attention(Q,K,V) → logits → tokens
    <div mt-3 text-sm>Performance levers</div>
    • Batch + paged attention • Flash‑attention • Quantization
  </div>
</div>

---
class: py-10
clicks: 3
glowSeed: 210
---

# llama.cpp

<div grid grid-cols-2 gap-6>
  <div v-click>
    <div font-bold>What it is</div>
    High‑performance C/C++ inference for LLaMA‑family and many HF models via GGUF. Great for CPU, small GPUs, and edge.
    <div mt-4 font-bold>Strengths</div>
    <ul class="mt-1 text-sm">
      <li>• No heavyweight Python/driver stack; portable binaries</li>
      <li>• Runs offline; easy to embed</li>
      <li>• Broad quantization support (Q4_0…Q8, K‑quant)</li>
    </ul>
    <div mt-3 font-bold>Trade‑offs</div>
    <ul class="mt-1 text-sm">
      <li>• Max throughput lower than GPU servers for big models</li>
      <li>• Use GGUF conversions; some features vary by model</li>
    </ul>
  </div>
  <div v-click>
    <div font-bold mb-2>Local demo (placeholder)</div>
    <div class="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-xs">
```bash
# Download GGUF (example)
curl -L -o llama3.Q4_K_M.gguf https://huggingface.co/.../llama3.Q4_K_M.gguf

# Run with llama.cpp
./main -m llama3.Q4_K_M.gguf -n 128 -p "Why private AI?"
```
    </div>
    <div mt-2 text-xs opacity-70>
      Tip: Use GPU backends (Metal/CUDA/Vulkan) when available for speedups.
    </div>
  </div>
</div>

---
class: py-10
clicks: 3
glow: left
---

# vLLM

<div grid grid-cols-2 gap-6>
  <div v-click>
    <div font-bold>What it is</div>
    Open‑source LLM serving (UC Berkeley). High‑throughput, low‑latency GPU inference with PagedAttention and efficient KV cache.
    <div mt-4 font-bold>Strengths</div>
    <ul class="mt-1 text-sm">
      <li>• Excellent throughput with batching/continuous batching</li>
      <li>• OpenAI‑compatible server; easy clients</li>
      <li>• Works with HF models; supports tensor/quant formats</li>
    </ul>
    <div mt-3 font-bold>Trade‑offs</div>
    <ul class="mt-1 text-sm">
      <li>• Wants decent GPUs and VRAM; plan for scheduling</li>
      <li>• Operational tuning (batching, max_tokens, tensor parallel)</li>
    </ul>
  </div>
  <div v-click>
    <div font-bold mb-2>OpenAI‑compatible server (placeholder)</div>
    <div class="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-xs">
```bash
# Start vLLM server
vllm serve meta-llama/Llama-3-8B-Instruct \
  --host 0.0.0.0 --port 8000 \
  --gpu-memory-utilization 0.9 \
  --max-model-len 8192

# Query (OpenAI API)
curl http://localhost:8000/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "meta-llama/Llama-3-8B-Instruct",
    "messages": [{"role":"user","content":"Give me 3 benefits of private AI"}]
  }'
```
    </div>
    <div mt-2 text-xs opacity-70>
      Tunables: tensor/pp, max_tokens, trust_remote_code, quantized weights.
    </div>
  </div>
</div>

---
class: py-10
glowSeed: 255
---

# What if we cut costs in half?

Quantization shrinks weights and KV cache → fewer/lower‑VRAM GPUs, faster tokens/sec.

<div grid grid-cols-3 gap-4 mt-4>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Approaches</div>
    AWQ, GPTQ, GQA‑aware, INT8/INT4, FP8
  </div>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Typical wins</div>
    2× VRAM reduction, similar quality with right calibration
  </div>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Trade‑offs</div>
    Slight perplexity/accuracy hit; layer‑wise sensitivity matters
  </div>
</div>

---
class: py-10
clicks: 2
glow: right
---

# Live quantization demo (placeholder)

<div grid grid-cols-2 gap-6>
  <div v-click>
    <div font-bold>Plan</div>
    Start with FP16 Llama‑3 8B, quantize to INT4, then serve with vLLM.
    <div mt-3 font-bold>Steps</div>
    <ol class="text-sm mt-1">
      <li>1. Download model weights (HF)</li>
      <li>2. Quantize (e.g., AutoAWQ/GPTQ)</li>
      <li>3. Launch vLLM with quantized weights</li>
      <li>4. Compare latency and VRAM</li>
    </ol>
  </div>
  <div v-click>
    <div font-bold mb-2>Example commands</div>
    <div class="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-xs">
```bash
# Example: AutoAWQ quantization (illustrative)
python -m awq.entry --model meta-llama/Llama-3-8B-Instruct --wbits 4 --group-size 128 \
  --run-awq --dump-awq awq_scales --quant && echo done

# Serve the quantized model
vllm serve ./Llama-3-8B-Instruct-awq \
  --host 0.0.0.0 --port 8000 --max-model-len 8192
```
    </div>
    <div mt-2 text-xs opacity-70>
      Substitute with your preferred compressor (AutoAWQ/GPTQ/BitsAndBytes) and paths.
    </div>
  </div>
</div>

---
class: py-10
glowSeed: 320
---

# Local → Production

<div grid grid-cols-2 gap-6>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Local</div>
    • llama.cpp binary, GGUF weights
    <br>• vLLM single‑GPU serve for quick iteration
  </div>
  <div bg="white/5" rounded-lg p-4>
    <div font-bold>Production</div>
    • Kubernetes + GPU scheduling (time‑slicing/MIG)
    <br>• Autoscaling, observability, circuit‑breakers, canaries
  </div>
</div>

<div v-click mt-4 bg="white/5" rounded-lg p-4 text-sm>
  SRE checklist: health probes, request budgets, token limits, logging redaction, evals, red‑team prompts, rollout policy.
</div>

---
layout: center
---

# Takeaways

<div grid grid-cols-3 gap-4 mt-4>
  <div bg="white/5" rounded-lg p-4>Open models are thriving across sizes and modalities</div>
  <div bg="white/5" rounded-lg p-4>Private + sovereign AI gives control, privacy, and cost governance</div>
  <div bg="white/5" rounded-lg p-4>Serve locally with llama.cpp (CPU/edge) or vLLM (GPU scale)</div>
  <div bg="white/5" rounded-lg p-4>Quantization can halve GPU needs with minimal quality loss</div>
  <div bg="white/5" rounded-lg p-4>You might still have 99 problems—LLMs won’t be one</div>
</div>

---
class: py-10
---

# Thanks!

<div grid grid-cols-2 gap-8>
  <div>
    <div text-2xl font-semibold>Resources</div>
    <ul class="mt-2 text-sm">
      <li>• vLLM (OpenAI‑compatible server)</li>
      <li>• llama.cpp (GGUF inference)</li>
      <li>• Quantization: AutoAWQ, GPTQ, BitsAndBytes</li>
    </ul>
  </div>
  <div>
    <div text-2xl font-semibold>Follow</div>
    <div class="mt-2 text-sm opacity-90">YouTube, X/Twitter, GitHub</div>
    <div mt-4 w-40 h-40 bg="white/10" rounded-lg flex items-center justify-center opacity-70>QR</div>
  </div>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <div w-28 h-10 bg="white/10" rounded-md flex items-center justify-center text-xs opacity-70>Ai4 Logo</div>
  </div>
</div>


