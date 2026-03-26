import { Campaign, calculateMetrics } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";

interface PDFExportProps {
  campaigns: Campaign[];
}

function formatCurrency(v: number) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

export function PDFExport({ campaigns }: PDFExportProps) {
  const exportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("AdMetrics - Relatorio de Campanhas", 14, 22);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(`Gerado em ${new Date().toLocaleDateString("pt-BR")} as ${new Date().toLocaleTimeString("pt-BR")}`, 14, 30);

    doc.setDrawColor(200);
    doc.line(14, 34, pageWidth - 14, 34);

    let y = 42;

    campaigns.forEach((c, i) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      const m = calculateMetrics(c);

      doc.setTextColor(0);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(`${i + 1}. ${c.name}`, 14, y);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text(`Canal: ${c.channel}`, 14, y + 6);

      y += 14;
      doc.setTextColor(60);
      doc.setFontSize(10);

      const data = [
        [`Investimento: ${formatCurrency(c.investment)}`, `Receita: ${formatCurrency(c.revenue)}`],
        [`Cliques: ${c.clicks}`, `Leads: ${c.leads}`, `Vendas: ${c.sales}`],
        [`ROI: ${m.roi.toFixed(1)}%`, `ROAS: ${m.roas.toFixed(2)}x`, `CPL: ${formatCurrency(m.cpl)}`],
        [`CPA: ${formatCurrency(m.cpa)}`, `Conversao: ${m.conversionRate.toFixed(1)}%`],
      ];

      data.forEach((row) => {
        doc.text(row.join("   |   "), 14, y);
        y += 6;
      });

      y += 6;
      doc.setDrawColor(230);
      doc.line(14, y - 3, pageWidth - 14, y - 3);
    });

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
