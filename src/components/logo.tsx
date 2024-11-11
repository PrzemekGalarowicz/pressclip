import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'

export function Logo({
  href = '/',
  className,
  ...props
}: NextLinkProps & {
  className?: string
}) {
  return (
    <Link
      href={href}
      replace
      className={cn('flex items-center', className)}
      {...props}
    >
      <div className="flex items-center">
        <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary font-serif text-2xl font-bold text-white dark:text-black">
          P
        </span>
        <span className="font-serif text-xl font-bold tracking-[1px] text-primary">
          Pressclip
        </span>
      </div>
    </Link>
  )
}
