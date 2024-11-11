import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'

export function LogoSignature({
  href = '/',
  className,
  ...props
}: NextLinkProps & {
  className?: string
}) {
  return (
    <Link href={href} className={cn('flex items-center', className)} {...props}>
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary font-serif text-2xl font-bold text-white dark:text-black">
        P
      </span>
      <span className="sr-only">Pressclip</span>
    </Link>
  )
}
