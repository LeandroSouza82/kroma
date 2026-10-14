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

Ao importar `LeandroSouza82/kroma`, confira a branch antes de publicar: a versão atual está em `feat/planos-acessiveis-pagamentos`, no PR #1. A produção é implantada explicitamente dessa branch; o PR continua em rascunho e `main` contém a versão anterior. Para a publicação automática pela branch de produção, a integração do PR é uma etapa separada.

Configure `VITE_WHATSAPP_NUMBER` para o número de atendimento, com código do país e apenas dígitos. Para gravar os pedidos no Supabase, configure também `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nos ambientes desejados, com as permissões apropriadas na tabela `leads_kroma`. Sem essa conexão, o formulário oferece a alternativa de contato pelo WhatsApp. Variáveis `VITE_*` fazem parte do JavaScript entregue ao visitante; nunca use a chave `service_role`. Mudanças nessas variáveis exigem novo build.

Confira o plano da conta antes da publicação comercial. O [Hobby](https://vercel.com/docs/plans/hobby) é gratuito e destinado a uso pessoal não comercial. As [regras de uso](https://vercel.com/docs/limits/fair-use-guidelines) exigem Pro ou Enterprise para divulgação de serviços e sites desenvolvidos mediante pagamento. Preparar essa configuração não contrata nem altera o plano da conta.

## Onde editar a oferta

Os cards concentram preço, condição de juros, benefícios e ações. Pagar no Mercado Pago e Solicitar proposta ficam agrupados no rodapé para alinhar os quatro planos; o aviso do checkout aparece uma vez abaixo da grade. Hospedagem, domínio, Supabase e cotação têm uma tabela de valores e fontes em Informações e em Veja a conta, com totais mensais e regras de contratação. A tabela nos detalhes de manutenção soma a mensalidade desse plano.

Os cards começam com a borda azul no plano recomendado. Clicar em um card ou selecionar seu controle de rádio move a borda para esse plano. A escolha de criação permanece ao alternar entre Pix e cartão; a manutenção tem uma seleção independente. A seleção visual não envia proposta nem inicia cobrança.

Todos os quatro cards de criação apresentam o botão azul Pagar no Mercado Pago nas abas Pix e cartão. Institucional e evento usam suas cobranças base, financiadas pelo Mercado Pago com juros para o comprador; o total parcelado não é cobrado novamente. Catálogo e sistema usam os links dos seus totais sem juros. Se a cobrança base não corresponder ao plano ou faltar um link, o botão permanece azul e desativado, com orientação para solicitar a proposta. Os links de outros planos não são reutilizados. Os planos de manutenção permanecem com contratação por proposta.

- src/data/projectOptions.js: tipos de projeto, preços Pix/cartão, adicionais, prazo e número de parcelas.
- src/data/maintenancePlans.js: mensalidades, limites e descrição dos planos de manutenção.
- src/data/offerDetails.js: escopo, inclusões, exclusões e condições dos planos, usados nos detalhes e no pedido de proposta.
- src/data/clientGuide.js: etapas de contratação e perguntas pesquisáveis por assunto, com valores derivados da oferta.
- src/data/promotion.js: ativação, período em Brasília, preço, limites e link de pagamento da campanha de landing page.
- src/data/hostingOptions.js: opções de gestão da hospedagem e do domínio, custos separados, titularidade e encerramento. HostingOptions reutiliza a mesma escolha no simulador e no contato.
- src/data/siteModels.js: códigos estáveis, descrições, estrutura e caminhos das imagens da galeria.
- src/utils/siteModelReference.js: referência compartilhada entre cópia, WhatsApp e escopo do pedido.
- src/utils/projectProposal.js: condições compartilhadas entre planos, simulador e atendimento.

A oferta inicial de site institucional está em R$699,90 no Pix ou até 12 parcelas de R$71,22 no cartão, total de R$854,64, com R$154,74 de acréscimo. Evento / convite digital custa R$489,90 no Pix ou até 12 parcelas de R$49,85, total de R$598,20, com R$108,30 de acréscimo. Catálogo e sistema mantêm seus valores e dez parcelas sem juros. A manutenção é opcional e não é somada ao custo de criação.

Os preços Pix, adicionais e manutenção mantêm os valores aprovados. O banner promocional mantém R$299 à vista e anuncia até 12× R$30,43 no cartão. O número de parcelas é definido por oferta em `numeroParcelas`: doze para landing page, institucional e evento; dez para catálogo e sistema. As parcelas derivam do total; quando a estimativa com prioridade ou adicionais não se divide igualmente, a última parcela ajusta o arredondamento e aparece no simulador e na proposta.

Os limites de lançamento foram definidos para revisão comercial: institucional com uma página, cinco seções e dez imagens; evento com uma página, quatro seções e oito imagens; catálogo com uma página e vinte produtos; sistema com três telas para um fluxo de interface, sem dados ou autenticação incluídos. Todos incluem uma rodada de ajustes. As quantidades ficam em limits em projectOptions.js; solicitações mensais ficam em requests em maintenancePlans.js. Ajuste esses limites antes de publicar a oferta, se seu modelo comercial for diferente.

O botão Informações usa um diálogo nativo com fechamento por Escape e retorno de foco. O guia permite buscar sem diferenciar maiúsculas ou acentos e filtrar por assunto. No atendimento, o preço e a mensalidade ficam visíveis e o escopo completo pode ser expandido. A mensagem do WhatsApp preserva a seleção tanto no contato direto quanto na alternativa à gravação do formulário.

## Campanha de landing page

Um aviso compacto aparece na primeira visita de cada sessão enquanto a campanha estiver ativa, sem bloquear a página. O banner completo abre somente por Ver oferta, no aviso ou na faixa abaixo da abertura do site. Depois de fechar ou solicitar a oferta, o visitante pode reabrir pela faixa. A identificação da campanha é usada na chave de sessionStorage; altere o id ao lançar uma nova campanha. Se o armazenamento estiver bloqueado, o fechamento funciona e uma recarga pode exibir novamente o banner.

A campanha inicial vai de 13 de outubro até 15 de novembro de 2026, às 23h59, no horário de Brasília. O encerramento é exclusivo em 16/11 à meia-noite. O banner e a faixa deixam de aparecer após esse limite, e o construtor recusa novas propostas promocionais fora do período. enabled permite desativar a campanha. A data, o preço e os limites ficam em promotion.js, e as descrições em offerDetails.js.

Landing page: R$299 à vista no Pix ou até 12 parcelas de R$30,43 no cartão, total de R$365,16. O parcelamento confirmado na imagem do checkout enviada pelo vendedor tem R$66,16 de acréscimo, exibido no banner. O total no cartão não altera a cobrança base de R$299 do link. Escopo inicial para revisão comercial: uma página, três seções, cinco imagens fornecidas pelo cliente e uma rodada de ajustes. Manutenção, domínio, hospedagem, produção de conteúdo e integrações são cobrados separadamente. Não há preço anterior fictício nem contador reiniciado por visita.

O botão Pagar no Mercado Pago abre o link de valor fixo `https://mpago.li/1cuf8J6` em outra aba, exclusivamente para a landing page de R$299. A forma de pagamento e o parcelamento são escolhidos no ambiente do Mercado Pago; a aba Pix/cartão do banner é uma apresentação dos valores e não pré-seleciona o método no checkout externo. O cliente recebe um aviso para conferir opções, parcelas e eventuais juros antes de confirmar. O pedido de proposta continua disponível e encaminha a seleção ao formulário e WhatsApp, incluindo a validade da oferta, sem gerar cobrança.

O link não usa credenciais nem API no site e não confirma automaticamente pagamentos, cria pedidos ou envia a base visual escolhida ao Mercado Pago. Acompanhe os pagamentos na conta Mercado Pago e combine o escopo, o prazo e os materiais com o cliente. Se o valor à vista mudar, gere e configure outro link em `promotion.js`. Se as condições de parcelamento mudarem, atualize o total em `offer.cartao` e a quantidade em `offer.numeroParcelas`. Configure a validade na conta: ocultar a campanha e impedir cliques após o prazo não desativa o link externo. A imagem do checkout enviada pelo vendedor mostra 12× R$30,43. Métodos e condições finais devem ser confirmados no Mercado Pago.

Os diálogos compartilham a abertura e o retorno de foco; o fechamento é controlado pelos botões e pelo evento cancel do Escape, sem atualizar estado durante a limpeza do efeito em StrictMode.

## Pagamento do institucional

O institucional tem o link `https://mpago.li/17uiB8D`, fornecido pelo vendedor para a cobrança base de R$699,90. O botão Pagar no Mercado Pago aparece nas abas Pix e cartão e abre em outra aba, com noopener/noreferrer. O cliente recebe um aviso para escolher Pix ou até 12 parcelas com juros e conferir o total no checkout. Solicitar proposta permanece disponível, sem cobrança.

O link e o valor externo ficam em `paymentUrl` e `paymentAmount` no plano de `projectOptions.js`. `paymentBuyerInterest` identifica o financiamento da cobrança base pelo Mercado Pago: `obterLinkPagamento` valida o preço base nessas ofertas, enquanto os planos sem juros validam o total da forma escolhida. Os R$854,64 das doze parcelas não viram uma nova cobrança com juros novamente. Evento, manutenção e estimativas com adicionais não usam a cobrança do institucional.

Não há pré-seleção do método no checkout, coleta de cartão ou confirmação automática de pagamento no site. O checkout retornou erro de acesso no navegador de verificação; o valor foi confirmado pelo vendedor e não conferido diretamente neste ambiente. Acompanhe os pagamentos na conta Mercado Pago e combine escopo, prazo e materiais com o cliente.

## Pagamento do evento

O link `https://mpago.li/14HxkrF` corresponde à cobrança base do evento de R$489,90. O botão azul fica habilitado nas abas Pix e cartão e abre o Mercado Pago em outra aba. O vendedor informou até 12× R$49,85, total de R$598,20 com juros para o comprador, financiando essa cobrança base. A escolha do método e as condições finais são conferidas no checkout externo, sem pré-seleção pelo site. Não é anunciada condição sem juros para este link.

## Pagamento dos dois planos maiores

- Catálogo digital: `https://mpago.li/1nD3Ykj`, R$1.489,90 à vista ou em até 10 parcelas sem juros de R$148,99.
- Sistema/dashboard: `https://mpago.li/22AgdjZ`, R$2.489,90 à vista ou em até 10 parcelas sem juros de R$248,99.

Os links foram associados na ordem enviada pelo vendedor, que informou os valores e o parcelamento sem juros para o comprador. O preço no cartão desses dois planos é o mesmo do Pix. O custo de parcelamento é assumido pela Kroma Web e não é somado ao valor anunciado. A promoção de R$299 e o institucional mantêm suas condições próprias.

Esses botões aparecem nas abas Pix e cartão, pois `paymentAmount` corresponde a ambos os preços. `paymentInterestFree` identifica a condição sem juros nos cartões e na nova pergunta do guia. Métodos e parcelamento são escolhidos no Mercado Pago; os links cobram o escopo inicial, sem adicionar manutenção ou recursos do simulador. Se um preço mudar, o link só continua disponível para a forma de pagamento cujo total coincida com a cobrança externa.

Os dois checkouts retornaram erro de acesso neste navegador; seus valores e condições foram informados pelo vendedor, sem pagamento de teste ou confirmação automática no site.

## Gestão da hospedagem e do domínio

O cliente pode deixar a escolha para o atendimento, pedir que a Kroma Web cuide ou usar as próprias contas. A seleção é compartilhada entre simulador e formulário de contato, permanece ao trocar de plano e acompanha o escopo da proposta e a mensagem do WhatsApp. Mudar essa preferência não limpa os campos preenchidos nem confirma contratação.

O domínio permanece em nome do cliente; a conta de hospedagem, os acessos e as condições de transferência são definidos na proposta. A escolha não altera o preço de criação, a mensalidade de manutenção, os links fixos de pagamento ou o esquema do banco: os custos de infraestrutura acompanham o campo escopo existente. A informação aparece junto aos planos, nos detalhes das ofertas e no guia.

Os custos de referência da infraestrutura ficam em hostingOptions.js: hospedagem Locaweb Go R$20,90/mês (equivalente da renovação anual de R$250,80) e domínio .com.br R$40/ano, amortizado em R$3,33/mês. A soma mensal estimada é R$24,23, sem acrescentar uma segunda cobrança anual de domínio. Supabase Pro começa em US$25/mês para o primeiro projeto básico; a referência cambial de 13/10/2026 é R$5,02 por dólar, fechamento comercial de venda informado pelo UOL Economia. A conversão inicial é R$125,50/mês; infraestrutura do sistema soma aproximadamente R$149,73/mês, antes da manutenção opcional. A cotação é uma referência datada, não uma consulta automática em tempo real. O custo em reais pode aumentar ou diminuir conforme o câmbio da cobrança; cotação da operadora, impostos/taxas, recursos excedentes e alterações dos fornecedores precisam ser discriminados na proposta. Os cards mostram o preço e o escopo resumido. Custos de infraestrutura e fontes ficam em tabelas compartilhadas nos diálogos Informações e na seção Veja a conta; o guia, o simulador e o contato mantêm os valores detalhados, inclusive na escolha direta do tipo pelo formulário. Com manutenção, o resumo e o WhatsApp mostram o total estimado dos serviços selecionados. Usar contas do cliente ou remover a escolha retira os repasses da Kroma da proposta. O adicional Formulários e dados usa um único banco por projeto, sem duplicação com Sistema / dashboard. Início, renovação, cancelamento, capacidade e implementação da integração com dados têm condições próprias. Os links do Mercado Pago continuam cobrando somente a criação, sem iniciar assinatura ou cobrar infraestrutura.

## Galeria de modelos

A aba Modelos apresenta seis desenhos estáticos de estruturas, com abertura ampla ou compacta, menu no topo, lateral ou após o destaque, galeria e conteúdo em blocos. Cada base tem código estável KW-01 a KW-06, imagem ampliável, referência para copiar e mensagem pronta para abrir no WhatsApp. A escolha fica no estado do projeto e acompanha o próximo pedido de proposta, sem mudar preço, pagamento ou manutenção. Não é persistida após recarregar a página.

Na prévia ampliada, Copiar imagem e Baixar imagem PNG convertem o SVG local em PNG pelo canvas do navegador. A cópia depende da API de clipboard e da permissão do navegador. Se o texto não puder ser copiado automaticamente, a referência aparece em um campo para selecionar e copiar; para imagens, há a alternativa de baixar. Nenhum botão envia mensagem automaticamente ao WhatsApp.

Os desenhos são referências da disposição visual. O número de blocos e os controles ilustrados não adicionam funcionalidades ao escopo do plano. Cores, textos e fotos são personalizáveis. O cliente que já escolheu uma base pode deixar a descrição adicional do formulário vazia, mantendo nome, contato e tipo de projeto obrigatórios.

As imagens públicas ficam em public/modelos e têm título, descrição e código também no desenho. Para regenerar os SVGs a partir dos dados e composições editáveis, execute node scripts/generate-site-models.mjs. A geração não exige novas dependências do projeto. Códigos existentes não devem ser reutilizados para uma estrutura diferente, pois podem já estar em conversas de clientes.

## Atendimento e demonstrações

Os planos regulares e o simulador compõem um pedido de orçamento, com pagamento combinado após a confirmação do escopo. O institucional à vista, os dois planos maiores e a promoção de landing page oferecem seus próprios links do Mercado Pago. O site não coleta dados de cartão nem marca pedidos como pagos. As condições escolhidas para uma proposta seguem no campo escopo existente, sem mudança do esquema do banco.

A demonstração RSVP é explicitamente ilustrativa. Credenciamento real e integrações de pagamentos dependem do projeto contratado. As métricas de desempenho devem ser medidas no ambiente publicado antes de serem anunciadas.


## Busca, confiança e privacidade

npm run build gera o bundle e depois pré-renderiza a página inicial com React. O conteúdo já chega no HTML; o navegador hidrata a mesma árvore e mantém os controles interativos. O aviso compacto da promoção aparece após a montagem, respeitando a sessão e a validade; o diálogo completo abre somente após o clique. O conteúdo principal permanece acessível na entrada, conforme a recomendação do Google sobre intersticiais, e a primeira árvore do HTML e do navegador coincide. O timestamp público do render é usado na primeira renderização.

siteInfo.js centraliza marca, endereço e WhatsApp. O endereço principal padrão é https://kroma-web-rho.vercel.app/. VITE_SITE_URL permite configurar um domínio HTTPS próprio quando ele estiver conectado; canonical, metadados sociais, dados estruturados, sitemap e referências dos modelos acompanham esse endereço. Não use um endereço de preview como canônico.

O build gera /sobre/, /privacidade/, /condicoes/, /robots.txt e /sitemap.xml. As páginas institucionais têm HTML próprio, títulos e descrições exclusivos e links reais no rodapé e na seção Informação e confiança. A política descreve o canal de recebimento configurado, o armazenamento da sessão promocional e os provedores externos de fontes e imagens. O formulário aponta para a política antes do envio. Sem JavaScript, os formulários interativos ficam ocultos e o visitante pode ler os planos e usar o WhatsApp.

Os dados estruturados da página inicial identificam Organization e WebSite, usando somente a marca e o contato informados. Não há avaliações, CNPJ, endereço físico, certificações ou aprovação do Google inventados. O logo em SVG e a imagem social PNG usam a marca existente. A imagem social pode ser regenerada com Python e Pillow por scripts/generate-social-image.py.

vercel.json configura URLs de diretórios com barra final e cabeçalhos para limitar enquadramento e objetos incorporados, evitar inferência de MIME, controlar referência e desativar câmera, microfone e geolocalização não utilizados. O HTTPS é fornecido pela hospedagem; um texto sobre HTTPS não substitui um certificado válido nem é garantia de segurança absoluta.

A inclusão na pesquisa não é automática nem garantida. O responsável verifica a propriedade na sua conta do Google Search Console e envia o sitemap. Se usar a verificação por meta tag, configure somente o token fornecido para sua propriedade em VITE_GOOGLE_SITE_VERIFICATION e faça novo build. Nenhum token fictício é publicado. Não foi vinculada uma conta do Search Console nem enviada uma solicitação de indexação por este código.

Para verificar os artefatos de busca e os testes comerciais: npm run build && node --test tests/*.test.js. Os testes de SEO leem a saída em dist, portanto exigem o build. Confira também as páginas públicas, os códigos HTTP e o funcionamento da hidratação após publicar.

## Publicação na Locaweb

Produção publicada em https://kromaweb.com.br/ no plano GO Linux. Para atualizar, execute `VITE_SITE_URL=https://kromaweb.com.br/ VITE_HOSTING_PROVIDER=Locaweb npm run build`, copie `deploy/locaweb.htaccess` para `dist/.htaccess` e envie o conteúdo de `dist` à pasta `public_html` pelo WebFTP ou cliente FTP. Preserve as subpastas assets, modelos, sobre, privacidade e condicoes. Não envie arquivos de configuração com segredos nem node_modules.

O certificado Let's Encrypt está ativo. O .htaccess aplica os cabeçalhos de segurança e redireciona HTTP e www ao endereço HTTPS principal. Antes de reutilizar essa configuração em outro domínio, ajuste o domínio na regra e confirme seu certificado. VITE_HOSTING_PROVIDER informa o provedor real na política de privacidade; o padrão Vercel permanece para os builds nessa plataforma.
