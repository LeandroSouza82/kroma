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
- src/data/offerDetails.js: escopo, inclusões, exclusões e condições dos planos, usados nos detalhes e no pedido de proposta.
- src/data/clientGuide.js: etapas de contratação e perguntas pesquisáveis por assunto, com valores derivados da oferta.
- src/utils/projectProposal.js: condições compartilhadas entre planos, simulador e atendimento.

A oferta inicial de site institucional está em R$700 no Pix ou R$999 no cartão, dividido em 10 parcelas de R$99,90. Os demais preços são referências iniciais editáveis. A manutenção é opcional e não é somada ao custo de criação.

Os limites de lançamento foram definidos para revisão comercial: institucional com uma página, cinco seções e dez imagens; evento com uma página, quatro seções e oito imagens; catálogo com uma página e vinte produtos; sistema com três telas para um fluxo de interface, sem dados ou autenticação incluídos. Todos incluem uma rodada de ajustes. As quantidades ficam em limits em projectOptions.js; solicitações mensais ficam em requests em maintenancePlans.js. Ajuste esses limites antes de publicar a oferta, se seu modelo comercial for diferente.

O botão Informações usa um diálogo nativo com fechamento por Escape e retorno de foco. O guia permite buscar sem diferenciar maiúsculas ou acentos e filtrar por assunto. No atendimento, o preço e a mensalidade ficam visíveis e o escopo completo pode ser expandido. A mensagem do WhatsApp preserva a seleção tanto no contato direto quanto na alternativa à gravação do formulário.

## Atendimento e demonstrações

As opções de pagamento compõem o pedido de orçamento. O site não processa cobranças nem coleta dados de cartão; o pagamento é combinado após a confirmação do escopo. As condições escolhidas seguem no campo escopo existente, sem mudança do esquema do banco.

A demonstração RSVP é explicitamente ilustrativa. Credenciamento real e integrações de pagamentos dependem do projeto contratado. As métricas de desempenho devem ser medidas no ambiente publicado antes de serem anunciadas.
