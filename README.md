# Kroma Web

Site de apresentação, planos comerciais e pedidos de orçamento em React e Vite.

## Desenvolvimento e verificações

    npm ci
    npm run dev
    node --test tests/commercial.test.js
    npm run build

Copie .env.example para .env.local e configure o projeto Supabase e o WhatsApp de atendimento. O formulário usa a tabela leads_kroma; se a gravação falhar ou a conexão não estiver configurada, oferece a mensagem pelo WhatsApp.

## Onde editar a oferta

- src/data/projectOptions.js: tipos de projeto, preços Pix/cartão, adicionais, prazo e número de parcelas.
- src/data/maintenancePlans.js: mensalidades, limites e descrição dos planos de manutenção.
- src/utils/projectProposal.js: condições compartilhadas entre planos, simulador e atendimento.

A oferta inicial de site institucional está em R$700 no Pix ou R$1.000 no cartão, dividido em 10 parcelas de R$100. Os demais preços são referências iniciais editáveis. A manutenção é opcional e não é somada ao custo de criação.

## Atendimento e demonstrações

As opções de pagamento compõem o pedido de orçamento. O site não processa cobranças nem coleta dados de cartão; o pagamento é combinado após a confirmação do escopo. As condições escolhidas seguem no campo escopo existente, sem mudança do esquema do banco.

A demonstração RSVP é explicitamente ilustrativa. Credenciamento real e integrações de pagamentos dependem do projeto contratado. As métricas de desempenho devem ser medidas no ambiente publicado antes de serem anunciadas.
