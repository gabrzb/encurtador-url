import * as React from 'react'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card" className={className} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={className} {...props} />
}

export { Card, CardContent }
