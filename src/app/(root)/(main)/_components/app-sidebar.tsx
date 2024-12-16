'use client'

import { AppSidebarItem } from './app-sidebar-item'
import { UserDropdown } from './user-dropdown'
import {
  Calendar,
  FileText,
  List,
  Paperclip,
  Plus,
  Search,
  TrendingUp,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ThemeDropdown } from '@/app/_components/theme-dropdown'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const items = [
  { title: 'Clipped', url: '/search', icon: Paperclip },
  { title: 'Lists', url: '/templates', icon: undefined },
  { title: 'Searches', url: '/trending', icon: undefined },
  { title: 'Scheduled', url: '/summaries', icon: undefined },
  { title: 'Templates', url: '/notes', icon: undefined },
]

export function AppSidebar() {
  const t = useTranslations('AppMenu')

  return (
    <Sidebar className="!border-0">
      <SidebarContent>
        <Logo href="/" className="m-5" />

        <Button
          variant="secondary"
          size="lg"
          className="group/btn mx-5 mb-10 mt-8 hidden w-fit px-6 md:flex"
        >
          <Search className="mr-3 size-5 transition-all duration-300 group-hover/btn:scale-125" />
          Search
        </Button>

        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <AppSidebarItem href={item.url}>
                {item.icon && <item.icon />}
                {item.title}
              </AppSidebarItem>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <ul
          className="absolute bottom-3 left-5 z-10 hidden gap-4 md:flex"
          role="menu"
        >
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
