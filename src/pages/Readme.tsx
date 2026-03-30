import { Link } from "react-router-dom";
import { BarChart3, Target, Zap, Users, Clock, ArrowRight, CheckCircle2, Brain, Presentation, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function Readme() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 max-w-5xl">
          <Link to="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">AdMetrics</span>
          </Link>
          <Link to="/">
            <Button size="sm" className="gap-2">
              Abrir app <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <motion.div {...fade(0)}>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
            Ferramenta gratuita
          </span>
        </motion.div>
        <motion.h1 {...fade(0.1)} className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
          Pare de adivinhar o ROI <br className="hidden sm:block" />
          das suas campanhas.
        </motion.h1>
        <motion.p {...fade(0.2)} className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          AdMetrics calcula, compara e analisa o desempenho das suas campanhas de marketing em segundos — com apoio de inteligência artificial.
        </motion.p>
        <motion.div {...fade(0.3)} className="mt-8">
          <Link to="/">
            <Button size="lg" className="gap-2 text-base">
              Começar agora <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Problem */}
      <section className="bg-card border-y">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <motion.h2 {...fade(0)} className="text-2xl font-bold text-foreground mb-4">O problema</motion.h2>
          <motion.p {...fade(0.1)} className="text-muted-foreground leading-relaxed">
            Gestores de tráfego e marketing lidam diariamente com múltiplas campanhas em diferentes canais. 
            Calcular manualmente ROI, ROAS, CPL e CPA em planilhas consome tempo, gera erros e dificulta a 
            tomada de decisão rápida. Sem uma visão consolidada e comparativa, o dinheiro investido pode estar 
            sendo mal aplicado sem que ninguém perceba a tempo.
          </motion.p>
        </div>
      </section>

      {/* Why it matters */}
      <section className="container mx-auto max-w-3xl px-4 py-16">
        <motion.h2 {...fade(0)} className="text-2xl font-bold text-foreground mb-4">Por que isso importa</motion.h2>
        <motion.p {...fade(0.1)} className="text-muted-foreground leading-relaxed">
          Em marketing digital, cada real mal alocado é um real perdido. A diferença entre uma campanha 
          lucrativa e uma que drena orçamento está nos números — mas só se você souber lê-los. Agências e 
          gestores que não acompanham métricas em tempo real perdem oportunidades de otimização e entregam 
          relatórios imprecisos aos seus clientes.
        </motion.p>
      </section>

      {/* How it works */}
      <section className="border-y">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <motion.h2 {...fade(0)} className="text-2xl font-bold text-foreground mb-8">Como funciona</motion.h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Target, title: "Insira os dados", desc: "Preencha nome, canal, investimento, cliques, leads, vendas, receita e meta de ROI." },
              { icon: Zap, title: "Veja as métricas", desc: "ROI, ROAS, CPL, CPA e taxa de conversão são calculados automaticamente." },
              { icon: BarChart3, title: "Compare e exporte", desc: "Gráficos comparativos de ROI e ROAS entre campanhas, com exportação em PDF." },
            ].map((item, i) => (
              <motion.div key={i} {...fade(i * 0.15)} className="rounded-xl border bg-background p-5">
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto max-w-3xl px-4 py-16">
        <motion.h2 {...fade(0)} className="text-2xl font-bold text-foreground mb-6">Funcionalidades</motion.h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: BarChart3, title: "Gráficos comparativos", desc: "Visualize ROI e ROAS de todas as campanhas lado a lado em gráficos de barras." },
            { icon: CheckCircle2, title: "Meta de ROI", desc: "Defina uma meta por campanha e veja um indicador verde ou vermelho de atingimento." },
            { icon: Brain, title: "Score com IA", desc: "Receba uma nota de 0 a 10 e um insight analítico gerado por inteligência artificial." },
            { icon: Presentation, title: "Modo apresentação", desc: "Layout fullscreen limpo para usar em reuniões com clientes." },
            { icon: Save, title: "Histórico automático", desc: "Campanhas salvas automaticamente via localStorage, sem necessidade de cadastro." },
          ].map((item, i) => (
            <motion.div key={i} {...fade(i * 0.1)} className="flex items-start gap-3 rounded-xl border bg-background p-4">
              <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      <section className="container mx-auto max-w-3xl px-4 py-16">
        <motion.h2 {...fade(0)} className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" /> Para quem é
        </motion.h2>
        <motion.ul {...fade(0.1)} className="space-y-3 text-muted-foreground">
          {[
            "Gestores de tráfego pago que gerenciam múltiplas contas",
            "Analistas de marketing digital em agências",
            "Donos de e-commerce que investem em mídia paga",
            "Freelancers que precisam apresentar resultados a clientes",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </motion.ul>
      </section>

      {/* When to use */}
      <section className="bg-card border-y">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <motion.h2 {...fade(0)} className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" /> Quando usar
          </motion.h2>
          <motion.p {...fade(0.1)} className="text-muted-foreground leading-relaxed">
            Use o AdMetrics no momento de análise de resultados — seja no fechamento semanal, na reunião 
            de performance com o cliente, ou antes de decidir onde realocar orçamento. Em vez de abrir 
            planilhas complexas, você insere os dados, compara visualmente e gera um PDF profissional em 
            menos de um minuto. A IA complementa a análise com observações que poderiam passar despercebidas.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-foreground mb-3">
          Pronto para parar de chutar?
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-muted-foreground mb-8">
          Sem cadastro. Sem custo. Abra e use.
        </motion.p>
        <motion.div {...fade(0.2)}>
          <Link to="/">
            <Button size="lg" className="gap-2 text-base">
              Usar o AdMetrics agora <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        AdMetrics — Ferramenta open-source de análise de campanhas.
      </footer>
    </div>
  );
}
