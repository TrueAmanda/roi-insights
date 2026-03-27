import { useState } from "react";
import { Campaign } from "@/types/campaign";
import { CampaignForm } from "@/components/CampaignForm";
import { CampaignCard } from "@/components/CampaignCard";
import { AIInsights } from "@/components/AIInsights";
import { PDFExport } from "@/components/PDFExport";
import { AnimatePresence } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const addCampaign = (c: Campaign) => setCampaigns((prev) => [...prev, c]);
  const removeCampaign = (id: string) => setCampaigns((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 max-w-5xl">
          <Link to="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">AdMetrics</span>
          </Link>
          <div className="flex items-center gap-3">
            <PDFExport campaigns={campaigns} />
            <Link
              to="/readme"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard de Campanhas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Adicione campanhas para calcular e comparar métricas de performance.
          </p>
        </div>

        <CampaignForm onAdd={addCampaign} />

        {campaigns.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <AnimatePresence>
              {campaigns.map((c) => (
                <CampaignCard key={c.id} campaign={c} onRemove={removeCampaign} />
              ))}
            </AnimatePresence>
          </div>
        )}

        <AIInsights campaigns={campaigns} />

        {campaigns.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Nenhuma campanha adicionada ainda.</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Preencha o formulário acima para começar.</p>
          </div>
        )}
      </main>
    </div>
  );
}
