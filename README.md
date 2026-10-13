# Kroma Web

Site de apresentação, planos comerciais e pedidos de orçamento em React e Vite.

## Desenvolvimento e verificações

    npm ci
    npm run dev
    node --test tests/*.test.js
    npm run build

Copie .env.example para .env.local e configure o projeto Supabase e o WhatsApp de atendimento. O formulário usa a tabela leads_kroma; se a gravação falhar ou a conexão não estiver configurada, oferece a mensagem pelo WhatsApp.

## Hospedagem na Vercel

O projeto usa Vite, com instalação por `npm ci`, build por `npm run build` e saída em `dist`. Esses valores ficam em `vercel.json`; a pasta raiz é a raiz do repositório. Use Node.js 22.12 ou superior, conforme a versão instalada do Vite. O diretório `.vercel` gerado pela CLI é ignorado pelo Git.

Ao importar `LeandroSouza82/kroma`, confira a branch antes de publicar: as alterações de planos, campanha e modelos estão em `feat/planos-acessiveis-pagamentos`, no PR #1. Faça primeiro uma implantação Preview dessa branch. A branch `main` ainda contém a versão anterior; publicar a versão atual em produção depende de integrar o PR.

Configure `VITE_WHATSAPP_NUMBER` para o número de atendimento, com código do país e apenas dígitos. Para gravar os pedidos no Supabase, configure também `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nos ambientes desejados, com as permissões apropriadas na tabela `leads_kroma`. Sem essa conexão, o formulário oferece a alternativa de contato pelo WhatsApp. Variáveis `VITE_*` fazem parte do JavaScript entregue ao visitante; nunca use a chave `service_role`. Mudanças nessas variáveis exigem novo build.

Confira o plano da conta antes da publicação comercial. O [Hobby](https://vercel.com/docs/plans/hobby) é gratuito e destinado a uso pessoal não comercial. As [regras de uso](https://vercel.com/docs/limits/fair-use-guidelines) exigem Pro ou Enterprise para divulgação de serviços e sites desenvolvidos mediante pagamento. Preparar essa configuração não contrata nem altera o plano da conta.

## Onde editar a oferta

Os cards começam com a borda azul no plano recomendado. Clicar em um card ou selecionar seu controle de rádio move a borda para esse plano. A escolha de criação permanece ao alternar entre Pix e cartão; a manutenção tem uma seleção independente. A seleção visual não envia proposta nem inicia cobrança.

Todos os quatro cards de criação apresentam Pagar no Mercado Pago. Quando existe um link com o valor da forma de pagamento escolhida, o botão abre essa cobrança. Se o link ainda não foi fornecido, o botão fica desativado, com orientação para solicitar a proposta e receber o link no atendimento. No momento, faltam as cobranças de R$489,90 e R$689,90 do evento e a de R$998,90 do institucional no cartão. Os links de outros valores não são reutilizados. Os planos de manutenção permanecem com contratação por proposta.

- src/data/projectOptions.js: tipos de projeto, preços Pix/cartão, adicionais, prazo e número de parcelas.
- src/data/maintenancePlans.js: mensalidades, limites e descrição dos planos de manutenção.
- src/data/offerDetails.js: escopo, inclusões, exclusões e condições dos planos, usados nos detalhes e no pedido de proposta.
- src/data/clientGuide.js: etapas de contratação e perguntas pesquisáveis por assunto, com valores derivados da oferta.
- src/data/promotion.js: ativação, período em Brasília, preço, limites e link de pagamento da campanha de landing page.
- src/data/siteModels.js: códigos estáveis, descrições, estrutura e caminhos das imagens da galeria.
- src/utils/siteModelReference.js: referência compartilhada entre cópia, WhatsApp e escopo do pedido.
- src/utils/projectProposal.js: condições compartilhadas entre planos, simulador e atendimento.

A oferta inicial de site institucional está em R$699,90 no Pix ou R$998,90 no cartão, dividido em 10 parcelas de R$99,89. Os demais preços são referências iniciais editáveis. A manutenção é opcional e não é somada ao custo de criação.

Os preços em reais inteiros foram reduzidos em R$0,10: criação, totais no cartão, adicionais e manutenção. O banner promocional mantém R$299 à vista e 10× R$36,07 no cartão. Valores já com centavos foram mantidos. As parcelas derivam do total; quando a estimativa com prioridade não se divide igualmente em dez valores de centavos, a última parcela ajusta o arredondamento e aparece no simulador e na proposta.

Os limites de lançamento foram definidos para revisão comercial: institucional com uma página, cinco seções e dez imagens; evento com uma página, quatro seções e oito imagens; catálogo com uma página e vinte produtos; sistema com três telas para um fluxo de interface, sem dados ou autenticação incluídos. Todos incluem uma rodada de ajustes. As quantidades ficam em limits em projectOptions.js; solicitações mensais ficam em requests em maintenancePlans.js. Ajuste esses limites antes de publicar a oferta, se seu modelo comercial for diferente.

O botão Informações usa um diálogo nativo com fechamento por Escape e retorno de foco. O guia permite buscar sem diferenciar maiúsculas ou acentos e filtrar por assunto. No atendimento, o preço e a mensalidade ficam visíveis e o escopo completo pode ser expandido. A mensagem do WhatsApp preserva a seleção tanto no contato direto quanto na alternativa à gravação do formulário.

## Campanha de landing page

O banner abre na primeira visita de cada sessão enquanto a campanha estiver ativa. Depois de fechar ou solicitar a oferta, o visitante pode reabrir pela faixa abaixo da abertura do site. A identificação da campanha é usada na chave de sessionStorage; altere o id ao lançar uma nova campanha. Se o armazenamento estiver bloqueado, o fechamento funciona e uma recarga pode exibir novamente o banner.

A campanha inicial vai de 13 de outubro até 15 de novembro de 2026, às 23h59, no horário de Brasília. O encerramento é exclusivo em 16/11 à meia-noite. O banner e a faixa deixam de aparecer após esse limite, e o construtor recusa novas propostas promocionais fora do período. enabled permite desativar a campanha. A data, o preço e os limites ficam em promotion.js, e as descrições em offerDetails.js.

Landing page: R$299 à vista no Pix ou 10 parcelas de R$36,07 no cartão, total de R$360,70. O parcelamento informado pelo vendedor para este link tem R$61,70 de acréscimo, exibido no banner. O total no cartão não altera a cobrança base de R$299 do link. Escopo inicial para revisão comercial: uma página, três seções, cinco imagens fornecidas pelo cliente e uma rodada de ajustes. Manutenção, domínio, hospedagem, produção de conteúdo e integrações são cobrados separadamente. Não há preço anterior fictício nem contador reiniciado por visita.

O botão Pagar no Mercado Pago abre o link de valor fixo `https://mpago.li/1cuf8J6` em outra aba, exclusivamente para a landing page de R$299. A forma de pagamento e o parcelamento são escolhidos no ambiente do Mercado Pago; a aba Pix/cartão do banner é uma apresentação dos valores e não pré-seleciona o método no checkout externo. O cliente recebe um aviso para conferir opções, parcelas e eventuais juros antes de confirmar. O pedido de proposta continua disponível e encaminha a seleção ao formulário e WhatsApp, incluindo a validade da oferta, sem gerar cobrança.

O link não usa credenciais nem API no site e não confirma automaticamente pagamentos, cria pedidos ou envia a base visual escolhida ao Mercado Pago. Acompanhe os pagamentos na conta Mercado Pago e combine o escopo, o prazo e os materiais com o cliente. Se o valor à vista mudar, gere e configure outro link em `promotion.js`. Se as condições de parcelamento mudarem, atualize também o total em `offer.cartao`. Configure a validade na conta: ocultar a campanha e impedir cliques após o prazo não desativa o link externo. O checkout retornou um erro de acesso no navegador de verificação; o parcelamento de 10× R$36,07 foi informado pelo vendedor e não conferido diretamente neste ambiente. Métodos e condições finais devem ser confirmados no Mercado Pago.

Os diálogos compartilham a abertura e o retorno de foco; o fechamento é controlado pelos botões e pelo evento cancel do Escape, sem atualizar estado durante a limpeza do efeito em StrictMode.

## Pagamento do institucional

O institucional à vista tem o link `https://mpago.li/17uiB8D`, fornecido pelo vendedor para R$699,90. O botão Pagar no Mercado Pago aparece no cartão desse serviço na aba Pix e abre em outra aba, com noopener/noreferrer. O cliente recebe um aviso para conferir métodos e eventuais acréscimos no checkout. Solicitar proposta permanece disponível, sem cobrança.

O link e o valor externo ficam em `paymentUrl` e `paymentAmount` no plano de `projectOptions.js`. `obterLinkPagamento` compara o valor da cobrança com o preço da forma de pagamento selecionada. No institucional, o link é liberado somente na aba à vista: o total de R$998,90 da aba cartão é diferente e segue por proposta. Evento, manutenção e estimativas com adicionais também não usam essa cobrança de R$699,90.

Não há pré-seleção do método no checkout, coleta de cartão ou confirmação automática de pagamento no site. O checkout retornou erro de acesso no navegador de verificação; o valor foi confirmado pelo vendedor e não conferido diretamente neste ambiente. Acompanhe os pagamentos na conta Mercado Pago e combine escopo, prazo e materiais com o cliente.

## Pagamento dos dois planos maiores

- Catálogo digital: `https://mpago.li/1nD3Ykj`, R$1.489,90 à vista ou em até 10 parcelas sem juros de R$148,99.
- Sistema/dashboard: `https://mpago.li/22AgdjZ`, R$2.489,90 à vista ou em até 10 parcelas sem juros de R$248,99.

Os links foram associados na ordem enviada pelo vendedor, que informou os valores e o parcelamento sem juros para o comprador. O preço no cartão desses dois planos é o mesmo do Pix. O custo de parcelamento é assumido pela Kroma Web e não é somado ao valor anunciado. A promoção de R$299 e o institucional mantêm suas condições próprias.

Esses botões aparecem nas abas Pix e cartão, pois `paymentAmount` corresponde a ambos os preços. `paymentInterestFree` identifica a condição sem juros nos cartões e na nova pergunta do guia. Métodos e parcelamento são escolhidos no Mercado Pago; os links cobram o escopo inicial, sem adicionar manutenção ou recursos do simulador. Se um preço mudar, o link só continua disponível para a forma de pagamento cujo total coincida com a cobrança externa.

Os dois checkouts retornaram erro de acesso neste navegador; seus valores e condições foram informados pelo vendedor, sem pagamento de teste ou confirmação automática no site.

## Galeria de modelos

A aba Modelos apresenta seis desenhos estáticos de estruturas, com abertura ampla ou compacta, menu no topo, lateral ou após o destaque, galeria e conteúdo em blocos. Cada base tem código estável KW-01 a KW-06, imagem ampliável, referência para copiar e mensagem pronta para abrir no WhatsApp. A escolha fica no estado do projeto e acompanha o próximo pedido de proposta, sem mudar preço, pagamento ou manutenção. Não é persistida após recarregar a página.

Na prévia ampliada, Copiar imagem e Baixar imagem PNG convertem o SVG local em PNG pelo canvas do navegador. A cópia depende da API de clipboard e da permissão do navegador. Se o texto não puder ser copiado automaticamente, a referência aparece em um campo para selecionar e copiar; para imagens, há a alternativa de baixar. Nenhum botão envia mensagem automaticamente ao WhatsApp.

Os desenhos são referências da disposição visual. O número de blocos e os controles ilustrados não adicionam funcionalidades ao escopo do plano. Cores, textos e fotos são personalizáveis. O cliente que já escolheu uma base pode deixar a descrição adicional do formulário vazia, mantendo nome, contato e tipo de projeto obrigatórios.

As imagens públicas ficam em public/modelos e têm título, descrição e código também no desenho. Para regenerar os SVGs a partir dos dados e composições editáveis, execute node scripts/generate-site-models.mjs. A geração não exige novas dependências do projeto. Códigos existentes não devem ser reutilizados para uma estrutura diferente, pois podem já estar em conversas de clientes.

## Atendimento e demonstrações

Os planos regulares e o simulador compõem um pedido de orçamento, com pagamento combinado após a confirmação do escopo. O institucional à vista, os dois planos maiores e a promoção de landing page oferecem seus próprios links do Mercado Pago. O site não coleta dados de cartão nem marca pedidos como pagos. As condições escolhidas para uma proposta seguem no campo escopo existente, sem mudança do esquema do banco.

A demonstração RSVP é explicitamente ilustrativa. Credenciamento real e integrações de pagamentos dependem do projeto contratado. As métricas de desempenho devem ser medidas no ambiente publicado antes de serem anunciadas.
