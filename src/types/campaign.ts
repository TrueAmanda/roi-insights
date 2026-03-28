export interface Campaign {
  id: string;
  name: string;
  channel: string;
  investment: number;
  clicks: number;
  leads: number;
  sales: number;
  revenue: number;
  roiGoal?: number;
}

export interface CampaignMetrics {
  roi: number;
  roas: number;
  cpl: number;
  cpa: number;
  conversionRate: number;
}

export function calculateMetrics(c: Campaign): CampaignMetrics {
  const roi = c.investment > 0 ? ((c.revenue - c.investment) / c.investment) * 100 : 0;
  const roas = c.investment > 0 ? c.revenue / c.investment : 0;
  const cpl = c.leads > 0 ? c.investment / c.leads : 0;
  const cpa = c.sales > 0 ? c.investment / c.sales : 0;
  const conversionRate = c.clicks > 0 ? (c.sales / c.clicks) * 100 : 0;
  return { roi, roas, cpl, cpa, conversionRate };
}
