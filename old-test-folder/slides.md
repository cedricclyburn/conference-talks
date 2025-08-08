---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: I've Got 99 Problems, but LLMs Ain't One!
exportFilename: AI4 Vegas 2025 - 99 Problems LLMs Aint One
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 229
routerMode: hash
---

<div translate-x--14>

<h1>
  I've Got 99 Problems, but LLMs Ain't One!
</h1>

<div class="text-2xl mt-8 opacity-80">
  Self-hosting AI: From Local to Production
</div>

<div class="text-lg mt-6">
  Cedric Clyburn<br/>
  Senior Developer Advocate, Red Hat<br/>
  KCD NYC Organizer
</div>

</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <div class="text-sm opacity-70">AI4 Vegas 2025</div>
  </div>
</div>

---
layout: center
class: text-center
glowSeed: 300
---

# The Open Source AI Revolution

<div class="mt-8 text-6xl">🚀🤖✨</div>

<div v-click class="mt-8 text-xl opacity-80">
  We're living in the golden age of AI
</div>

<div v-click class="mt-4 text-lg opacity-70">
  But are you in control of your AI destiny?
</div>

---
layout: center
class: text-center
glowSeed: 150
---

# Open Source Models Are EVERYWHERE!

<div class="mt-6 grid grid-cols-5 gap-3">
  <div v-click="1" class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
    <div class="text-xl mb-1">🦙</div>
    <div class="font-bold text-sm">Llama 3.3</div>
    <div class="text-xs opacity-70">70B params</div>
    <div class="text-xs text-green-400">GPT-4 level</div>
  </div>
  <div v-click="2" class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-3 border border-blue-500/30">
    <div class="text-xl mb-1">🧠</div>
    <div class="font-bold text-sm">DeepSeek-R1</div>
    <div class="text-xs opacity-70">Reasoning</div>
    <div class="text-xs text-blue-400">o1 competitor</div>
  </div>
  <div v-click="3" class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-3 border border-green-500/30">
    <div class="text-xl mb-1">⚡</div>
    <div class="font-bold text-sm">Qwen 3</div>
    <div class="text-xs opacity-70">Multilingual</div>
    <div class="text-xs text-green-400">Code + Math</div>
  </div>
  <div v-click="4" class="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-3 border border-orange-500/30">
    <div class="text-xl mb-1">💎</div>
    <div class="font-bold text-sm">Gemma 2</div>
    <div class="text-xs opacity-70">Google</div>
    <div class="text-xs text-orange-400">Efficient</div>
  </div>
  <div v-click="5" class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg p-3 border border-indigo-500/30">
    <div class="text-xl mb-1">🌟</div>
    <div class="font-bold text-sm">Ministral</div>
    <div class="text-xs opacity-70">Mistral</div>
    <div class="text-xs text-indigo-400">8B power</div>
  </div>
</div>

<div v-click="6" class="mt-6 grid grid-cols-3 gap-4 text-center">
  <div class="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-4 border border-red-500/30">
    <div class="text-3xl font-bold text-red-400">500+</div>
    <div class="text-sm">Models in 2024</div>
  </div>
  <div class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30">
    <div class="text-3xl font-bold text-blue-400">90%</div>
    <div class="text-sm">Match GPT-4 quality</div>
  </div>
  <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
    <div class="text-3xl font-bold text-green-400">FREE</div>
    <div class="text-sm">Commercial usage</div>
  </div>
</div>

<div v-click="7" class="mt-6 text-lg opacity-80">
  The question isn't <em>"Can I get an LLM?"</em><br/>
  It's <em>"How do I run it MY way, on MY infrastructure?"</em>
</div>

<div v-click="8" class="mt-4 text-center bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
  <div class="text-sm">🔥 <strong>December 2024:</strong> DeepSeek-R1 reasoning model released - matches o1 performance, completely open!</div>
</div>

---
class: py-10
glowSeed: 100
---

# Today's AI Reality: Pick Your Poison 🤔

<div v-click class="mb-6 text-center bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 max-w-3xl mx-auto">
  <div class="text-lg font-bold text-orange-400 mb-2">📊 The Great Migration</div>
  <div class="text-sm">With <span class="text-orange-400 font-bold">83% of organizations</span> moving workloads back to private cloud or on-premises for privacy and cost concerns, AI is no different!</div>
</div>

<div class="mt-6 grid grid-cols-3 gap-4">

<v-clicks>

<div class="border-2 border-blue-500/30 rounded-lg overflow-hidden bg-blue-500/10 backdrop-blur-sm">
  <div class="flex items-center bg-blue-500/20 backdrop-blur px-3 py-2">
    <div class="i-carbon:cloud text-blue-300 text-lg mr-2" />
    <div class="font-semibold text-sm">Model Labs</div>
  </div>
  <div class="px-3 py-3">
    <div class="flex flex-col gap-2">
      <div class="text-center mb-2">
        <div class="text-xl">🏢</div>
        <div class="text-xs font-medium">OpenAI, Anthropic, etc.</div>
      </div>
      <div class="flex items-center gap-2 text-green-400">
        <div class="i-carbon:checkmark-outline text-xs" />
        <span class="text-xs">Easy to get started</span>
      </div>
      <div class="flex items-center gap-2 text-green-400">
        <div class="i-carbon:checkmark-outline text-xs" />
        <span class="text-xs">No infrastructure needed</span>
      </div>
      <div class="flex items-center gap-2 text-red-400">
        <div class="i-carbon:close text-xs" />
        <span class="text-xs">$$$$ costs pile up</span>
      </div>
      <div class="flex items-center gap-2 text-red-400">
        <div class="i-carbon:close text-xs" />
        <span class="text-xs">Zero customization</span>
      </div>
      <div class="flex items-center gap-2 text-red-400">
        <div class="i-carbon:close text-xs" />
        <span class="text-xs">Data leaves your control</span>
      </div>
    </div>
  </div>
</div>

<div class="border-2 border-purple-500/30 rounded-lg overflow-hidden bg-purple-500/10 backdrop-blur-sm">
  <div class="flex items-center bg-purple-500/20 backdrop-blur px-3 py-2">
    <div class="i-carbon:cloud-satellite text-purple-300 text-lg mr-2" />
    <div class="font-semibold text-sm">Hyperscalers</div>
  </div>
  <div class="px-3 py-3">
    <div class="flex flex-col gap-2">
      <div class="text-center mb-2">
        <div class="text-xl">☁️</div>
        <div class="text-xs font-medium">AWS, Azure, GCP</div>
      </div>
      <div class="flex items-center gap-2 text-green-400">
        <div class="i-carbon:checkmark-outline text-xs" />
        <span class="text-xs">Managed infrastructure</span>
      </div>
      <div class="flex items-center gap-2 text-green-400">
        <div class="i-carbon:checkmark-outline text-xs" />
        <span class="text-xs">Some customization</span>
      </div>
      <div class="flex items-center gap-2 text-red-400">
        <div class="i-carbon:close text-xs" />
        <span class="text-xs">Vendor lock-in</span>
      </div>
      <div class="flex items-center gap-2 text-red-400">
        <div class="i-carbon:close text-xs" />
        <span class="text-xs">Expensive GPU hours</span>
      </div>
      <div class="flex items-center gap-2 text-red-400">
        <div class="i-carbon:close text-xs" />
        <span class="text-xs">Limited model choice</span>
      </div>
    </div>
  </div>
</div>

<div class="border-2 border-green-500/30 rounded-lg overflow-hidden bg-green-500/10 backdrop-blur-sm">
  <div class="flex items-center bg-green-500/20 backdrop-blur px-3 py-2">
    <div class="i-carbon:home text-green-300 text-lg mr-2" />
    <div class="font-semibold text-sm">Self-Hosting / Sovereign AI</div>
  </div>
  <div class="px-3 py-3">
    <div class="flex flex-col gap-2">
      <div class="text-center mb-2">
        <div class="text-xl">🏠</div>
        <div class="text-xs font-medium">Your infrastructure, your rules</div>
      </div>
      <div class="flex items-center gap-2 text-green-400">
        <div class="i-carbon:checkmark-outline text-xs" />
        <span class="text-xs">Complete control & sovereignty</span>
      </div>
      <div class="flex items-center gap-2 text-green-400">
        <div class="i-carbon:checkmark-outline text-xs" />
        <span class="text-xs">Data never leaves</span>
      </div>
      <div class="flex items-center gap-2 text-green-400">
        <div class="i-carbon:checkmark-outline text-xs" />
        <span class="text-xs">Predictable costs</span>
      </div>
      <div class="flex items-center gap-2 text-green-400">
        <div class="i-carbon:checkmark-outline text-xs" />
        <span class="text-xs">No vendor lock-in</span>
      </div>
      <div class="flex items-center gap-2 text-yellow-400">
        <div class="i-carbon:warning-alt text-xs" />
        <span class="text-xs">Was complex... until now!</span>
      </div>
    </div>
  </div>
</div>

</v-clicks>

</div>

<div v-click class="mt-8 text-center">
  <div class="text-xl text-green-400 font-bold">
    🎯 But what if I told you self-hosting doesn't have to be hard?
  </div>
</div>

---
layout: center
class: text-center
glowSeed: 175
---

# Enter: Private & Sovereign AI 🏛️

<div class="mt-8 text-3xl">🔐 + 🤖 = 💪</div>

<div v-click class="mt-8 grid grid-cols-2 gap-8 max-w-4xl mx-auto">
  <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-6 border border-blue-500/30">
    <div class="text-4xl mb-4">🔒</div>
    <div class="font-bold text-xl mb-3">Private AI</div>
    <div class="text-left space-y-2">
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span class="text-sm">Your data never leaves</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span class="text-sm">Custom fine-tuning</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span class="text-sm">Compliance ready</span>
      </div>
    </div>
  </div>
  
  <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/30">
    <div class="text-4xl mb-4">👑</div>
    <div class="font-bold text-xl mb-3">Sovereign AI</div>
    <div class="text-left space-y-2">
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span class="text-sm">Infrastructure independence</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span class="text-sm">No vendor lock-in</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span class="text-sm">Cost transparency</span>
      </div>
    </div>
  </div>
</div>

<div v-click class="mt-8 text-xl text-green-400 font-bold">
  Today, you'll learn how to set this up and control your AI journey! 🚀
</div>

---
layout: center
class: text-center
glowSeed: 200
---

# What We'll Cover Today 📋

<div class="mt-8 grid grid-cols-2 gap-6 max-w-4xl mx-auto text-left">

<v-clicks>

<div class="space-y-4">
  <div class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">🌊</div>
      <div class="font-bold">The Open Source Wave</div>
    </div>
    <div class="text-sm opacity-80">Why open models are winning</div>
  </div>

  <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">🏗️</div>
      <div class="font-bold">From Local to Production</div>
    </div>
    <div class="text-sm opacity-80">Transformers → Ollama → vLLM</div>
  </div>
</div>

<div class="space-y-4">
  <div class="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-orange-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">✂️</div>
      <div class="font-bold">Cut Costs in Half</div>
    </div>
    <div class="text-sm opacity-80">Quantization & optimization</div>
  </div>

  <div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">🚀</div>
      <div class="font-bold">Live Demos</div>
    </div>
    <div class="text-sm opacity-80">See it working in real-time</div>
  </div>
</div>

</v-clicks>

</div>

<div v-click class="mt-8 text-lg opacity-80">
  By the end: You'll know how to run any LLM, anywhere, affordably 💪
</div>

---
layout: center
class: text-center
glowSeed: 250
---

# The 2024 Open Source AI Explosion 💥

<div class="mt-8 text-6xl">📊</div>

<div class="mt-8 grid grid-cols-3 gap-6 max-w-5xl mx-auto">

<v-clicks>

<div class="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg p-6 border border-red-500/30">
  <div class="text-4xl mb-3">🦙</div>
  <div class="font-bold text-xl mb-2">Meta's Llama</div>
  <div class="text-sm space-y-1">
    <div>• Llama 3.1/3.3 (8B→405B)</div>
    <div>• Code Llama</div>
    <div>• Commercial friendly</div>
  </div>
</div>

<div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-6 border border-blue-500/30">
  <div class="text-4xl mb-3">🧠</div>
  <div class="font-bold text-xl mb-2">DeepSeek</div>
  <div class="text-sm space-y-1">
    <div>• DeepSeek-V3 (671B)</div>
    <div>• DeepSeek-R1 (reasoning)</div>
    <div>• Cost-effective training</div>
  </div>
</div>

<div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-6 border border-green-500/30">
  <div class="text-4xl mb-3">⚡</div>
  <div class="font-bold text-xl mb-2">Alibaba Qwen</div>
  <div class="text-sm space-y-1">
    <div>• Qwen 2.5/3 series</div>
    <div>• Multilingual powerhouse</div>
    <div>• Vision + audio models</div>
  </div>
</div>

<div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/30">
  <div class="text-4xl mb-3">💎</div>
  <div class="font-bold text-xl mb-2">Google Gemma</div>
  <div class="text-sm space-y-1">
    <div>• Gemma 2 (2B→27B)</div>
    <div>• Instruction tuned</div>
    <div>• Hardware optimized</div>
  </div>
</div>

<div class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-6 border border-yellow-500/30">
  <div class="text-4xl mb-3">🔥</div>
  <div class="font-bold text-xl mb-2">Mistral AI</div>
  <div class="text-sm space-y-1">
    <div>• Mistral Large 2</div>
    <div>• Code generation</div>
    <div>• European excellence</div>
  </div>
</div>

<div class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg p-6 border border-indigo-500/30">
  <div class="text-4xl mb-3">🎨</div>
  <div class="font-bold text-xl mb-2">And So Many More!</div>
  <div class="text-sm space-y-1">
    <div>• Stable Diffusion 3</div>
    <div>• FLUX.1</div>
    <div>• Whisper, CLIP, etc.</div>
  </div>
</div>

</v-clicks>

</div>

<div v-click class="mt-8 text-xl text-green-400 font-bold">
  🎯 The era of proprietary AI dominance is OVER!
</div>

---
layout: center
class: text-center
glowSeed: 180
---

# Why Open Source Models Are Winning 🏆

<div class="mt-6 text-center bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 max-w-4xl mx-auto">
  <div class="text-lg font-bold text-blue-400 mb-2">🏛️ The Sovereignty Revolution</div>
  <div class="text-sm">Nations, enterprises, and individuals are reclaiming AI control. Your data, your models, your rules.</div>
</div>

<div class="mt-8 grid grid-cols-2 gap-6 max-w-5xl mx-auto text-left">

<v-clicks>

<div class="space-y-3">
  <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
    <div class="flex items-center gap-3 mb-3">
      <div class="text-2xl">👑</div>
      <div class="font-bold">Digital Sovereignty</div>
    </div>
    <div class="space-y-2 text-sm">
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Complete infrastructure independence</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>No foreign dependency</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Regulatory compliance</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Audit every byte</span>
      </div>
    </div>
  </div>

  <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30">
    <div class="flex items-center gap-3 mb-3">
      <div class="text-2xl">🔐</div>
      <div class="font-bold">Data Fortress</div>
    </div>
    <div class="space-y-2 text-sm">
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Data never leaves your network</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>GDPR/HIPAA/SOX compliant</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Air-gapped deployments</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Zero telemetry</span>
      </div>
    </div>
  </div>
</div>

<div class="space-y-3">
  <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
    <div class="flex items-center gap-3 mb-3">
      <div class="text-2xl">💰</div>
      <div class="font-bold">Economic Freedom</div>
    </div>
    <div class="space-y-2 text-sm">
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>No per-token costs</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Unlimited usage</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Predictable budgets</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>No vendor lock-in</span>
      </div>
    </div>
  </div>

  <div class="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-orange-500/30">
    <div class="flex items-center gap-3 mb-3">
      <div class="text-2xl">🚀</div>
      <div class="font-bold">Innovation Edge</div>
    </div>
    <div class="space-y-2 text-sm">
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Custom fine-tuning</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Model architecture mods</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Specialized for your domain</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Competitive differentiation</span>
      </div>
    </div>
  </div>
</div>

</v-clicks>

</div>

<div v-click class="mt-8 text-center">
  <div class="text-xl text-yellow-400 font-bold mb-2">
    🤔 But the weights are accessible... how do we actually deploy them?
  </div>
  <div class="text-lg text-green-400">
    That's where Meta, Google, DeepSeek's production secrets come in...
  </div>
</div>

---
layout: center
class: text-center
glowSeed: 220
---

# Local to Production: Let's Try It Out! 💻→🏢

<div class="mt-8 text-4xl">💻 → 🖥️ → 🐋 → ☁️</div>

<div class="mt-8 grid grid-cols-4 gap-4 max-w-6xl mx-auto">

<v-clicks>

<div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30 h-72">
  <div class="text-3xl mb-3">🧑‍💻</div>
  <div class="font-bold text-lg mb-2">Transformers</div>
  <div class="text-xs space-y-1">
    <div>• HuggingFace ecosystem</div>
    <div>• Perfect for prototyping</div>
    <div>• Easy model loading</div>
    <div>• Research & experiments</div>
  </div>
  <div class="mt-3 bg-green-900/30 rounded px-2 py-1 text-xs font-mono">
    pip install transformers
  </div>
  <div class="mt-2 text-xs opacity-70">
    ✅ Great for: Learning, testing
  </div>
</div>

<div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30 h-72">
  <div class="text-3xl mb-3">🦙</div>
  <div class="font-bold text-lg mb-2">Ollama</div>
  <div class="text-xs space-y-1">
    <div>• Docker-like simplicity</div>
    <div>• CPU + GPU support</div>
    <div>• Built-in quantization</div>
    <div>• Local development</div>
  </div>
  <div class="mt-3 bg-blue-900/30 rounded px-2 py-1 text-xs font-mono">
    ollama run llama3.3
  </div>
  <div class="mt-2 text-xs">
    ✅ Great for: Local demos<br/>
    ⚠️ Limited: Single user, basic API
  </div>
</div>

<div class="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg p-4 border border-orange-500/30 h-72">
  <div class="text-3xl mb-3">🐋</div>
  <div class="font-bold text-lg mb-2">Ramalama</div>
  <div class="text-xs space-y-1">
    <div>• Container-native bridge</div>
    <div>• Switch llama.cpp ↔ vLLM</div>
    <div>• Production ready</div>
    <div>• Runtime flexibility</div>
  </div>
  <div class="mt-3 bg-orange-900/30 rounded px-2 py-1 text-xs font-mono">
    podman run ramalama serve
  </div>
  <div class="mt-2 text-xs">
    ✅ Great for: Local→Prod bridge<br/>
    🚀 Bonus: Easy runtime swapping
  </div>
</div>

<div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30 h-72">
  <div class="text-3xl mb-3">⚡</div>
  <div class="font-bold text-lg mb-2">vLLM</div>
  <div class="text-xs space-y-1">
    <div>• Production inference</div>
    <div>• 25x faster PyTorch</div>
    <div>• Memory optimization</div>
    <div>• Concurrent requests</div>
  </div>
  <div class="mt-3 bg-purple-900/30 rounded px-2 py-1 text-xs font-mono">
    vllm serve llama-3.3-70B
  </div>
  <div class="mt-2 text-xs">
    ✅ Great for: Production APIs<br/>
    ⚠️ Requires: GPU expertise
  </div>
</div>

</v-clicks>

</div>

<div v-click class="mt-8 text-xl text-green-400 font-bold">
  Let's see this progression in action! 🎬
</div>

---
layout: default
class: py-10
glowSeed: 250
---

# 🤗 Transformers: The Research Playground

## 📦 What is Transformers?

✅ HuggingFace's flagship library  
✅ 50,000+ pre-trained models  
✅ Unified API across model types  
✅ Perfect for prototyping  

## 🎯 Perfect For:
- Research & experimentation
- Model evaluation  
- Fine-tuning workflows
- Proof of concepts

## 💻 Code Example

```python
# Install transformers
pip install transformers torch

# Load any model in 3 lines
from transformers import pipeline
generator = pipeline("text-generation", model="meta-llama/Llama-3.3-70B")

# Generate text
result = generator("The future of AI is")
print(result[0]['generated_text'])
```

## ⚠️ Consider This:
- Can be memory hungry
- Not optimized for production  
- Single request at a time
- Great for development!

---
layout: default
class: py-10
glowSeed: 270
---

# 🦙 Ollama: Docker for LLMs

<div class="grid grid-cols-2 gap-8 mt-6">

<div>
  <div class="mb-6">
    <div class="text-2xl mb-3">📦 What is Ollama?</div>
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Docker-like simplicity for LLMs</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Built-in quantization</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>CPU & GPU acceleration</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Model library management</span>
      </div>
    </div>
  </div>

  <div class="mb-6">
    <div class="text-xl mb-3">🎯 Perfect For:</div>
    <div class="space-y-2">
      <div>• Local development</div>
      <div>• Personal AI assistants</div>
      <div>• Demos & presentations</div>
      <div>• Getting started quickly</div>
    </div>
  </div>

  <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
    <div class="flex items-center gap-2 mb-2">
      <div class="i-carbon:information text-blue-400" />
      <div class="font-bold text-blue-400">Key Features:</div>
    </div>
    <div class="text-sm space-y-1">
      <div>• Automatic model downloading</div>
      <div>• Multiple quantization levels</div>
      <div>• REST API included</div>
      <div>• Model switching in seconds</div>
    </div>
  </div>
</div>

<div>
  <div class="bg-black/30 rounded-lg p-4 font-mono text-sm">
    <div class="text-green-400 mb-2"># Install Ollama</div>
    <div class="mb-4">curl -fsSL https://ollama.ai/install.sh | sh</div>
    
    <div class="text-green-400 mb-2"># Run any model instantly</div>
    <div class="mb-4">ollama run llama3.3</div>
    
    <div class="text-green-400 mb-2"># List available models</div>
    <div class="mb-4">ollama list</div>
    
    <div class="text-green-400 mb-2"># Run with specific parameters</div>
    <div class="mb-4">ollama run llama3.3:8b-instruct-q4_0</div>
    
    <div class="text-green-400 mb-2"># API access</div>
    <div>curl http://localhost:11434/api/generate \</div>
    <div>  -d '{"model": "llama3.3", "prompt": "Hello!"}'</div>
  </div>
  
  <div class="mt-4 text-center">
    <div class="text-lg font-bold text-green-400">🚀 Ready to demo!</div>
  </div>
</div>

</div>

---
layout: default
class: py-10
glowSeed: 290
---

# ⚡ vLLM: Production-Grade Inference

<div class="grid grid-cols-2 gap-8 mt-6">

<div>
  <div class="mb-6">
    <div class="text-2xl mb-3">📦 What is vLLM?</div>
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>UC Berkeley's inference engine</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>25x faster than naive PyTorch</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Advanced memory management</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Production-ready APIs</span>
      </div>
    </div>
  </div>

  <div class="mb-6">
    <div class="text-xl mb-3">🎯 Perfect For:</div>
    <div class="space-y-2">
      <div>• High-throughput serving</div>
      <div>• Multi-user applications</div>
      <div>• API endpoints</div>
      <div>• Production workloads</div>
    </div>
  </div>

  <div class="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
    <div class="flex items-center gap-2 mb-2">
      <div class="i-carbon:rocket text-purple-400" />
      <div class="font-bold text-purple-400">Performance Features:</div>
    </div>
    <div class="text-sm space-y-1">
      <div>• PagedAttention memory optimization</div>
      <div>• Continuous batching</div>
      <div>• GPU memory pooling</div>
      <div>• Parallel sampling</div>
    </div>
  </div>
</div>

<div>
  <div class="bg-black/30 rounded-lg p-4 font-mono text-sm">
    <div class="text-green-400 mb-2"># Install vLLM</div>
    <div class="mb-4">pip install vllm</div>
    
    <div class="text-green-400 mb-2"># Start inference server</div>
    <div class="mb-4">vllm serve meta-llama/Llama-3.3-70B-Instruct \</div>
    <div class="mb-4">  --tensor-parallel-size 4</div>
    
    <div class="text-green-400 mb-2"># OpenAI-compatible API</div>
    <div>curl http://localhost:8000/v1/completions \</div>
    <div>  -H "Content-Type: application/json" \</div>
    <div>  -d '{</div>
    <div>    "model": "meta-llama/Llama-3.3-70B-Instruct",</div>
    <div>    "prompt": "Explain quantum computing",</div>
    <div>    "max_tokens": 100</div>
    <div>  }'</div>
  </div>
  
  <div class="mt-4 text-center">
    <div class="text-lg font-bold text-purple-400">🏭 Production ready!</div>
  </div>
</div>

</div>

---
layout: default
class: py-10
glowSeed: 285
---

# 🐋 Ramalama: The Container-Native Bridge

<div class="grid grid-cols-2 gap-8 mt-6">

<div>
  <div class="mb-6">
    <div class="text-2xl mb-3">🌉 What is Ramalama?</div>
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Container-native AI inference</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Switch runtimes seamlessly</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>From llama.cpp to vLLM instantly</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="i-carbon:checkmark-outline text-green-400" />
        <span>Perfect local→production bridge</span>
      </div>
    </div>
  </div>

  <div class="mb-6">
    <div class="text-xl mb-3">🎯 Perfect For:</div>
    <div class="space-y-2">
      <div>• Development to production pipeline</div>
      <div>• Testing different backends</div>
      <div>• Container-based deployments</div>
      <div>• Kubernetes scaling</div>
    </div>
  </div>

  <div class="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
    <div class="flex items-center gap-2 mb-2">
      <div class="i-carbon:information text-orange-400" />
      <div class="font-bold text-orange-400">Why Ramalama?</div>
    </div>
    <div class="text-sm space-y-1">
      <div>• No vendor lock-in to specific runtimes</div>
      <div>• Easy transition from dev to prod</div>
      <div>• Consistent container interface</div>
      <div>• Runtime optimization flexibility</div>
    </div>
  </div>
</div>

<div>
  <div class="bg-black/30 rounded-lg p-4 font-mono text-sm">
    <div class="text-green-400 mb-2"># Install Ramalama</div>
    <div class="mb-4">curl -fsSL https://raw.githubusercontent.com/containers/ramalama/main/install.sh | sh</div>
    
    <div class="text-green-400 mb-2"># Start with llama.cpp (dev)</div>
    <div class="mb-4">ramalama serve --runtime=llama.cpp meta-llama/Llama-3.3-8B</div>
    
    <div class="text-green-400 mb-2"># Switch to vLLM (production)</div>
    <div class="mb-4">ramalama serve --runtime=vllm meta-llama/Llama-3.3-8B</div>
    
    <div class="text-green-400 mb-2"># Container deployment</div>
    <div>podman run --runtime=nvidia \</div>
    <div>  quay.io/ramalama/ramalama:latest \</div>
    <div>  serve --runtime=vllm llama3.3</div>
  </div>
  
  <div class="mt-4 text-center">
    <div class="text-lg font-bold text-orange-400">🚀 Best of both worlds!</div>
  </div>
</div>

</div>

---
layout: center
class: text-center
glowSeed: 300
---

# What if I told you we could cut costs in half? ✂️💰

<div class="mt-8 text-6xl">💸➡️💰</div>

<div class="mt-6 text-center bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 max-w-4xl mx-auto">
  <div class="text-lg font-bold text-orange-400 mb-2">🏃‍♂️ The Great AI Cost Migration</div>
  <div class="text-sm">Companies are fleeing expensive cloud AI APIs. Meta, Google, DeepSeek proved you can run production AI for a fraction of the cost.</div>
</div>

<div v-click class="mt-8 grid grid-cols-3 gap-6 max-w-6xl mx-auto">
  <div class="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg p-6 border border-red-500/30">
    <div class="text-4xl mb-4">😰</div>
    <div class="font-bold text-xl mb-3">Cloud API Reality</div>
    <div class="space-y-2 text-sm">
      <div>• GPT-4: $30 per 1M tokens</div>
      <div>• 1M tokens/day = $10,950/year</div>
      <div>• Rate limits & downtime</div>
      <div>• Zero control over updates</div>
      <div>• Data leaves your premises</div>
    </div>
  </div>
  
  <div class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-6 border border-yellow-500/30">
    <div class="text-4xl mb-4">🤔</div>
    <div class="font-bold text-xl mb-3">Naive Self-Hosting</div>
    <div class="space-y-2 text-sm">
      <div>• 70B model = 140GB VRAM</div>
      <div>• 4x A100 GPUs ($32,000)</div>
      <div>• + Server, networking, cooling</div>
      <div>• Single-threaded inference</div>
      <div>• Memory inefficient</div>
    </div>
  </div>
  
  <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-6 border border-green-500/30">
    <div class="text-4xl mb-4">🎉</div>
    <div class="font-bold text-xl mb-3">Optimized Self-Hosting</div>
    <div class="space-y-2 text-sm">
      <div>• Same 70B model = 35GB VRAM</div>
      <div>• 2x RTX 4090 ($3,000 total)</div>
      <div>• 25x faster throughput</div>
      <div>• Unlimited usage</div>
      <div>• Complete data sovereignty</div>
    </div>
  </div>
</div>

<div v-click class="mt-8 text-center">
  <div class="text-3xl font-bold text-green-400 mb-2">💰 Real Savings Calculation</div>
  <div class="grid grid-cols-3 gap-4 max-w-4xl mx-auto text-sm">
    <div class="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
      <div class="font-bold text-red-400">OpenAI API</div>
      <div>$10,950/year ongoing</div>
    </div>
    <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
      <div class="font-bold text-yellow-400">Traditional Setup</div>
      <div>$35,000 one-time + hosting</div>
    </div>
    <div class="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
      <div class="font-bold text-green-400">Our Approach</div>
      <div>$3,000 one-time. Done!</div>
    </div>
  </div>
</div>

<div v-click class="mt-6 text-xl text-green-400 font-bold text-center">
  🧪 The secret ingredients: Quantization + vLLM + Open Models!
</div>

---
layout: default
class: py-10
glowSeed: 320
---

# 🔢 Quantization: The Memory Magic

## 🪄 What is Quantization?

Converting model weights from high-precision (FP16/FP32) to lower precision (INT8/INT4) while maintaining performance.

**Precision Levels:**
- **FP16:** 16 bits per weight
- **INT8:** 8 bits per weight (50% reduction)
- **INT4:** 4 bits per weight (75% reduction)

## 🎯 Benefits:
✅ Massive memory savings  
✅ Faster inference  
✅ Lower hardware requirements  
✅ Minimal quality loss  

## 💻 Code Example

```python
# Using AWQ (4-bit quantization)
pip install autoawq

# Load quantized model
from awq import AutoAWQForCausalLM
from transformers import AutoTokenizer

model = AutoAWQForCausalLM.from_quantized(
    "TheBloke/Llama-2-70B-Chat-AWQ",
    fuse_layers=True
)
```

## 📊 Real Results:
- **Llama-70B:** 140GB → 35GB (75% reduction)
- **Quality loss:** <2% on most benchmarks
- **Inference speed:** 1.5-2x faster
- **Cost savings:** 60-80%

---
layout: default
class: py-10
glowSeed: 340
---

# 🗜️ LLM Compressor: Automated Optimization

## 🤖 Neural Magic's LLM Compressor

Automated tool that applies multiple optimization techniques:

🔧 **Quantization:** INT8/INT4 weights  
✂️ **Pruning:** Remove unnecessary weights  
🗜️ **Sparsity:** Zero out redundant parameters  
🎓 **Knowledge Distillation:** Teacher→Student  

## 🎯 Why Use LLM Compressor?
- One-click optimization
- Automatic recipe selection  
- Quality-aware compression
- Multiple output formats

## 💻 Code Example

```python
# Install LLM Compressor
pip install llmcompressor

# Simple compression
from llmcompressor.transformers import oneshot

oneshot(
    model="meta-llama/Llama-3.3-70B",
    dataset="ultrachat_200k",
    output_dir="./llama-70b-compressed",
    recipe="fp8_dynamic_per_token",
    max_seq_length=2048
)
```

## ⚡ Performance Gains:
- **Memory:** Up to 4x reduction
- **Speed:** 2-3x inference speedup
- **Quality:** Minimal accuracy degradation
- **Compatibility:** Works with vLLM out of the box

---
layout: center
class: text-center
glowSeed: 360
---

# Live Demo Time! 🎬

<div class="mt-8 text-6xl">🚀</div>

<div class="mt-8 space-y-4">
  <div class="text-2xl">Let's see this progression in action:</div>
  
  <div class="grid grid-cols-2 gap-6">
    <div v-click class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30">
      <div class="text-lg font-bold mb-3">🦙 Demo 1: Ollama Quick Start</div>
      <div class="text-xs space-y-1 mb-3">
        <div>• `ollama pull llama3.3:8b-instruct-q4_0`</div>
        <div>• Compare q4_0 vs q8_0 vs f16 variants</div>
        <div>• Memory: 4.7GB → 7.2GB → 16GB</div>
        <div>• API test with curl</div>
      </div>
      <div class="bg-blue-900/30 rounded px-2 py-1 text-xs font-mono">
        htop & nvidia-smi
      </div>
    </div>
    
    <div v-click class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
      <div class="text-lg font-bold mb-3">🐋 Demo 2: Ramalama Bridge</div>
      <div class="text-xs space-y-1 mb-3">
        <div>• Start with llama.cpp runtime</div>
        <div>• Switch to vLLM without changing code</div>
        <div>• Show container deployment</div>
        <div>• Kubernetes scaling potential</div>
      </div>
      <div class="bg-green-900/30 rounded px-2 py-1 text-xs font-mono">
        ramalama serve --runtime=vllm
      </div>
    </div>
    
    <div v-click class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
      <div class="text-lg font-bold mb-3">⚡ Demo 3: vLLM Production</div>
      <div class="text-xs space-y-1 mb-3">
        <div>• Launch OpenAI-compatible server</div>
        <div>• Concurrent requests with Apache Bench</div>
        <div>• GPU memory efficiency monitoring</div>
        <div>• Throughput comparison</div>
      </div>
      <div class="bg-purple-900/30 rounded px-2 py-1 text-xs font-mono">
        ab -n 100 -c 10 http://localhost:8000/
      </div>
    </div>
    
    <div v-click class="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-orange-500/30">
      <div class="text-lg font-bold mb-3">✂️ Demo 4: Quantization Magic</div>
      <div class="text-xs space-y-1 mb-3">
        <div>• Load Llama-7B in FP16 (~14GB)</div>
        <div>• Apply INT4 quantization (~3.5GB)</div>
        <div>• Compare inference speed & quality</div>
        <div>• 75% memory reduction!</div>
      </div>
      <div class="bg-orange-900/30 rounded px-2 py-1 text-xs font-mono">
        llmcompressor.transformers.oneshot()
      </div>
    </div>
  </div>
  
  <div v-click class="mt-6 text-center bg-green-900/20 border border-green-500/30 rounded-lg p-4">
    <div class="text-lg font-bold text-green-400">📊 Real Numbers We'll See:</div>
    <div class="text-sm mt-2 grid grid-cols-3 gap-4">
      <div>Ollama: ~4.7GB RAM</div>
      <div>vLLM: 25x throughput boost</div>
      <div>Quantization: 75% savings</div>
    </div>
  </div>
</div>

---
layout: center
class: text-center
glowSeed: 380
---

# Recap: You're Now Ready! 🎓

<div class="mt-6 text-center bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
  <div class="text-lg font-bold text-green-400">🎯 Mission Accomplished: Private AI Mastery!</div>
</div>

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto text-left">

<div class="space-y-3">
  <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">🌊</div>
      <div class="font-bold">Open Source Revolution</div>
    </div>
    <div class="text-sm space-y-1">
      <div>• 500+ models in 2024, 90% match GPT-4</div>
      <div>• DeepSeek-R1 rivals o1, completely free</div>
      <div>• No more vendor lock-in!</div>
    </div>
  </div>

  <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">🛠️</div>
      <div class="font-bold">Complete Deployment Stack</div>
    </div>
    <div class="text-sm space-y-1">
      <div>• Transformers: Research & prototyping</div>
      <div>• Ollama: Local dev simplicity</div>
      <div>• Ramalama: Seamless local→prod bridge</div>
      <div>• vLLM: Production-grade inference</div>
    </div>
  </div>

  <div class="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-orange-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">⚡</div>
      <div class="font-bold">Performance Mastery</div>
    </div>
    <div class="text-sm space-y-1">
      <div>• 75% memory reduction via quantization</div>
      <div>• 25x throughput with vLLM</div>
      <div>• Sub-$3K hardware for 70B models</div>
    </div>
  </div>
</div>

<div class="space-y-3">
  <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">🏛️</div>
      <div class="font-bold">Sovereign AI Achievement</div>
    </div>
    <div class="text-sm space-y-1">
      <div>• Data never leaves your control</div>
      <div>• Complete infrastructure independence</div>
      <div>• Join the 83% moving to private cloud</div>
    </div>
  </div>

  <div class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg p-4 border border-indigo-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">💎</div>
      <div class="font-bold">Real-World Impact</div>
    </div>
    <div class="text-sm space-y-1">
      <div>• From $32K/month to $3K one-time</div>
      <div>• Custom models for your use case</div>
      <div>• Unlimited usage, no rate limits</div>
    </div>
  </div>

  <div class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
    <div class="flex items-center gap-3 mb-2">
      <div class="text-2xl">🚀</div>
      <div class="font-bold">Your Next Steps</div>
    </div>
    <div class="text-sm space-y-1">
      <div>• Start with Ollama locally</div>
      <div>• Experiment with quantization</div>
      <div>• Scale with vLLM/Ramalama</div>
      <div>• Build your AI sovereignty!</div>
    </div>
  </div>
</div>

</div>

<div class="mt-8 text-center">
  <div class="text-2xl text-green-400 font-bold mb-4">
    🎯 The Future is Open, Private, and Affordable!
  </div>
  <div class="text-lg opacity-90 mb-2">
    You now have the knowledge to run <em>any LLM</em>, <em>anywhere</em>, for a fraction of the cost.
  </div>
  <div class="text-xl font-bold text-yellow-400">
    You might have 99 problems, but LLMs ain't one! 😎
  </div>
</div>

---
layout: center
class: text-center
glowSeed: 400
---

# Thank You! 🙏

<div class="mt-8 text-4xl">🚀✨🤖</div>

<div class="mt-8 space-y-4">
  <div class="text-xl">Questions? Let's chat about your AI journey!</div>
  
  <div class="grid grid-cols-2 gap-6 max-w-2xl mx-auto text-sm">
    <div class="space-y-2">
      <div class="font-bold">Follow me:</div>
      <div>🐦 @cedricclyburn</div>
      <div>💼 LinkedIn: /in/cedricclyburn</div>
      <div>📺 YouTube: @cedricclyburn</div>
    </div>
    <div class="space-y-2">
      <div class="font-bold">Resources:</div>
      <div>🦙 ollama.ai</div>
      <div>⚡ docs.vllm.ai</div>
      <div>🗜️ llmcompressor.ai</div>
    </div>
  </div>
  
  <div class="mt-8 text-xs opacity-60">
    Slides: github.com/cedricclyburn/talks
  </div>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <div class="text-sm opacity-70">AI4 Vegas 2025</div>
  </div>
</div>