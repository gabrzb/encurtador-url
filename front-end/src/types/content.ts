export interface LanguageOption {
  flag: string
  label: string
}

export interface NavMenuItem {
  href: string
  label: string
}

export interface StatItem {
  value: string
  label: string
}

export interface StepItem {
  id: string
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FooterColumn {
  title: string
  links: string[]
}

export interface ContentData {
  brand: string
  languageAriaLabel: string
  themeToggleAriaLabel: string
  githubLabel: string
  loginLabel: string
  menuLabel: string
  closeLabel: string
  pageHeading: string
  companyHeading: string
  pageMenu: NavMenuItem[]
  companyMenu: NavMenuItem[]
  hero: {
    pill: string
    titleStart: string
    titleGradient: string
    description: string
    stats: StatItem[]
  }
  form: {
    title: string
    subtitle: string
    urlLabel: string
    placeholder: string
    submit: string
    resultTitle: string
    validityTextStart: string
    validityLink: string
    copyDefault: string
    copySuccess: string
  }
  howItWorks: {
    badge: string
    title: string
    description: string
    steps: StepItem[]
    calloutTitle: string
    calloutDescription: string
    calloutButton: string
  }
  faq: {
    badge: string
    title: string
    items: FaqItem[]
  }
  footer: {
    description: string
    columns: FooterColumn[]
    copyright: string
    legal: string[]
  }
  languages: LanguageOption[]
}
