import { Campaign, calculateMetrics } from "@/types/campaign";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { BarChart3, TrendingUp } from "lucide-react";

interface CampaignChartsProps {
  campaigns: Campaign[];
}

export function CampaignCharts({ campaigns }: CampaignChartsProps) {
  if (campaigns.length === 0) return null;

  const data = campaigns.map((c) => {
    const m = calculateMetrics(c);
    return {
      name: c.name.length > 12 ? c.name.slice(0, 12) + "…" : c.name,
      roi: parseFloat(m.roi.toFixed(1)),
      roas: parseFloat(m.roas.toFixed(2)),
    };
  });

  const roiConfig: ChartConfig = {
    roi: { label: "ROI (%)", color: "hsl(var(--primary))" },
  };

  const roasConfig: ChartConfig = {
    roas: { label: "ROAS", color: "hsl(var(--success, 142 71% 45%))" },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold">ROI por Campanha</CardTitle>
        </CardHeader>
        <CardContent className="w-full overflow-hidden">
          <ChartContainer config={roiConfig} className="h-[250px] w-full">
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <ChartTooltip
                content={<ChartTooltipContent formatter={(value) => `${value}%`} />}
              />
              <Bar dataKey="roi" fill="var(--color-roi)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <TrendingUp className="h-4 w-4 text-success" />
          <CardTitle className="text-sm font-semibold">ROAS por Campanha</CardTitle>
        </CardHeader>
        <CardContent className="w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}x`} />
              <ChartTooltip
                content={<ChartTooltipContent formatter={(value) => `${value}x`} />}
              />
              <Bar dataKey="roas" fill="hsl(var(--success, 142 71% 45%))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
