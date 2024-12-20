'use client'

import {
  CardMenu,
  CardMenuContent,
  CardMenuItem,
  CardMenuTrigger,
} from './card'
import { UserDropdown } from './user-dropdown'
import { cn } from '@/lib/utils'
import {
  Bookmark,
  Bot,
  CalendarSearch,
  ChevronRight,
  Flag,
  FlaskConical,
  Folder,
  FolderOpen,
  FolderSearch,
  MoreHorizontal,
  Pen,
  Plus,
  Search,
  Trash,
  TrendingUp,
  UserPlus,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { ThemeDropdown } from '@/app/_components/theme-dropdown'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

export function SidebarMenuLink(
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
        'mb-px h-12 w-full justify-start rounded-none px-5 transition-all duration-300 hover:rounded-r-lg hover:bg-gray-50 dark:hover:bg-[#1f1f1f] md:h-10',
        props.className,
        {
          'relative bg-secondary text-black before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-black before:content-[""] dark:text-white dark:before:bg-white md:rounded-r-lg':
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

export function AppSidebar() {
  const t = useTranslations('AppSidebar')

  const mainMenuItems = [
    { title: t('trending'), url: '/trending', icon: TrendingUp },
    { title: t('bookmarks'), url: '/bookmarks', icon: Bookmark },
    { title: t('searches'), url: '/searches', icon: FolderSearch },
    { title: t('schedule'), url: '/schedule', icon: CalendarSearch },
  ]

  const feedsMenuItems = [
    {
      title: 'Science',
      url: '/feeds/science',
      icon: FlaskConical,
      items: [
        {
          title: 'The New York Times',
          url: '/feeds/science?source=nyt',
          icon: null,
        },
        {
          title: 'Science',
          url: '/feeds/science?source=the-guardian',
          icon: null,
        },
      ],
    },
    {
      title: 'US News',
      url: '/feeds/us-news',
      icon: Flag,
      items: [
        {
          title: 'The New York Times',
          url: '/feeds/us-news?source=nyt',
          icon: null,
        },
        {
          title: 'The Guardian',
          url: '/feeds/us-news?source=the-guardian',
          icon: null,
        },
        {
          title: 'The Washington Post',
          url: '/feeds/us-news?source=washington-post',
          icon: null,
        },
        {
          title: 'The Wall Street Journal',
          url: '/feeds/us-news?source=wall-street-journal',
          icon: null,
        },
      ],
    },
    {
      title: 'Tech',
      url: '/feeds/tech',
      icon: Bot,
      items: [
        {
          title: 'TechCrunch',
          url: '/feeds/tech?source=techcrunch',
          icon: null,
        },
        { title: 'The Verge', url: '/feeds/tech?source=the-verge', icon: null },
      ],
    },
  ]

  const projects = [
    { name: 'Project 1', url: '/projects/1', icon: Folder },
    { name: 'Project 2', url: '/projects/2', icon: Folder },
  ]

  return (
    <Sidebar className="!border-0">
      <SidebarHeader>
        <Logo href="/search" className="m-2" />
      </SidebarHeader>

      <SidebarContent>
        <div className="mx-4 mb-3 mt-4">
          <Button
            variant="secondary"
            size="lg"
            className="group/btn hidden w-fit px-6 md:flex"
            asChild
          >
            <Link href="/search" className="font-medium">
              <Search
                strokeWidth={2}
                className="mr-2 transition-all duration-300 group-hover/btn:scale-125"
              />
              {t('search')}
            </Link>
          </Button>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="h-9" asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            {t('subjects')}
            <Button
              variant="ghost"
              size="icon"
              className="size-5 rounded-md text-primary"
            >
              <Plus />
              <span className="sr-only">{t('add')}</span>
            </Button>
          </SidebarGroupLabel>

          <SidebarMenu>
            {feedsMenuItems.map((item) => (
              <Collapsible key={item.title} asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-9"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>

                  <CardMenu>
                    <CardMenuTrigger asChild>
                      <SidebarMenuAction className="mr-5 mt-0.5" showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">{t('more')}</span>
                      </SidebarMenuAction>
                    </CardMenuTrigger>
                    <CardMenuContent className="z-10" align="start">
                      <CardMenuItem
                        onClick={() => {
                          console.log('open')
                        }}
                      >
                        <FolderOpen className="text-muted-foreground" />
                        {t('open')}
                      </CardMenuItem>
                      <CardMenuItem
                        onClick={() => {
                          console.log('rename')
                        }}
                      >
                        <Pen className="text-muted-foreground" /> {t('rename')}
                      </CardMenuItem>
                      <CardMenuItem
                        onClick={() => {
                          console.log('share')
                        }}
                      >
                        <UserPlus className="text-muted-foreground" />
                        {t('share')}
                      </CardMenuItem>
                      <CardMenuItem
                        onClick={() => {
                          console.log('delete')
                        }}
                      >
                        <Trash className="text-destructive" /> {t('delete')}
                      </CardMenuItem>
                    </CardMenuContent>
                  </CardMenu>

                  {item.items.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="mt-0.5 data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">{t('toggle')}</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton className="h-8" asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>{t('workspaces')}</SidebarGroupLabel>

          <SidebarMenu>
            {projects.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton className="h-9" asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>

                <CardMenu>
                  <CardMenuTrigger asChild>
                    <SidebarMenuAction className="mt-0.5" showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">{t('more')}</span>
                    </SidebarMenuAction>
                  </CardMenuTrigger>
                  <CardMenuContent className="z-10" align="start">
                    <CardMenuItem
                      onClick={() => {
                        console.log('open')
                      }}
                    >
                      <FolderOpen className="text-muted-foreground" />{' '}
                      {t('open')}
                    </CardMenuItem>
                    <CardMenuItem
                      onClick={() => {
                        console.log('rename')
                      }}
                    >
                      <Pen className="text-muted-foreground" /> {t('rename')}
                    </CardMenuItem>
                    <CardMenuItem
                      onClick={() => {
                        console.log('share')
                      }}
                    >
                      <UserPlus className="text-muted-foreground" />
                      {t('share')}
                    </CardMenuItem>
                    <CardMenuItem
                      onClick={() => {
                        console.log('delete')
                      }}
                    >
                      <Trash className="text-destructive" /> {t('delete')}
                    </CardMenuItem>
                  </CardMenuContent>
                </CardMenu>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem>
              <SidebarMenuButton>
                <MoreHorizontal />
                <span>{t('more')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
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
