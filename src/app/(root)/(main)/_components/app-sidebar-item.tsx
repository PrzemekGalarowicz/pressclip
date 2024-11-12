'use client'

import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function AppSidebarItem(
  props: {
    className?: string
    children: React.ReactNode
    onClick?: () => void
  } & LinkProps
) {
  const pathname = usePathname()
  const isActive = pathname.includes(props.href as string)

  return (
    <Button
      variant="ghost"
      className={cn(
        'mb-1 w-full justify-start rounded-none px-6 text-gray-700 transition-all duration-300 hover:rounded-r-lg hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-[#1f1f1f]',
        props.className,
        {
          'relative rounded-r-lg bg-secondary text-black before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-black before:content-[""] dark:text-white dark:before:bg-white':
            isActive,
        }
      )}
      onClick={props.onClick}
      asChild
    >
      <Link {...props}>{props.children}</Link>
    </Button>
  )
}
