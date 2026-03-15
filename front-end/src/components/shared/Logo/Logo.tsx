import GradientText from '@/components/ui/GradientText/GradientText'

interface LogoProps {
  brand: string
  textClassName?: string
}

export function Logo({ brand, textClassName }: LogoProps) {
  const parts = brand.split('.')
  const left = parts[0]
  const right = parts[1] ?? ''

  return (
    <>
      <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#111" />
        <rect x="8" y="24" width="24" height="5" rx="1.5" fill="white" />
        <rect x="9" y="17" width="9" height="7" rx="2" fill="white" />
        <rect x="22" y="17" width="9" height="7" rx="2" fill="white" />
        <rect x="8" y="13" width="24" height="4" rx="2" fill="white" opacity="0.4" />
      </svg>
      <span className={textClassName}>
        {left}
        {right ? (
          <GradientText className="inline-block" colors={['#441fff', '#763ef9', '#8f5ee8']} animationSpeed={2}>
            .{right}
          </GradientText>
        ) : null}
      </span>
    </>
  )
}
