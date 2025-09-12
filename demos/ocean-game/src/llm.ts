import type { BackendType } from './types';

export interface LlmRequestOptions {
  baseUrl: string;
  model: string;
  backend: BackendType; // 'openai' for vLLM; 'ollama' for llama.cpp
  prompt: string;
  signal?: AbortSignal;
}

export async function generateNoise(opts: LlmRequestOptions): Promise<string> {
  const { backend } = opts;
  if (backend === 'openai') {
    return generateViaOpenAICompatible(opts);
  }
  return generateViaOllama(opts);
}

async function generateViaOpenAICompatible(opts: LlmRequestOptions): Promise<string> {
  const url = `${opts.baseUrl.replace(/\/$/, '')}/v1/chat/completions`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: opts.model,
      temperature: 0.9,
      max_tokens: 16,
      messages: [
        { role: 'system', content: 'You output only playful onomatopoeic sounds and emojis.' },
        { role: 'user', content: opts.prompt }
      ]
    }),
    signal: opts.signal
  });
  if (!res.ok) throw new Error(`OpenAI API error ${res.status}`);
  const data = await res.json();
  const text: string | undefined = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty completion');
  return text.trim();
}

async function generateViaOllama(opts: LlmRequestOptions): Promise<string> {
  const url = `${opts.baseUrl.replace(/\/$/, '')}/api/generate`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: opts.model,
      prompt: `${opts.prompt}\nAnswer with short onomatopoeic sounds and emojis only.`,
      stream: false,
      options: { temperature: 0.9, num_predict: 16 }
    }),
    signal: opts.signal
  });
  if (!res.ok) throw new Error(`Ollama API error ${res.status}`);
  const data = await res.json();
  const text: string | undefined = data?.response;
  if (!text) throw new Error('Empty response');
  return text.trim();
}


