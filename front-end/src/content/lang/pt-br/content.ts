import type { ContentData } from '@/types/content'

export const ptBrContent: ContentData = {
  brand: 'shun.to',
  interfaceControlsAriaLabel: 'Controles de interface',
  languageAriaLabel: 'Idioma',
  themeToggleAriaLabel: 'Alternar tema',
  githubLabel: 'GitHub',
  githubUrl: 'https://github.com/gabrzb/encurtador-url',
  loginLabel: 'Acessar',
  menuLabel: 'Navegar',
  closeLabel: 'Fechar',
  pageHeading: 'Navegacao',
  companyHeading: 'Empresa',
  pageMenu: [
    { href: '#como-funciona', label: 'Como funciona' },
    { href: '#faq', label: 'Perguntas' },
  ],
  companyMenu: [
    { href: '/sobre', label: 'Sobre nos' },
    { href: '/contato', label: 'Contato' },
  ],
  hero: {
    pill: '10M+ links encurtados',
    titleStart: 'Links longos\nmerecem um',
    titleGradient: 'destino melhor.',
    description:
      'Transforme qualquer URL em um link limpo, rastreavel e profissional em segundos. Sem cadastro, sem complicacao.',
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
    submit: 'Encurtar link ->',
    resultTitle: 'Seu link encurtado',
    validityTextStart: 'Link valido por 30 dias -',
    validityLink: 'criar conta para manter',
    validityLinkHref: '/signup',
    copyDefault: 'Copiar',
    copySuccess: 'Copiado ✓',
    urlError: 'Digite uma URL valida para continuar.',
  },
  howItWorks: {
    badge: 'Como funciona',
    title: 'Simples por design.\nPoderoso por dentro.',
    description:
      'O shun.to foi construido para quem precisa de agilidade sem abrir mao de controle. Nada de menus complicados, so resultado.',
    steps: [
      {
        id: '01 - Cole',
        title: 'Qualquer URL funciona',
        description:
          'Nao importa o tamanho ou o destino: produto, artigo, campanha, planilha. Se tem URL, o shun.to encurta.',
      },
      {
        id: '02 - Encurte',
        title: 'Um clique, pronto',
        description:
          'Nosso motor gera o link em menos de 100ms. Sem espera, sem captcha, sem burocracia. So o link novo na sua mao.',
      },
      {
        id: '03 - Acompanhe',
        title: 'Dados em tempo real',
        description:
          'Veja quantos cliques seu link recebeu, de onde vieram e em qual dispositivo. Tudo no painel, sem precisar de GA.',
      },
    ],
    calloutTitle: 'Pronto pra comecar?',
    calloutDescription: 'Sem cadastro obrigatorio. Teste agora, gratis.',
    calloutButton: 'Encurtar meu link ->',
  },
  faq: {
    badge: 'FAQ',
    title: 'Duvidas frequentes.',
    items: [
      {
        question: 'Os links expiram?',
        answer:
          'Links criados sem conta ficam ativos por 30 dias. Criando uma conta gratuita voce mantem os links para sempre e ainda consegue editar o destino quando quiser.',
      },
      {
        question: 'Preciso criar uma conta para usar?',
        answer:
          'Nao. Voce encurta sua URL direto na pagina, sem nenhum cadastro. A conta e opcional e so necessaria se quiser analytics, links permanentes ou dominio personalizado.',
      },
      {
        question: 'O shun.to e realmente gratuito?',
        answer:
          'Sim. O plano gratuito nao tem limite de links criados por dia. No futuro havera um plano Pro com funcionalidades avancadas, mas o encurtamento basico sera sempre free.',
      },
      {
        question: 'Consigo ver quantas pessoas clicaram no meu link?',
        answer:
          'Sim. Com uma conta gratuita voce acessa o painel de analytics com numero de cliques, origem geografica e tipo de dispositivo, tudo em tempo real, sem precisar de Google Analytics.',
      },
      {
        question: 'Posso usar em campanhas de marketing ou e-mail?',
        answer:
          'Sim, e um dos usos mais comuns. Links curtos aumentam a taxa de clique em e-mails e ficam otimos em posts de redes sociais. A API tambem permite gerar links em lote para grandes campanhas.',
      },
    ],
  },
  footer: {
    description:
      'Links mais curtos, alcance mais longe. Encurtador gratuito para pessoas e equipes.',
    socialAriaLabels: {
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      facebook: 'Facebook',
    },
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
          { href: '/sobre', label: 'Sobre nos' },
          { href: '#', label: 'Blog' },
          { href: '#', label: 'Carreiras' },
          { href: '/contato', label: 'Contato' },
        ],
      },
      {
        title: 'Developers',
        links: [
          { href: '#', label: 'Partner API' },
          { href: '#', label: 'Documentacao' },
          { href: '#', label: 'Status' },
          { href: '#', label: 'Knowledge Base' },
        ],
      },
    ],
    copyright: '© 2025 shun.to - Todos os direitos reservados.',
    legal: ['Privacidade', 'Termos de uso', 'Cookies'],
  },
  languages: [
    { code: 'pt-br', flag: '🇧🇷', label: 'Portugues' },
    { code: 'en', flag: '🇺🇸', label: 'Ingles' },
    { code: 'es', flag: '🇪🇸', label: 'Espanhol' },
  ],
}
