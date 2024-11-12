'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'

import { Button, ButtonProps } from '@/components/ui/button'

interface AccentButtonProps extends ButtonProps {
  href: string
  icon?: ReactNode
  children: string
}

export function AccentButton({
  className,
  href,
  icon,
  children,
  ...props
}: AccentButtonProps) {
  return (
    <Button
      variant="secondary"
      className={cn('shadow-xs group shadow-purple-500', className)}
      asChild
      {...props}
    >
      <Link href={href}>
        {icon && (
          <span className="mr-2 flex size-4 items-center justify-center bg-clip-text text-red-500 dark:text-red-300">
            {icon}
          </span>
        )}
        <span className="flex bg-gradient-to-tr from-red-400 to-purple-700 bg-clip-text font-bold text-transparent dark:from-red-300 dark:to-purple-700">
          {children}
        </span>
      </Link>
    </Button>
  )
}
