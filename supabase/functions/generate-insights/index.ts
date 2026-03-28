import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { summary } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY não configurada." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Você é um analista de marketing digital experiente. Analise os dados das campanhas e retorne EXATAMENTE um JSON válido no formato abaixo, sem markdown, sem blocos de código, apenas o JSON puro:

{"score": <número de 0 a 10 avaliando a performance geral>, "insight": "<parágrafo curto com máximo 4 frases contendo insights práticos e sugestões de otimização>"}

Critérios para o score:
- 8-10: ROI acima de 100% e ROAS acima de 3x
- 5-7: ROI positivo mas moderado, ou métricas mistas
- 2-4: ROI baixo ou negativo, custos altos
- 0-1: Performance muito ruim, prejuízo claro

Seja direto, use dados para embasar. Responda em português brasileiro.`,
          },
          {
            role: "user",
            content: summary,
          },
        ],
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns segundos." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "Créditos insuficientes. Adicione créditos ao workspace." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: `Erro no gateway de IA: ${response.status}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";

    // Try to parse JSON from the response
    let score: number | null = null;
    let insight = text;

    try {
      // Clean potential markdown code blocks
      const cleaned = text.replace(/```json?\s*/g, "").replace(/```\s*/g, "").trim();
      const parsed = JSON.parse(cleaned);
      if (typeof parsed.score === "number") score = Math.min(10, Math.max(0, parsed.score));
      if (typeof parsed.insight === "string") insight = parsed.insight;
    } catch {
      // If JSON parsing fails, use raw text as insight
      insight = text;
    }

    return new Response(JSON.stringify({ insight, score }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
