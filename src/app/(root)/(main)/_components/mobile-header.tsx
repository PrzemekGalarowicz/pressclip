'use client'

import { UserDropdown } from './user-dropdown'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ThemeDropdown } from '@/app/_components/theme-dropdown'
import { LogoSignature } from '@/components/logo-signature'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function MobileHeader({ className }: { className?: string }) {
  const t = useTranslations('AppMenu')

  return (
    <header
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 flex h-14 w-full items-center justify-between gap-2 bg-background px-4 py-2 shadow-[0_5px_15px_rgba(0,0,0,0.3)] dark:shadow-[0_5px_15px_rgba(255,255,255,0.3)]',
        className
      )}
    >
      <SidebarTrigger />

      <Button variant="ghost" size="icon">
        <Search className="size-4" />
        <span className="sr-only">{t('new')}</span>
      </Button>

      <LogoSignature href="/" />

      <ThemeDropdown side="top" />

      <UserDropdown />
    </header>
  )
}
