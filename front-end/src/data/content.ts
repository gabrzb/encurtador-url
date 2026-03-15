import type { ContentData } from '@/types/content'

export const content: ContentData = {
  brand: 'shun.to',
  languageAriaLabel: 'Idioma',
  themeToggleAriaLabel: 'Alternar tema',
  githubLabel: 'GitHub',
  githubUrl: 'https://github.com/gabri/encurtador-url',
  loginLabel: 'Entrar',
  menuLabel: 'Menu',
  closeLabel: 'Fechar',
  pageHeading: 'Página',
  companyHeading: 'Empresa',
  pageMenu: [
    { href: '#como-funciona', label: 'Como funciona' },
    { href: '#faq', label: 'FAQ' },
  ],
  companyMenu: [
    { href: '/sobre', label: 'Sobre nós' },
    { href: '/contato', label: 'Contato' },
  ],
  hero: {
    pill: '10M+ links encurtados',
    titleStart: 'Links longos\nmerecem um',
    titleGradient: 'destino melhor.',
    description:
      'Transforme qualquer URL em um link limpo, rastreável e profissional em segundos. Sem cadastro, sem complicação.',
    stats: [
      { value: '99.9%', label: 'uptime garantido' },
      { value: '< 0.1s', label: 'tempo de resposta' },
      { value: 'Free', label: 'para sempre' },
    ],
  },
  form: {
    title: 'Encurte agora',
    subtitle: 'Cole sua URL abaixo e gere o link em um clique.',
    urlLabel: 'Sua URL',
    placeholder: 'https://exemplo.com/url-longa...',
    submit: 'Encurtar link →',
    resultTitle: 'Seu link encurtado',
    validityTextStart: 'Link válido por 30 dias ·',
    validityLink: 'criar conta para manter',
    validityLinkHref: '/signup',
    copyDefault: 'Copiar',
    copySuccess: 'Copiado ✓',
  },
  howItWorks: {
    badge: 'Como funciona',
    title: 'Simples por design.\nPoderoso por dentro.',
    description:
      'O shun.to foi construído para quem precisa de agilidade sem abrir mão de controle. Nada de menus complicados — só resultado.',
    steps: [
      {
        id: '01 — Cole',
        title: 'Qualquer URL funciona',
        description:
          'Não importa o tamanho ou o destino — produto, artigo, campanha, planilha. Se tem URL, o shun.to encurta.',
      },
      {
        id: '02 — Encurte',
        title: 'Um clique, pronto',
        description:
          'Nosso motor gera o link em menos de 100ms. Sem espera, sem captcha, sem burocracia. Só o link novo na sua mão.',
      },
      {
        id: '03 - Acompanhe',
        title: 'Dados em tempo real',
        description:
          'Veja quantos cliques seu link recebeu, de onde vieram e em qual dispositivo. Tudo no painel, sem precisar de GA.',
      },
    ],
    calloutTitle: 'Pronto pra começar?',
    calloutDescription: 'Sem cadastro obrigatório. Teste agora, grátis.',
    calloutButton: 'Encurtar meu link →',
  },
  faq: {
    badge: 'FAQ',
    title: 'Dúvidas frequentes.',
    items: [
      {
        question: 'Os links expiram?',
        answer:
          'Links criados sem conta ficam ativos por 30 dias. Criando uma conta gratuita você mantém os links para sempre e ainda consegue editar o destino quando quiser.',
      },
      {
        question: 'Preciso criar uma conta para usar?',
        answer:
          'Não. Você encurta sua URL direto na página, sem nenhum cadastro. A conta é opcional e só necessária se quiser analytics, links permanentes ou domínio personalizado.',
      },
      {
        question: 'O shun.to é realmente gratuito?',
        answer:
          'Sim. O plano gratuito não tem limite de links criados por dia. No futuro haverá um plano Pro com funcionalidades avançadas, mas o encurtamento básico será sempre free.',
      },
      {
        question: 'Consigo ver quantas pessoas clicaram no meu link?',
        answer:
          'Sim. Com uma conta gratuita você acessa o painel de analytics com número de cliques, origem geográfica e tipo de dispositivo — tudo em tempo real, sem precisar de Google Analytics.',
      },
      {
        question: 'Posso usar em campanhas de marketing ou e-mail?',
        answer:
          'Sim, e é um dos usos mais comuns. Links curtos aumentam a taxa de clique em e-mails e ficam ótimos em posts de redes sociais. A API também permite gerar links em lote para grandes campanhas.',
      },
    ],
  },
  footer: {
    description:
      'Links mais curtos, alcance mais longe. Encurtador gratuito para pessoas e equipes.',
    columns: [
      {
        title: 'Produto',
        links: [
          { href: '#', label: 'Encurtador' },
          { href: '#', label: 'Analytics' },
          { href: '#', label: 'Links customizados' },
          { href: '#', label: 'QR Code' },
        ],
      },
      {
        title: 'Empresa',
        links: [
          { href: '/sobre', label: 'Sobre nós' },
          { href: '#', label: 'Blog' },
          { href: '#', label: 'Carreiras' },
          { href: '/contato', label: 'Contato' },
        ],
      },
      {
        title: 'Developers',
        links: [
          { href: '#', label: 'Partner API' },
          { href: '#', label: 'Documentação' },
          { href: '#', label: 'Status' },
          { href: '#', label: 'Knowledge Base' },
        ],
      },
    ],
    copyright: '© 2025 shun.to · Todos os direitos reservados.',
    legal: ['Privacidade', 'Termos de uso', 'Cookies'],
  },
  languages: [
    { flag: '🇧🇷', label: 'Português' },
    { flag: '🇺🇸', label: 'English' },
    { flag: '🇪🇸', label: 'Español' },
  ],
}
