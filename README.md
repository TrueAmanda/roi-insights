# AdMetrics

> Pare de adivinhar o ROI das suas campanhas.

AdMetrics é uma ferramenta web para gestores de tráfego e analistas de marketing calcularem, visualizarem e compararem o desempenho de campanhas de mídia paga — com apoio de inteligência artificial.

**[Acessar o app](https://ad-metrics-ai.lovable.app)** · **[Sobre o produto](https://ad-metrics-ai.lovable.app/readme)**

---

## O problema

Gestores de tráfego e times de marketing lidam diariamente com múltiplas campanhas em canais diferentes. O processo atual é sempre o mesmo: exportar dados, abrir planilha, calcular manualmente ROI, ROAS, CPL e CPA, formatar um relatório e enviar pro cliente.

Esse fluxo consome tempo, gera erros e atrasa decisões. Sem uma visão consolidada e comparativa, o dinheiro investido pode estar sendo mal alocado sem que ninguém perceba a tempo.

## Por que isso importa

Em marketing digital, cada real mal alocado é um real perdido. A diferença entre uma campanha lucrativa e uma que drena orçamento está nos números — mas só se você souber lê-los rápido o suficiente pra agir.

Segundo o HubSpot State of Marketing 2026, **medir e provar ROI é a maior dor de 33% dos líderes de marketing globalmente.** O AdMetrics foi construído diretamente sobre essa dor.

## A solução

O AdMetrics elimina esse atrito. O usuário insere os dados de uma campanha (investimento, cliques, leads, vendas e receita), e o app:

- Calcula automaticamente **ROI, ROAS, CPL, CPA e Taxa de Conversão**
- Permite adicionar múltiplas campanhas e **comparar lado a lado**
- Exibe **gráficos comparativos** de ROI e ROAS entre campanhas
- Permite definir **metas de ROI** por campanha com indicador visual de atingimento
- Usa IA para **interpretar os resultados** e gerar um score de 0 a 10 com insights acionáveis
- Exporta um **relatório em PDF** pronto para apresentar ao cliente
- Oferece **modo apresentação** — layout fullscreen limpo para reuniões com clientes
- **Salva o histórico automaticamente** via localStorage, sem necessidade de cadastro

Sem login. Sem planilha. Em menos de um minuto.

## Quem usa e quando

**Usuário principal:** gestor de tráfego pago ou analista de marketing em agência ou freelancer.

**Momento de uso:** no fechamento semanal, antes de uma reunião de performance com o cliente, ou no momento de decidir onde realocar orçamento entre campanhas.

**O que muda no processo:** em vez de abrir planilhas, fazer contas e formatar um PDF manualmente, o usuário insere os dados, compara visualmente, recebe um insight da IA e já tem um relatório profissional — tudo em menos de um minuto.

## Funcionalidades
 
| Funcionalidade | Descrição |
|---|---|
| Cálculo automático | ROI, ROAS, CPL, CPA e Taxa de Conversão |
| Comparação visual | Gráficos de barras comparando campanhas |
| Meta de ROI | Indicador verde/vermelho por campanha |
| Score com IA | Nota de 0 a 10 + insight analítico |
| Exportar PDF | Relatório profissional em um clique |
| Modo apresentação | Fullscreen limpo para reuniões |
| Histórico | Campanhas salvas automaticamente |
| Sem autenticação | Abre e usa, sem cadastro |
 
## Stack
 
- **Frontend:** React + TypeScript + Tailwind CSS
- **Build:** Vite
- **Gráficos:** Recharts
- **IA:** Gemini API
- **Deploy:** Lovable
 
## Como rodar localmente
 
```bash
# Clone o repositório
git clone https://github.com/TrueAmanda/roi-insights.git
cd roi-insights
 
# Instale as dependências
npm install
 
# Configure a variável de ambiente
cp .env.example .env
# Adicione sua chave da Gemini API em VITE_GEMINI_KEY
 
# Rode o projeto
npm run dev
```
 
## Visão de produto
 
O AdMetrics foi construído como um MVP funcional com foco em resolver uma dor real e validada. Em um contexto de produto dentro de uma agência ou time de marketing, o roadmap natural priorizaria três frentes:
 
**Redução de fricção na entrada de dados:**
O maior ponto de atrito hoje é o input manual. A próxima evolução seria a integração com Meta Ads API e Google Ads API para importar dados automaticamente — eliminando o trabalho repetitivo e abrindo espaço para análise em tempo real. Isso transformaria o AdMetrics de uma ferramenta de relatório em uma ferramenta de monitoramento contínuo.
 
**Profundidade analítica:**
Com histórico acumulado, seria possível oferecer benchmarks por canal e por setor, alertas automáticos quando uma campanha cair abaixo da meta, e uma visão consolidada por período — semana, mês, trimestre. A IA passaria a identificar padrões ao longo do tempo, não apenas analisar snapshots isolados.
 
**Entrega para o cliente:**
A última milha do trabalho de uma agência é o relatório pro cliente. O roadmap incluiria personalização do PDF com logo e cores da conta, um link de compartilhamento com visualização pública e modo leitura, e um histórico de versões para acompanhar a evolução das campanhas ao longo do relacionamento.

---

Feito por Amanda Ferreira
