'use client'

import { AppSidebarItem } from './app-sidebar-item'
import { UserDropdown } from './user-dropdown'
import {
  Bookmark,
  CalendarClock,
  LifeBuoy,
  List,
  ListRestart,
  Search,
  Settings,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { ThemeDropdown } from '@/app/_components/theme-dropdown'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function AppSidebar() {
  const t = useTranslations('AppSidebar')

  const items = [
    { title: t('tasks'), url: '/tasks', icon: ListRestart },
    { title: t('schedule'), url: '/schedule', icon: CalendarClock },
    { title: t('lists'), url: '/lists', icon: List },
    { title: t('saved'), url: '/saved', icon: Bookmark },
  ]

  const secondaryItems = [
    { title: t('settings'), url: '/settings', icon: Settings },
    { title: t('support'), url: '/support', icon: LifeBuoy },
  ]

  return (
    <Sidebar className="!border-0">
      <SidebarHeader>
        <Logo href="/" className="m-5" />
      </SidebarHeader>
      <SidebarContent>
        <Button
          variant="secondary"
          size="lg"
          className="group/btn mx-5 mb-8 mt-6 hidden w-fit px-6 md:flex"
        >
          <Search className="mr-3 size-5 transition-all duration-300 group-hover/btn:scale-125" />
          {t('search')}
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
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="sm">
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <ul className="hidden gap-4 md:flex" role="menu">
                  <li role="menuitem">
                    <UserDropdown />
                  </li>

                  <li role="menuitem">
                    <ThemeDropdown side="top" />
                  </li>
                </ul>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
