import { Campaign, CampaignMetrics, calculateMetrics } from "@/types/campaign";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CampaignCardProps {
  campaign: Campaign;
  onRemove: (id: string) => void;
}

function formatCurrency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatPercent(v: number) {
  return v.toFixed(1) + "%";
}

function MetricItem({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="text-center">
      <p className="metric-label">{label}</p>
      <p className={`metric-value ${color || "text-foreground"}`}>{value}</p>
    </div>
  );
}

export function CampaignCard({ campaign, onRemove }: CampaignCardProps) {
  const m: CampaignMetrics = calculateMetrics(campaign);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="card-shine rounded-xl border bg-card p-5 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-card-foreground">{campaign.name}</h3>
          <span className="inline-block mt-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {campaign.channel}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(campaign.id)}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span>Investimento: <strong className="text-foreground">{formatCurrency(campaign.investment)}</strong></span>
        <span>Receita: <strong className="text-foreground">{formatCurrency(campaign.revenue)}</strong></span>
        <span>Cliques: <strong className="text-foreground">{campaign.clicks}</strong></span>
        <span>Leads: <strong className="text-foreground">{campaign.leads}</strong></span>
        <span>Vendas: <strong className="text-foreground">{campaign.sales}</strong></span>
      </div>

      <div className="border-t pt-4">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          <MetricItem label="ROI" value={formatPercent(m.roi)} color={m.roi >= 0 ? "text-success" : "text-destructive"} />
          <MetricItem label="ROAS" value={m.roas.toFixed(2) + "x"} color={m.roas >= 1 ? "text-success" : "text-destructive"} />
          <MetricItem label="CPL" value={formatCurrency(m.cpl)} />
          <MetricItem label="CPA" value={formatCurrency(m.cpa)} />
          <MetricItem label="Conversão" value={formatPercent(m.conversionRate)} />
        </div>
      </div>
    </motion.div>
  );
}
