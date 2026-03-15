import { Reveal } from '@/components/ui/Reveal/Reveal'
import type { FaqSectionProps } from '@/types/sections'
import './FaqSection.css'

export function FaqSection({ content, openIndex, onToggle }: FaqSectionProps) {
  return (
    <section id="faq" className="px-4 sm:px-6 py-16 sm:py-28" style={{ background: 'var(--bg)', transition: 'background 0.4s ease' }}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 mb-10 sm:mb-14">
          <span className="text-[0.78rem] font-semibold tracking-widest uppercase" style={{ color: '#7c6ffa' }}>
            {content.faq.badge}
          </span>
          <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-1)' }}>
            {content.faq.title}
          </h2>
        </div>

        <div id="faq-list" className="flex flex-col" style={{ borderTop: '1px solid var(--border-mid)' }}>
          {content.faq.items.map((item, index) => {
            const open = openIndex === index
            return (
              <Reveal key={item.question} delayMs={80 + index * 70}>
                <div
                  className="faq-item"
                  style={index < content.faq.items.length - 1 ? { borderBottom: '1px solid var(--border-mid)' } : undefined}
                >
                  <button
                    className="faq-btn w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer bg-transparent border-none"
                    type="button"
                    onClick={() => onToggle(index)}
                  >
                    <span className="text-[0.92rem] sm:text-[1rem] font-semibold pr-2" style={{ color: 'var(--text-1)' }}>
                      {item.question}
                    </span>
                    <span
                      className="faq-icon shrink-0 text-[1.2rem] font-light select-none"
                      style={{
                        color: 'var(--text-4)',
                        transition: 'transform 0.3s ease',
                        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div className="faq-body overflow-hidden" style={{ maxHeight: open ? '180px' : '0px' }}>
                    <p className="text-[0.87rem] sm:text-[0.9rem] leading-relaxed pb-5" style={{ color: 'var(--text-3)' }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
