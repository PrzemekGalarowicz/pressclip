'use client'

import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { useScroll } from '@/hooks/use-scroll'

import { Button, ButtonProps } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function BackButton({
  className,
  variant = 'ghost',
  onClick,
  ...props
}: ButtonProps) {
  const t = useTranslations('Global')

  const router = useRouter()

  return (
    <Button
      variant={variant}
      className={cn('w-10 md:w-auto', className)}
      onClick={(event) => {
        router.back()
        if (onClick) {
          onClick(event)
        }
      }}
      {...props}
    >
      <ArrowLeft className="size-4" />
      <span className="sr-only md:not-sr-only md:ml-2">{t('back')}</span>
    </Button>
  )
}

export function AppHeader({
  className,
  children,
  title,
  backButton,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  title?: React.ReactNode
  backButton?: boolean
}) {
  const isScroll = useScroll()

  return (
    <header
      className={cn(
        'sticky top-0 flex h-14 w-full items-center justify-between gap-4 bg-background/95 py-2 transition-all duration-300',
        isScroll && 'shadow-[0px_6px_6px_-6px_rgba(0,0,0,0.15)]',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hidden md:flex" />
        {backButton && <BackButton />}
        <h1 className="text-lg tracking-wider md:text-xl lg:text-2xl">
          {title}
        </h1>
      </div>

      {children}
    </header>
  )
}
