import { useState, useEffect } from "react";
import { Campaign } from "@/types/campaign";
import { CampaignForm } from "@/components/CampaignForm";
import { CampaignCard } from "@/components/CampaignCard";
import { AIInsights } from "@/components/AIInsights";
import { PDFExport } from "@/components/PDFExport";
import { AnimatePresence } from "framer-motion";
import { BarChart3, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Index() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  // Load campaigns from database
  useEffect(() => {
    const loadCampaigns = async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Erro ao carregar campanhas");
        console.error(error);
      } else if (data) {
        setCampaigns(
          data.map((row) => ({
            id: row.id,
            name: row.name,
            channel: row.channel,
            investment: Number(row.investment),
            clicks: row.clicks,
            leads: row.leads,
            sales: row.sales,
            revenue: Number(row.revenue),
          }))
        );
      }
      setLoading(false);
    };
    loadCampaigns();
  }, []);

  const addCampaign = async (c: Campaign) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from("campaigns")
      .insert({
        user_id: session.user.id,
        name: c.name,
        channel: c.channel,
        investment: c.investment,
        clicks: c.clicks,
        leads: c.leads,
        sales: c.sales,
        revenue: c.revenue,
      })
      .select()
      .single();

    if (error) {
      toast.error("Erro ao salvar campanha");
      console.error(error);
    } else if (data) {
      setCampaigns((prev) => [
        {
          id: data.id,
          name: data.name,
          channel: data.channel,
          investment: Number(data.investment),
          clicks: data.clicks,
          leads: data.leads,
          sales: data.sales,
          revenue: Number(data.revenue),
        },
        ...prev,
      ]);
      toast.success("Campanha salva!");
    }
  };

  const removeCampaign = async (id: string) => {
    const { error } = await supabase.from("campaigns").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao remover campanha");
      console.error(error);
    } else {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background">
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
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard de Campanhas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Adicione campanhas para calcular e comparar métricas de performance.
          </p>
        </div>

        <CampaignForm onAdd={addCampaign} />

        {loading ? (
          <p className="text-center text-muted-foreground py-8">Carregando campanhas...</p>
        ) : campaigns.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <AnimatePresence>
              {campaigns.map((c) => (
                <CampaignCard key={c.id} campaign={c} onRemove={removeCampaign} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Nenhuma campanha adicionada ainda.</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Preencha o formulário acima para começar.</p>
          </div>
        )}

        <AIInsights campaigns={campaigns} />
      </main>
    </div>
  );
}
