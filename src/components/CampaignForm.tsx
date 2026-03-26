import { useState } from "react";
import { Campaign } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface CampaignFormProps {
  onAdd: (campaign: Campaign) => void;
}

const initialForm = {
  name: "",
  channel: "",
  investment: "",
  clicks: "",
  leads: "",
  sales: "",
  revenue: "",
};

export function CampaignForm({ onAdd }: CampaignFormProps) {
  const [form, setForm] = useState(initialForm);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.channel) return;
    onAdd({
      id: crypto.randomUUID(),
      name: form.name,
      channel: form.channel,
      investment: Number(form.investment) || 0,
      clicks: Number(form.clicks) || 0,
      leads: Number(form.leads) || 0,
      sales: Number(form.sales) || 0,
      revenue: Number(form.revenue) || 0,
    });
    setForm(initialForm);
  };

  const fields = [
    { key: "name", label: "Nome da campanha", type: "text", placeholder: "Ex: Black Friday 2024" },
    { key: "channel", label: "Canal", type: "text", placeholder: "Ex: Google Ads, Meta, TikTok" },
    { key: "investment", label: "Investimento (R$)", type: "number", placeholder: "0,00" },
    { key: "clicks", label: "Cliques", type: "number", placeholder: "0" },
    { key: "leads", label: "Leads", type: "number", placeholder: "0" },
    { key: "sales", label: "Vendas", type: "number", placeholder: "0" },
    { key: "revenue", label: "Receita gerada (R$)", type: "number", placeholder: "0,00" },
  ];

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">Nova Campanha</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fields.map((f) => (
          <div key={f.key} className={f.key === "name" ? "sm:col-span-2" : ""}>
            <Label htmlFor={f.key} className="mb-1.5 block text-sm font-medium text-muted-foreground">
              {f.label}
            </Label>
            <Input
              id={f.key}
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key as keyof typeof form]}
              onChange={(e) => update(f.key, e.target.value)}
              min={f.type === "number" ? 0 : undefined}
              step={f.type === "number" ? "any" : undefined}
              className="bg-background"
            />
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <Button type="submit" className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar campanha
        </Button>
      </div>
    </form>
  );
}
