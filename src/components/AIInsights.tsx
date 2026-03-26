import { useState } from "react";
import { Campaign, calculateMetrics } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIInsightsProps {
  campaigns: Campaign[];
}

export function AIInsights({ campaigns }: AIInsightsProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    const apiKey = import.meta.env.VITE_OPENROUTER_KEY;
    if (!apiKey) {
      setError("Chave da API não configurada. Defina VITE_OPENROUTER_KEY.");
      return;
    }

    setLoading(true);
    setError(null);

    const summary = campaigns.map((c) => {
      const m = calculateMetrics(c);
      return `Campanha "${c.name}" (${c.channel}): Investimento R$${c.investment}, Receita R$${c.revenue}, ROI ${m.roi.toFixed(1)}%, ROAS ${m.roas.toFixed(2)}x, CPL R$${m.cpl.toFixed(2)}, CPA R$${m.cpa.toFixed(2)}, Conversão ${m.conversionRate.toFixed(1)}%`;
    }).join("\n");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          messages: [
            {
              role: "system",
              content: "Você é um analista de marketing digital experiente. Analise os dados das campanhas e gere um parágrafo curto (máximo 4 frases) com insights práticos e sugestões de otimização. Seja direto e use dados para embasar. Responda em português brasileiro.",
            },
            { role: "user", content: `Analise estas campanhas:\n${summary}` },
          ],
        }),
      });

      if (!res.ok) throw new Error(`Erro na API: ${res.status}`);
      const data = await res.json();
      setInsight(data.choices?.[0]?.message?.content || "Sem resposta.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao gerar insights.");
    } finally {
      setLoading(false);
    }
  };

  if (campaigns.length === 0) return null;

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Insights com IA
        </h2>
        <Button onClick={generate} disabled={loading} variant="outline" size="sm" className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Analisando..." : "Gerar insights"}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-destructive">
            {error}
          </motion.p>
        )}
        {insight && (
          <motion.p key="insight" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm leading-relaxed text-muted-foreground">
            {insight}
          </motion.p>
        )}
        {!insight && !error && (
          <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
            Clique em "Gerar insights" para receber uma análise inteligente das suas campanhas.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
