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

- src/data/projectOptions.js: tipos de projeto, preços Pix/cartão, adicionais, prazo e número de parcelas.
- src/data/maintenancePlans.js: mensalidades, limites e descrição dos planos de manutenção.
- src/data/offerDetails.js: escopo, inclusões, exclusões e condições dos planos, usados nos detalhes e no pedido de proposta.
- src/data/clientGuide.js: etapas de contratação e perguntas pesquisáveis por assunto, com valores derivados da oferta.
- src/data/promotion.js: ativação, período em Brasília, preço e limites da campanha de landing page.
- src/data/siteModels.js: códigos estáveis, descrições, estrutura e caminhos das imagens da galeria.
- src/utils/siteModelReference.js: referência compartilhada entre cópia, WhatsApp e escopo do pedido.
- src/utils/projectProposal.js: condições compartilhadas entre planos, simulador e atendimento.

A oferta inicial de site institucional está em R$700 no Pix ou R$999 no cartão, dividido em 10 parcelas de R$99,90. Os demais preços são referências iniciais editáveis. A manutenção é opcional e não é somada ao custo de criação.

Os limites de lançamento foram definidos para revisão comercial: institucional com uma página, cinco seções e dez imagens; evento com uma página, quatro seções e oito imagens; catálogo com uma página e vinte produtos; sistema com três telas para um fluxo de interface, sem dados ou autenticação incluídos. Todos incluem uma rodada de ajustes. As quantidades ficam em limits em projectOptions.js; solicitações mensais ficam em requests em maintenancePlans.js. Ajuste esses limites antes de publicar a oferta, se seu modelo comercial for diferente.

O botão Informações usa um diálogo nativo com fechamento por Escape e retorno de foco. O guia permite buscar sem diferenciar maiúsculas ou acentos e filtrar por assunto. No atendimento, o preço e a mensalidade ficam visíveis e o escopo completo pode ser expandido. A mensagem do WhatsApp preserva a seleção tanto no contato direto quanto na alternativa à gravação do formulário.

## Campanha de landing page

O banner abre na primeira visita de cada sessão enquanto a campanha estiver ativa. Depois de fechar ou solicitar a oferta, o visitante pode reabrir pela faixa abaixo da abertura do site. A identificação da campanha é usada na chave de sessionStorage; altere o id ao lançar uma nova campanha. Se o armazenamento estiver bloqueado, o fechamento funciona e uma recarga pode exibir novamente o banner.

A campanha inicial vai de 13 de outubro até 15 de novembro de 2026, às 23h59, no horário de Brasília. O encerramento é exclusivo em 16/11 à meia-noite. O banner e a faixa deixam de aparecer após esse limite, e o construtor recusa novas propostas promocionais fora do período. enabled permite desativar a campanha. A data, o preço e os limites ficam em promotion.js, e as descrições em offerDetails.js.

Landing page: R$299 no total, em 10 parcelas de R$29,90 no cartão ou R$299 à vista no Pix. Escopo inicial para revisão comercial: uma página, três seções, cinco imagens fornecidas pelo cliente e uma rodada de ajustes. Manutenção, domínio, hospedagem, produção de conteúdo e integrações são cobrados separadamente. Não há preço anterior fictício nem contador reiniciado por visita.

O banner encaminha a seleção ao mesmo formulário e mensagem do WhatsApp utilizados pelos planos regulares, incluindo a validade da oferta. Ele não processa pagamentos. Os diálogos compartilham a abertura e o retorno de foco; o fechamento é controlado pelos botões e pelo evento cancel do Escape, sem atualizar estado durante a limpeza do efeito em StrictMode.

## Galeria de modelos

A aba Modelos apresenta seis desenhos estáticos de estruturas, com abertura ampla ou compacta, menu no topo, lateral ou após o destaque, galeria e conteúdo em blocos. Cada base tem código estável KW-01 a KW-06, imagem ampliável, referência para copiar e mensagem pronta para abrir no WhatsApp. A escolha fica no estado do projeto e acompanha o próximo pedido de proposta, sem mudar preço, pagamento ou manutenção. Não é persistida após recarregar a página.

Na prévia ampliada, Copiar imagem e Baixar imagem PNG convertem o SVG local em PNG pelo canvas do navegador. A cópia depende da API de clipboard e da permissão do navegador. Se o texto não puder ser copiado automaticamente, a referência aparece em um campo para selecionar e copiar; para imagens, há a alternativa de baixar. Nenhum botão envia mensagem automaticamente ao WhatsApp.

Os desenhos são referências da disposição visual. O número de blocos e os controles ilustrados não adicionam funcionalidades ao escopo do plano. Cores, textos e fotos são personalizáveis. O cliente que já escolheu uma base pode deixar a descrição adicional do formulário vazia, mantendo nome, contato e tipo de projeto obrigatórios.

As imagens públicas ficam em public/modelos e têm título, descrição e código também no desenho. Para regenerar os SVGs a partir dos dados e composições editáveis, execute node scripts/generate-site-models.mjs. A geração não exige novas dependências do projeto. Códigos existentes não devem ser reutilizados para uma estrutura diferente, pois podem já estar em conversas de clientes.

## Atendimento e demonstrações

As opções de pagamento compõem o pedido de orçamento. O site não processa cobranças nem coleta dados de cartão; o pagamento é combinado após a confirmação do escopo. As condições escolhidas seguem no campo escopo existente, sem mudança do esquema do banco.

A demonstração RSVP é explicitamente ilustrativa. Credenciamento real e integrações de pagamentos dependem do projeto contratado. As métricas de desempenho devem ser medidas no ambiente publicado antes de serem anunciadas.
