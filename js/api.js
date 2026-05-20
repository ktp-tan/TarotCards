// ============================================================
// API MODULE — OpenRouter AI integration for Tarot readings
// ============================================================

const API_CONFIG = {
  baseUrl: "https://openrouter.ai/api/v1/chat/completions",
  defaultModel: "google/gemini-2.5-pro",
};

const SYSTEM_PROMPT = `You are an expert, traditional Tarot reader. Strictly follow standard Rider-Waite Tarot meanings. Provide clear, insightful, and practical interpretations explaining exactly how the card answers the user's specific question. Do not give generic card meanings; tailor it entirely to the query. Write in a warm, mystical yet grounded tone — like a wise counselor speaking directly to the querent. Use 2-3 paragraphs. Do not use markdown formatting or bullet points. IMPORTANT: Always respond in the same language that the user asks the question in (e.g., if they ask in Thai, you must reply in Thai).`;

/**
 * Generate an initial single-card reading.
 */
async function generateReading(question, cardName, orientation, apiKey, model) {
  const userPrompt = `The user asked: "${question}"
They drew: "${cardName}" in the "${orientation}" position.

Provide a clear, insightful, and practical interpretation explaining exactly how this card answers their specific question. Tailor it entirely to the query.`;

  return streamCompletion(userPrompt, apiKey, model);
}

/**
 * Generate a clarifying reading that synthesizes two cards.
 */
async function generateClarifyingReading(question, card1Name, orientation1, card2Name, orientation2, apiKey, model) {
  const userPrompt = `The user originally asked: "${question}"
They first drew: "${card1Name}" in the "${orientation1}" position.
Now they drew a clarifying card: "${card2Name}" in the "${orientation2}" position.

Seamlessly weave the clarifying card's meaning into the original context. Explain how the second card deepens, modifies, or adds nuance to the original reading. Provide a synthesized, final interpretation that addresses the user's question using both cards together.`;

  return streamCompletion(userPrompt, apiKey, model);
}

/**
 * Make a streaming API call to OpenRouter and return a ReadableStream of text chunks.
 * Returns an object { reader, response } for streaming consumption.
 */
async function streamCompletion(userPrompt, apiKey, model) {
  const selectedModel = model || API_CONFIG.defaultModel;

  const response = await fetch(API_CONFIG.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.href,
      "X-Title": "Tarot Reading App",
    },
    body: JSON.stringify({
      model: selectedModel,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: userPrompt },
      ],
      stream: true,
      temperature: 0.8,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let message = `API Error (${response.status})`;
    try {
      const parsed = JSON.parse(errorBody);
      message = parsed.error?.message || message;
    } catch (_) {}
    throw new Error(message);
  }

  return response.body.getReader();
}

/**
 * Consume a streaming reader and call onChunk for each text delta.
 * Returns the full accumulated text.
 */
async function consumeStream(reader, onChunk) {
  const decoder = new TextDecoder();
  let fullText = "";
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // keep incomplete line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            throw new Error(parsed.error.message || "OpenRouter streaming error");
          }
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            onChunk(delta, fullText);
          }
        } catch (err) {
          if (err instanceof SyntaxError) {
            // skip unparseable chunks
          } else {
            throw err; // propagate API errors to the UI
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return fullText;
}
