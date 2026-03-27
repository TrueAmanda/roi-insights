# AdMetrics 📊

> Pare de adivinhar o ROI das suas campanhas.

AdMetrics é uma ferramenta web para gestores de tráfego e analistas de marketing calcularem, visualizarem e compararem o desempenho de campanhas de mídia paga — com apoio de inteligência artificial.

🔗 **[Acessar o app](https://admetrics.lovable.app)** · 🧠 **[Sobre o produto](/readme)**

---

## O problema

Gestores de tráfego e times de marketing lidam diariamente com múltiplas campanhas em canais diferentes. O processo atual é sempre o mesmo: exportar dados, abrir planilha, calcular manualmente ROI, ROAS, CPL e CPA, formatar um relatório e enviar pro cliente.

Esse fluxo consome tempo, gera erros e atrasa decisões. Sem uma visão consolidada e comparativa, o dinheiro investido pode estar sendo mal alocado sem que ninguém perceba a tempo.

## Por que isso importa

Em marketing digital, cada real mal alocado é um real perdido. A diferença entre uma campanha lucrativa e uma que drena orçamento está nos números — mas só se você souber lê-los rápido o suficiente pra agir.

## A solução

O AdMetrics elimina esse atrito. O usuário insere os dados de uma campanha (investimento, cliques, leads, vendas e receita), e o app:

- Calcula automaticamente **ROI, ROAS, CPL, CPA e Taxa de Conversão**
- Permite adicionar múltiplas campanhas e **comparar lado a lado**
- Usa IA para **interpretar os resultados** e gerar insights acionáveis
- Exporta um **relatório em PDF** pronto para apresentar ao cliente

Sem cadastro. Sem planilha. Em menos de um minuto.

## Quem usa e quando

**Usuário principal:** gestor de tráfego pago ou analista de marketing em agência ou freelancer.

**Momento de uso:** no fechamento semanal, antes de uma reunião de performance com o cliente, ou no momento de decidir onde realocar orçamento entre campanhas.

**O que muda no processo:** em vez de abrir planilhas, fazer contas e formatar um PDF manualmente, o usuário insere os dados, compara visualmente e já tem um relatório profissional — com a IA apontando o que merece atenção.

## Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Build:** Vite
- **IA:** Gemini API
- **Deploy:** Lovable

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/admetrics.git
cd admetrics

# Instale as dependências
npm install

# Configure a variável de ambiente
cp .env.example .env
# Adicione sua chave do OpenRouter em VITE_OPENROUTER_KEY

# Rode o projeto
npm run dev
```

## Próximas versões

Funcionalidades que adicionaria com mais tempo:

- **Histórico de campanhas** — salvar campanhas no localStorage para acompanhar evolução ao longo do tempo
- **Metas por campanha** — definir um ROI alvo e visualizar se a campanha está dentro ou fora do esperado
- **Gráficos comparativos** — visualização em barras/linhas para comparar métricas entre campanhas
- **Relatório por período** — agrupar campanhas por semana ou mês e ver performance consolidada
- **Integração com Meta Ads API** — importar dados automaticamente, eliminando o input manual
- **Modo apresentação** — visualização fullscreen limpa para compartilhar na tela durante reuniões com clientes
- **Score de campanha** — um índice calculado pela IA que classifica cada campanha de 0 a 10 com base nas métricas

---

Feito por **Amanda Ferreira**
