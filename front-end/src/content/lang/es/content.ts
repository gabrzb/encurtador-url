import type { ContentData } from '@/types/content'

export const esContent: ContentData = {
  brand: 'shun.to',
  interfaceControlsAriaLabel: 'Controles de interfaz',
  languageAriaLabel: 'Idioma',
  themeToggleAriaLabel: 'Cambiar tema',
  githubLabel: 'GitHub',
  githubUrl: 'https://github.com/gabrzb/encurtador-url',
  loginLabel: 'Acceder',
  menuLabel: 'Navegar',
  closeLabel: 'Cerrar',
  pageHeading: 'Navegacion',
  companyHeading: 'Empresa',
  pageMenu: [
    { href: '#como-funciona', label: 'Como funciona' },
    { href: '#faq', label: 'Preguntas' },
  ],
  companyMenu: [
    { href: '/sobre', label: 'Sobre nosotros' },
    { href: '/contato', label: 'Contacto' },
  ],
  hero: {
    pill: '10M+ enlaces acortados',
    titleStart: 'Los enlaces largos\nmerecen un',
    titleGradient: 'mejor destino.',
    description:
      'Transforma cualquier URL en un enlace limpio, rastreable y profesional en segundos. Sin registro, sin complicaciones.',
    stats: [
      { value: '99.9%', label: 'disponibilidad garantizada' },
      { value: '< 0.1s', label: 'tiempo de respuesta' },
      { value: 'Free', label: 'para siempre' },
    ],
  },
  form: {
    title: 'Acorta ahora',
    subtitle: 'Pega tu URL abajo y genera el enlace con un clic.',
    urlLabel: 'Tu URL',
    placeholder: 'https://ejemplo.com/url-larga...',
    submit: 'Acortar enlace ->',
    resultTitle: 'Tu enlace acortado',
    validityTextStart: 'Enlace valido por 30 dias -',
    validityLink: 'crear cuenta para conservarlo',
    validityLinkHref: '/signup',
    copyDefault: 'Copiar',
    copySuccess: 'Copiado ✓',
    urlError: 'Ingresa una URL valida para continuar.',
  },
  howItWorks: {
    badge: 'Como funciona',
    title: 'Simple por diseno.\nPotente por dentro.',
    description:
      'shun.to fue creado para quienes necesitan velocidad sin perder control. Sin menus complicados, solo resultados.',
    steps: [
      {
        id: '01 - Pega',
        title: 'Cualquier URL funciona',
        description:
          'No importa el tamano o destino: producto, articulo, campana, hoja de calculo. Si tiene URL, shun.to la acorta.',
      },
      {
        id: '02 - Acorta',
        title: 'Un clic y listo',
        description:
          'Nuestro motor genera el enlace en menos de 100ms. Sin espera, sin captcha, sin burocracia. Solo tu nuevo enlace.',
      },
      {
        id: '03 - Analiza',
        title: 'Datos en tiempo real',
        description:
          'Ve cuantos clics recibio tu enlace, de donde vienen y en que dispositivo. Todo en el panel, sin necesidad de GA.',
      },
    ],
    calloutTitle: 'Listo para empezar?',
    calloutDescription: 'Sin registro obligatorio. Pruebalo ahora, gratis.',
    calloutButton: 'Acortar mi enlace ->',
  },
  faq: {
    badge: 'FAQ',
    title: 'Preguntas frecuentes.',
    items: [
      {
        question: 'Los enlaces caducan?',
        answer:
          'Los enlaces creados sin cuenta permanecen activos por 30 dias. Con una cuenta gratuita los conservas para siempre y ademas puedes editar el destino cuando quieras.',
      },
      {
        question: 'Necesito crear una cuenta para usarlo?',
        answer:
          'No. Puedes acortar tu URL directamente en la pagina sin registro. La cuenta es opcional y solo necesaria si quieres analiticas, enlaces permanentes o dominio personalizado.',
      },
      {
        question: 'shun.to es realmente gratis?',
        answer:
          'Si. El plan gratuito no tiene limite diario de enlaces creados. En el futuro puede existir un plan Pro con funciones avanzadas, pero el acortador basico siempre sera gratis.',
      },
      {
        question: 'Puedo ver cuantas personas hicieron clic en mi enlace?',
        answer:
          'Si. Con una cuenta gratuita accedes al panel de analiticas con numero de clics, origen geografico y tipo de dispositivo en tiempo real, sin usar Google Analytics.',
      },
      {
        question: 'Puedo usarlo en campanas de marketing o correo?',
        answer:
          'Si, y es uno de los usos mas comunes. Los enlaces cortos mejoran la tasa de clics en correos y se ven mejor en redes sociales. La API tambien permite generar enlaces en lote para grandes campanas.',
      },
    ],
  },
  footer: {
    description:
      'Enlaces mas cortos, mayor alcance. Acortador gratuito para personas y equipos.',
    socialAriaLabels: {
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      facebook: 'Facebook',
    },
    columns: [
      {
        title: 'Producto',
        links: [
          { href: '#', label: 'Acortador' },
          { href: '#', label: 'Analiticas' },
          { href: '#', label: 'Enlaces personalizados' },
          { href: '#', label: 'QR Code' },
        ],
      },
      {
        title: 'Empresa',
        links: [
          { href: '/sobre', label: 'Sobre nosotros' },
          { href: '#', label: 'Blog' },
          { href: '#', label: 'Carreras' },
          { href: '/contato', label: 'Contacto' },
        ],
      },
      {
        title: 'Developers',
        links: [
          { href: '#', label: 'Partner API' },
          { href: '#', label: 'Documentacion' },
          { href: '#', label: 'Estado' },
          { href: '#', label: 'Knowledge Base' },
        ],
      },
    ],
    copyright: '© 2025 shun.to - Todos los derechos reservados.',
    legal: ['Privacidad', 'Terminos de uso', 'Cookies'],
  },
  languages: [
    { code: 'pt-br', flag: '🇧🇷', label: 'Portugues' },
    { code: 'en', flag: '🇺🇸', label: 'Ingles' },
    { code: 'es', flag: '🇪🇸', label: 'Espanol' },
  ],
}
