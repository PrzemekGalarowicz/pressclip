import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import * as React from 'react'

const Breaking = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      'flex flex-col rounded-lg bg-red-50 p-2 dark:bg-red-950 md:flex-row md:items-center',
      className
    )}
    {...props}
  />
))
Breaking.displayName = 'Breaking'

const BreakingTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'mb-1 mr-4 w-fit rounded-md bg-red-500 px-2 py-1 font-sans text-xs !font-medium uppercase text-white dark:bg-red-700 md:mb-0',
      className
    )}
    {...props}
  />
))
BreakingTitle.displayName = 'BreakingTitle'

const BreakingLink = React.forwardRef<
  HTMLAnchorElement,
  { className?: string; children: React.ReactNode } & LinkProps
>(({ className, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(
      'line-clamp-2 font-serif text-base leading-tight transition-all duration-300 hover:underline hover:underline-offset-4',
      className
    )}
    {...props}
  />
))
BreakingLink.displayName = 'BreakingLink'

export { Breaking, BreakingTitle, BreakingLink }
