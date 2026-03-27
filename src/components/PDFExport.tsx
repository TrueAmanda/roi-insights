import { Campaign, calculateMetrics } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";

interface PDFExportProps {
  campaigns: Campaign[];
}

function fmt(v: number) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(v: number) {
  return v.toFixed(1) + "%";
}

export function PDFExport({ campaigns }: PDFExportProps) {
  const exportPDF = () => {
    const doc = new jsPDF();
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const ml = 18; // margin left
    const mr = 18;
    const contentW = pw - ml - mr;

    const brandColor = [30, 64, 175] as const; // blue-800
    const lightGray = [245, 245, 250] as const;
    const medGray = [120, 120, 140] as const;
    const darkText = [25, 25, 35] as const;

    // ── Helper: new page with footer ──
    const addFooter = (pageNum: number, total: number) => {
      doc.setFontSize(8);
      doc.setTextColor(...medGray);
      doc.text(`AdMetrics  •  Relatório de Performance`, ml, ph - 10);
      doc.text(`${pageNum} / ${total}`, pw - mr, ph - 10, { align: "right" });
    };

    // ── Cover header ──
    // Top bar
    doc.setFillColor(...brandColor);
    doc.rect(0, 0, pw, 44, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("AdMetrics", ml, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Relatório de Performance de Campanhas", ml, 30);

    doc.setFontSize(9);
    doc.text(
      `Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
      ml, 38
    );

    // ── Summary box ──
    const totalInv = campaigns.reduce((s, c) => s + c.investment, 0);
    const totalRev = campaigns.reduce((s, c) => s + c.revenue, 0);
    const totalLeads = campaigns.reduce((s, c) => s + c.leads, 0);
    const totalSales = campaigns.reduce((s, c) => s + c.sales, 0);
    const overallROI = totalInv > 0 ? ((totalRev - totalInv) / totalInv) * 100 : 0;
    const overallROAS = totalInv > 0 ? totalRev / totalInv : 0;

    const summaryY = 54;
    doc.setFillColor(...lightGray);
    doc.roundedRect(ml, summaryY, contentW, 36, 3, 3, "F");

    const cols = 4;
    const colW = contentW / cols;
    const summaryItems = [
      { label: "Investimento Total", value: fmt(totalInv) },
      { label: "Receita Total", value: fmt(totalRev) },
      { label: "ROI Geral", value: fmtPct(overallROI) },
      { label: "ROAS Geral", value: overallROAS.toFixed(2) + "x" },
    ];

    summaryItems.forEach((item, i) => {
      const cx = ml + colW * i + colW / 2;
      doc.setFontSize(8);
      doc.setTextColor(...medGray);
      doc.setFont("helvetica", "normal");
      doc.text(item.label, cx, summaryY + 13, { align: "center" });

      doc.setFontSize(13);
      doc.setTextColor(...darkText);
      doc.setFont("helvetica", "bold");
      doc.text(item.value, cx, summaryY + 25, { align: "center" });
    });

    // ── Second summary row ──
    const sum2Y = summaryY + 42;
    doc.setFillColor(...lightGray);
    doc.roundedRect(ml, sum2Y, contentW, 24, 3, 3, "F");

    const sum2Items = [
      { label: "Campanhas", value: String(campaigns.length) },
      { label: "Leads Totais", value: String(totalLeads) },
      { label: "Vendas Totais", value: String(totalSales) },
      { label: "Conversão Média", value: fmtPct(totalLeads > 0 ? (totalSales / totalLeads) * 100 : 0) },
    ];

    sum2Items.forEach((item, i) => {
      const cx = ml + colW * i + colW / 2;
      doc.setFontSize(8);
      doc.setTextColor(...medGray);
      doc.setFont("helvetica", "normal");
      doc.text(item.label, cx, sum2Y + 10, { align: "center" });

      doc.setFontSize(11);
      doc.setTextColor(...darkText);
      doc.setFont("helvetica", "bold");
      doc.text(item.value, cx, sum2Y + 19, { align: "center" });
    });

    // ── Campaign cards ──
    let y = sum2Y + 34;

    campaigns.forEach((c, i) => {
      const cardH = 58;
      if (y + cardH > ph - 22) {
        doc.addPage();
        y = 22;
      }

      const m = calculateMetrics(c);

      // Card background
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(220, 220, 230);
      doc.roundedRect(ml, y, contentW, cardH, 3, 3, "FD");

      // Left accent bar
      doc.setFillColor(...brandColor);
      doc.rect(ml, y, 3, cardH, "F");

      // Campaign name
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkText);
      doc.text(`${c.name}`, ml + 10, y + 11);

      // Channel badge
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      const badgeText = c.channel;
      const badgeW = doc.getTextWidth(badgeText) + 8;
      const badgeX = ml + 10 + doc.getTextWidth(c.name) + 8;
      doc.setFillColor(230, 235, 250);
      doc.roundedRect(badgeX, y + 4, badgeW, 10, 2, 2, "F");
      doc.setTextColor(60, 80, 160);
      doc.text(badgeText, badgeX + 4, y + 11);

      // Row 1: Investment & Revenue
      const row1Y = y + 22;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...medGray);

      doc.text("Investimento", ml + 10, row1Y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkText);
      doc.text(fmt(c.investment), ml + 10, row1Y + 6);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(...medGray);
      doc.text("Receita", ml + 60, row1Y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkText);
      doc.text(fmt(c.revenue), ml + 60, row1Y + 6);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(...medGray);
      doc.text("Cliques", ml + 110, row1Y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkText);
      doc.text(String(c.clicks), ml + 110, row1Y + 6);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(...medGray);
      doc.text("Leads", ml + 140, row1Y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkText);
      doc.text(String(c.leads), ml + 140, row1Y + 6);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(...medGray);
      doc.text("Vendas", ml + 160, row1Y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkText);
      doc.text(String(c.sales), ml + 160, row1Y + 6);

      // Row 2: Metrics with colored values
      const row2Y = y + 40;
      doc.setDrawColor(235, 235, 240);
      doc.line(ml + 10, row2Y - 5, ml + contentW - 10, row2Y - 5);

      const metricsRow = [
        { label: "ROI", value: fmtPct(m.roi), good: m.roi >= 0 },
        { label: "ROAS", value: m.roas.toFixed(2) + "x", good: m.roas >= 1 },
        { label: "CPL", value: fmt(m.cpl), good: true },
        { label: "CPA", value: fmt(m.cpa), good: true },
        { label: "Conversão", value: fmtPct(m.conversionRate), good: true },
      ];

      const metricColW = (contentW - 20) / metricsRow.length;
      metricsRow.forEach((met, mi) => {
        const mx = ml + 10 + metricColW * mi;
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...medGray);
        doc.text(met.label, mx, row2Y);

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        if (met.label === "ROI" || met.label === "ROAS") {
          doc.setTextColor(met.good ? 22, 163, 74 : 220, 38, 38);
        } else {
          doc.setTextColor(...darkText);
        }
        doc.text(met.value, mx, row2Y + 7);
      });

      y += cardH + 8;
    });

    // Add page numbers
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      addFooter(p, totalPages);
    }

    doc.save("admetrics-relatorio.pdf");
  };

  if (campaigns.length === 0) return null;

  return (
    <Button onClick={exportPDF} variant="outline" className="gap-2">
      <FileDown className="h-4 w-4" />
      Exportar PDF
    </Button>
  );
}
