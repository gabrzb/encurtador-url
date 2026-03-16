import type { ContentData } from '@/types/content'
import type { ShortenResult } from '@/types/url'

export interface HeroSectionProps {
  content: ContentData
  input: string
  result: ShortenResult | null
  showError: boolean
  copied: boolean
  onInputChange: (value: string) => void
  onShorten: () => void
  onCopy: () => void
}

export interface HowItWorksSectionProps {
  content: ContentData
  onScrollToInput: () => void
}

export interface FaqSectionProps {
  content: ContentData
  openIndex: number | null
  onToggle: (index: number) => void
}

export interface FooterSectionProps {
  content: ContentData
}
