import type { ContentData } from '@/types/content'

export const enContent: ContentData = {
  brand: 'shun.to',
  interfaceControlsAriaLabel: 'Interface controls',
  languageAriaLabel: 'Language',
  themeToggleAriaLabel: 'Toggle theme',
  githubLabel: 'GitHub',
  githubUrl: 'https://github.com/gabrzb/encurtador-url',
  loginLabel: 'Sign in',
  menuLabel: 'Browse',
  closeLabel: 'Close',
  pageHeading: 'Navigation',
  companyHeading: 'Company',
  pageMenu: [
    { href: '#como-funciona', label: 'How it works' },
    { href: '#faq', label: 'Questions' },
  ],
  companyMenu: [
    { href: '/sobre', label: 'About us' },
    { href: '/contato', label: 'Contact' },
  ],
  hero: {
    pill: '10M+ links shortened',
    titleStart: 'Long links\ndeserve a',
    titleGradient: 'better destination.',
    description:
      'Turn any URL into a clean, trackable, and professional link in seconds. No sign-up, no friction.',
    stats: [
      { value: '99.9%', label: 'guaranteed uptime' },
      { value: '< 0.1s', label: 'response time' },
      { value: 'Free', label: 'forever' },
    ],
  },
  form: {
    title: 'Shorten now',
    subtitle: 'Paste your URL below and generate a link in one click.',
    urlLabel: 'Your URL',
    placeholder: 'https://example.com/long-url...',
    submit: 'Shorten link ->',
    resultTitle: 'Your shortened link',
    validityTextStart: 'Link valid for 30 days -',
    validityLink: 'create an account to keep it',
    validityLinkHref: '/signup',
    copyDefault: 'Copy',
    copySuccess: 'Copied ✓',
    urlError: 'Enter a valid URL to continue.',
  },
  howItWorks: {
    badge: 'How it works',
    title: 'Simple by design.\nPowerful under the hood.',
    description:
      'shun.to was built for people who need speed without giving up control. No complex menus, just results.',
    steps: [
      {
        id: '01 - Paste',
        title: 'Any URL works',
        description:
          'No matter the size or destination: product, article, campaign, spreadsheet. If it has a URL, shun.to shortens it.',
      },
      {
        id: '02 - Shorten',
        title: 'One click, done',
        description:
          'Our engine creates your short link in less than 100ms. No waiting, no captcha, no bureaucracy. Just the new link in your hands.',
      },
      {
        id: '03 - Track',
        title: 'Real-time insights',
        description:
          'See how many clicks your link got, where they came from, and which device was used. All in one dashboard, no GA required.',
      },
    ],
    calloutTitle: 'Ready to get started?',
    calloutDescription: 'No mandatory sign-up. Try it now, free.',
    calloutButton: 'Shorten my link ->',
  },
  faq: {
    badge: 'FAQ',
    title: 'Frequently asked questions.',
    items: [
      {
        question: 'Do links expire?',
        answer:
          'Links created without an account stay active for 30 days. With a free account, you keep links forever and can edit the destination anytime.',
      },
      {
        question: 'Do I need an account to use it?',
        answer:
          'No. You can shorten your URL right away with no sign-up. An account is optional and only needed if you want analytics, permanent links, or a custom domain.',
      },
      {
        question: 'Is shun.to really free?',
        answer:
          'Yes. The free plan has no daily limit on created links. A Pro plan with advanced features may come later, but basic shortening will always stay free.',
      },
      {
        question: 'Can I see how many people clicked my link?',
        answer:
          'Yes. With a free account, you can access analytics with clicks, geographic origin, and device type in real time, without needing Google Analytics.',
      },
      {
        question: 'Can I use it for marketing campaigns or email?',
        answer:
          'Yes, and that is one of the most common use cases. Short links improve click-through rates in emails and look better in social posts. The API also supports bulk link generation for large campaigns.',
      },
    ],
  },
  footer: {
    description:
      'Shorter links, farther reach. Free URL shortener for people and teams.',
    socialAriaLabels: {
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      facebook: 'Facebook',
    },
    columns: [
      {
        title: 'Product',
        links: [
          { href: '#', label: 'Shortener' },
          { href: '#', label: 'Analytics' },
          { href: '#', label: 'Custom links' },
          { href: '#', label: 'QR Code' },
        ],
      },
      {
        title: 'Company',
        links: [
          { href: '/sobre', label: 'About us' },
          { href: '#', label: 'Blog' },
          { href: '#', label: 'Careers' },
          { href: '/contato', label: 'Contact' },
        ],
      },
      {
        title: 'Developers',
        links: [
          { href: '#', label: 'Partner API' },
          { href: '#', label: 'Documentation' },
          { href: '#', label: 'Status' },
          { href: '#', label: 'Knowledge Base' },
        ],
      },
    ],
    copyright: '© 2025 shun.to - All rights reserved.',
    legal: ['Privacy', 'Terms of use', 'Cookies'],
  },
  languages: [
    { code: 'pt-br', flag: '🇧🇷', label: 'Portuguese' },
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'es', flag: '🇪🇸', label: 'Spanish' },
  ],
}
