'use client'

import { AppSidebarItem } from './app-sidebar-item'
import { UserDropdown } from './user-dropdown'
import { Paperclip, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ThemeDropdown } from '@/app/_components/theme-dropdown'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent } from '@/components/ui/sidebar'

export function AppSidebar() {
  const t = useTranslations('AppMenu')

  return (
    <Sidebar className="!border-0">
      <SidebarContent>
        <Logo href="/" className="m-5" />

        <Button
          variant="secondary"
          size="lg"
          className="group/btn mx-5 mb-10 mt-8 w-fit rounded-full px-6"
        >
          <Plus className="mr-3 size-5 transition-all duration-150 group-hover/btn:scale-150" />
          {t('new')}
        </Button>

        <ul role="menu">
          <li role="menuitem">
            <AppSidebarItem href="/clipped">
              <Paperclip className="mr-2 size-5" />
              {t('clipped')}
            </AppSidebarItem>
          </li>
          <li role="menuitem">
            <AppSidebarItem href="/trending">{t('trending')}</AppSidebarItem>
          </li>
          <li role="menuitem">
            <AppSidebarItem href="/summaries">{t('summaries')}</AppSidebarItem>
          </li>
          <li role="menuitem">
            <AppSidebarItem href="/notes">{t('notes')}</AppSidebarItem>
          </li>
          <li role="menuitem">
            <AppSidebarItem href="/templates">{t('templates')}</AppSidebarItem>
          </li>
        </ul>

        <ul className="absolute bottom-3 left-5 z-10 flex gap-4" role="menu">
          <li role="menuitem">
            <UserDropdown />
          </li>

          <li role="menuitem">
            <ThemeDropdown side="top" />
          </li>
        </ul>
      </SidebarContent>
    </Sidebar>
  )
}
