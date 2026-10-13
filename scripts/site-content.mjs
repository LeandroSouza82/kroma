export function paginasInstitucionais(site, formularioConfigurado = false) {
  const whatsapp = `https://wa.me/${site.whatsapp}`;
  const contato = `<a href="${whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp de atendimento da Kroma Web</a>`;
  return [
    {
      slug: "sobre",
      title: "Sobre a Kroma Web",
      description: "Conheça os serviços da Kroma Web, o atendimento, o processo de criação e as informações sobre conexão HTTPS e pagamento.",
      eyebrow: "Apresentação e atendimento",
      body: `
        <p class="intro">Sites claros, design cuidado e um caminho simples para o seu cliente entrar em contato.</p>
        <section><h2>O que fazemos</h2><p>A Kroma Web desenvolve sites institucionais, landing pages, convites e páginas de eventos, catálogos digitais e interfaces de sistemas web. Cada serviço tem um escopo inicial, com inclusões, limites e custos adicionais explicados antes da contratação.</p><p>Você pode comparar os <a href="/#planos">planos e valores</a>, escolher uma <a href="/#modelos">base visual</a> e usar o <a href="/#simulador">simulador</a> para preparar seu pedido.</p></section>
        <section><h2>Como começa um projeto</h2><ol><li>Escolha o serviço e leia as informações do plano.</li><li>Converse sobre a ideia, os materiais e os recursos necessários.</li><li>Confira a proposta com escopo, prazo e condições de pagamento.</li><li>Acompanhe a prévia, reúna os ajustes incluídos e combine a publicação.</li></ol><p>Manutenção, hospedagem, domínio e serviços externos têm condições próprias. Você decide quais serviços quer contratar.</p></section>
        <section><h2>Atendimento direto</h2><p>O canal de atendimento é o ${contato}. Use esse contato para tirar dúvidas sobre a proposta, acompanhar o projeto ou falar sobre seus dados pessoais.</p></section>
        <section><h2>Conexão e pagamento</h2><p>A versão pública deste site usa HTTPS. O certificado pode ser consultado nas informações de segurança do navegador e protege a conexão entre o navegador e o site.</p><p>Os botões de pagamento abrem o checkout do Mercado Pago. Os dados de cartão são informados nesse ambiente, e a Kroma Web não solicita senhas nem números completos de cartão pelo formulário do site.</p><p>Confira também a <a href="/privacidade/">política de privacidade</a> e as <a href="/condicoes/">condições de contratação</a>.</p></section>
      `,
    },
    {
      slug: "privacidade",
      title: "Política de privacidade",
      description: "Saiba quais dados de contato a Kroma Web utiliza, para quais finalidades, quais serviços externos participam e como exercer seus direitos.",
      eyebrow: "Seus dados, com informação",
      body: `
        <p class="intro">Esta política explica o tratamento de informações no site e no atendimento da Kroma Web.</p>
        <section><h2>1. Responsável e contato</h2><p>A Kroma Web é responsável pelo atendimento aos pedidos recebidos pelos seus canais. Para dúvidas sobre privacidade ou solicitações relacionadas aos seus dados, entre em contato pelo ${contato}.</p></section>
        <section><h2>2. Informações que você fornece</h2><p>O pedido de orçamento pode conter nome, WhatsApp ou e-mail, tipo de projeto, descrição da ideia, modelo visual e condições selecionadas no simulador. Essas informações são usadas para entender o pedido, preparar a proposta e dar continuidade ao atendimento.</p><p>Não envie senhas, documentos de identificação ou dados completos de cartão no campo de descrição.</p><p>${formularioConfigurado
          ? "Ao enviar o formulário, o pedido é registrado para atendimento. O site utiliza o Supabase como serviço de armazenamento desses registros. Se o envio não for concluído, pode ser oferecida a alternativa de abrir a mensagem no WhatsApp."
          : "Na versão atual, o formulário prepara a mensagem e abre o WhatsApp para continuar o atendimento. As informações são transferidas ao WhatsApp nessa etapa; você pode revisar a mensagem antes de enviá-la ao contato da Kroma Web."}</p></section>
        <section><h2>3. Finalidades do tratamento</h2><p>Os dados são tratados para responder a dúvidas, realizar procedimentos relacionados ao orçamento solicitado, preparar propostas, acompanhar a execução dos serviços e cumprir obrigações aplicáveis. Cada finalidade deve usar somente as informações necessárias e uma hipótese legal adequada.</p></section>
        <section><h2>4. Serviços externos</h2><p>O WhatsApp participa das conversas e o Mercado Pago processa os pagamentos no seu próprio ambiente. Esses serviços também tratam informações conforme suas políticas.</p><p>A hospedagem utiliza a Vercel. Fontes e imagens podem ser carregadas de serviços externos, como Google Fonts e Unsplash; ao carregar esses recursos, o provedor pode receber informações técnicas da conexão, como endereço IP e dados do navegador.</p><p>Dados completos do cartão e senhas de pagamento não são coletados pelo formulário da Kroma Web.</p></section>
        <section><h2>5. Armazenamento no navegador e registros técnicos</h2><p>O site utiliza armazenamento da sessão para lembrar que o banner promocional já foi visto. Essa informação permite evitar sua repetição durante a sessão.</p><p>A versão atual não contém scripts próprios de publicidade ou de análise de visitantes. Serviços de infraestrutura podem manter registros técnicos de acesso e segurança.</p></section>
        <section><h2>6. Conservação e proteção</h2><p>Registros de atendimento e contratação são conservados pelo tempo necessário às finalidades informadas e às obrigações aplicáveis. Solicitações de exclusão são avaliadas considerando essas obrigações.</p><p>O site público utiliza HTTPS. O atendimento orienta a não compartilhar senhas e dados completos de cartão pelos canais de orçamento.</p></section>
        <section><h2>7. Seus direitos</h2><p>Você pode solicitar informações sobre o tratamento dos seus dados, acesso, correção e exclusão, entre outros direitos previstos na legislação aplicável. Se um tratamento depender de consentimento, sua revogação pode ser solicitada.</p><p>Faça a solicitação pelo ${contato}. Pode ser necessário confirmar sua identidade de forma proporcional ao pedido, para proteger as informações.</p></section>
        <section><h2>8. Atualizações</h2><p>Esta política pode ser atualizada quando houver mudanças nos serviços ou na forma de tratar os dados. A data de atualização aparece nesta página.</p></section>
      `,
    },
    {
      slug: "condicoes",
      title: "Condições de contratação",
      description: "Entenda como funcionam o escopo, a proposta, o pagamento, a manutenção, os custos externos e os ajustes dos serviços da Kroma Web.",
      eyebrow: "Antes de contratar",
      body: `
        <p class="intro">Leia estas informações junto com o plano escolhido e a proposta do seu projeto.</p>
        <section><h2>Escopo e proposta</h2><p>Os valores anunciados correspondem ao escopo inicial de cada serviço. Consulte <a href="/#planos">Informações nos planos</a> para ver o que está incluído, os limites de páginas, seções, imagens, produtos ou telas e a rodada de ajustes.</p><p>A proposta confirma os recursos, o cronograma, os materiais e as condições de pagamento antes do início. Escolher uma base visual organiza a referência do layout e não acrescenta funções ao plano.</p></section>
        <section><h2>Pagamento da criação</h2><p>Os links do Mercado Pago cobram o serviço inicial indicado. Você escolhe a forma de pagamento no checkout e confere o valor final antes de confirmar.</p><p>O site informa o total parcelado e distingue condições com juros e sem juros. Acréscimos podem depender da opção oferecida no checkout. A validade de uma promoção aparece na oferta.</p><p>A contratação com adicionais ou prioridade tem o pagamento confirmado no atendimento. A confirmação do pagamento é acompanhada pela Kroma Web no provedor.</p></section>
        <section><h2>Mensalidades e serviços externos</h2><p>A criação é um serviço pontual. Manutenção de conteúdo é opcional, com quantidade de atualizações e mensalidade próprias. Ela não inclui automaticamente novas páginas, reformulações ou integrações.</p><p>Hospedagem, domínio e banco de dados são custos separados. Consulte <a href="/#planos">Veja a conta</a> e o simulador para os valores de referência, as fontes e a variação cambial do banco de dados.</p><p>O domínio fica em nome do cliente. Contas, acessos, contratação dos fornecedores, renovações e transferência são registrados na proposta. O equivalente mensal de domínio não gera uma segunda cobrança anual quando já estiver considerado no repasse.</p></section>
        <section><h2>Materiais, prazo e ajustes</h2><p>O cliente fornece logo, textos, fotos autorizadas e informações do negócio. O prazo considera o recebimento dos materiais e os retornos necessários.</p><p>A rodada de ajustes reúne correções dentro do escopo aprovado. Novas páginas, funções, produção de conteúdo ou mudanças de direção precisam de avaliação e orçamento próprios.</p></section>
        <section><h2>Cancelamento e atendimento</h2><p>Antes de contratar, confirme as condições de início, renovação e cancelamento dos serviços selecionados. Dúvidas, problemas ou pedidos de cancelamento devem ser encaminhados ao ${contato}.</p><p>Eventuais reembolsos são avaliados conforme a contratação, a etapa do serviço e a legislação aplicável, preservando os direitos do consumidor.</p></section>
        <section><h2>Privacidade</h2><p>O tratamento dos dados de atendimento está explicado na <a href="/privacidade/">política de privacidade</a>.</p></section>
      `,
    },
  ];
}
