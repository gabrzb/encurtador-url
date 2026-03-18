import type { ContentData } from '@/types/content'

export const esContent: ContentData = {
  brand: 'shun.to',
  interfaceControlsAriaLabel: 'Controles de interfaz',
  languageAriaLabel: 'Idioma',
  themeToggleAriaLabel: 'Cambiar tema',
  loginLabel: 'Acceder',
  menuLabel: 'Navegar',
  closeLabel: 'Cerrar',
  pageHeading: 'Navegación',
  companyHeading: 'Empresa',
  pageMenu: [
    { href: '#como-funciona', label: 'Cómo funciona' },
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
    validityTextStart: 'Enlace válido por 30 días -',
    validityLink: 'crear cuenta para conservarlo',
    validityLinkHref: '/signup',
    copyDefault: 'Copiar',
    copySuccess: 'Copiado ✓',
    urlError: 'Ingresa una URL válida para continuar.',
  },
  howItWorks: {
    badge: 'Cómo funciona',
    title: 'Simple por diseño.\nPotente por dentro.',
    description:
      'shun.to fue creado para quienes necesitan velocidad sin perder control. Sin menús complicados, solo resultados.',
    steps: [
      {
        id: '01 - Pega',
        title: 'Cualquier URL funciona',
        description:
          'No importa el tamaño o destino: producto, artículo, campaña, hoja de cálculo. Si tiene URL, shun.to la acorta.',
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
    calloutTitle: '¿Listo para empezar?',
    calloutDescription: 'Sin registro obligatorio. Pruébalo ahora, gratis.',
    calloutButton: 'Acortar mi enlace ->',
  },
  faq: {
    badge: 'FAQ',
    title: 'Preguntas frecuentes.',
    items: [
      {
        question: '¿Los enlaces caducan?',
        answer:
          'Los enlaces creados sin cuenta permanecen activos por 30 días. Con una cuenta gratuita los conservas para siempre y además puedes editar el destino cuando quieras.',
      },
      {
        question: '¿Necesito crear una cuenta para usarlo?',
        answer:
          'No. Puedes acortar tu URL directamente en la página sin registro. La cuenta es opcional y solo necesaria si quieres analíticas, enlaces permanentes o dominio personalizado.',
      },
      {
        question: '¿shun.to es realmente gratis?',
        answer:
          'Sí. El plan gratuito no tiene límite diario de enlaces creados. En el futuro puede existir un plan Pro con funciones avanzadas, pero el acortador básico siempre sera gratis.',
      },
      {
        question: '¿Puedo ver cuántas personas hicieron clic en mi enlace?',
        answer:
          'Sí. Con una cuenta gratuita accedes al panel de analíticas con número de clics, origen geográfico y tipo de dispositivo en tiempo real, sin usar Google Analytics.',
      },
      {
        question: '¿Puedo usarlo en campañas de marketing o correo?',
        answer:
          'Sí, y es uno de los usos más comunes. Los enlaces cortos mejoran la tasa de clics en correos y se ven mejor en redes sociales. La API también permite generar enlaces en lote para grandes campañas.',
      },
    ],
  },
  footer: {
    description:
      'Enlaces más cortos, mayor alcance. Acortador gratuito para personas y equipos.',
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
          { href: '#', label: 'Analíticas' },
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
          { href: '#', label: 'Documentación' },
          { href: '#', label: 'Estado' },
          { href: '#', label: 'Knowledge Base' },
        ],
      },
    ],
    copyright: '© 2025 shun.to - Todos los derechos reservados.',
    legal: ['Privacidad', 'Términos de uso', 'Cookies'],
  },
  languages: [
    { code: 'pt-br', flag: '🇧🇷', label: 'Portugués' },
    { code: 'en', flag: '🇺🇸', label: 'Inglés' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
  ],
}
