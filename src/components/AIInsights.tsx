import { useState } from "react";
import { Campaign, calculateMetrics } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface AIInsightsProps {
  campaigns: Campaign[];
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 7
      ? "text-success border-success/30 bg-success/10"
      : score >= 4
        ? "text-warning border-warning/30 bg-warning/10"
        : "text-destructive border-destructive/30 bg-destructive/10";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`flex flex-col items-center justify-center rounded-xl border-2 px-4 py-2 min-w-[72px] ${color}`}
    >
      <span className="text-3xl font-bold font-mono leading-none">{score.toFixed(1)}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5 opacity-80">Score</span>
    </motion.div>
  );
}

export function AIInsights({ campaigns }: AIInsightsProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);

    const summary = campaigns.map((c) => {
      const m = calculateMetrics(c);
      return `Campanha "${c.name}" (${c.channel}): Investimento R$${c.investment}, Receita R$${c.revenue}, ROI ${m.roi.toFixed(1)}%, ROAS ${m.roas.toFixed(2)}x, CPL R$${m.cpl.toFixed(2)}, CPA R$${m.cpa.toFixed(2)}, Conversão ${m.conversionRate.toFixed(1)}%`;
    }).join("\n");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("generate-insights", {
        body: { summary },
      });

      if (fnError) throw new Error(fnError.message);
      setInsight(data?.insight || "Sem resposta.");
      setScore(typeof data?.score === "number" ? data.score : null);
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
          <motion.div
            key="insight"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-4"
          >
            {score !== null && <ScoreBadge score={score} />}
            <p className="text-sm leading-relaxed text-muted-foreground flex-1">
              {insight}
            </p>
          </motion.div>
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
