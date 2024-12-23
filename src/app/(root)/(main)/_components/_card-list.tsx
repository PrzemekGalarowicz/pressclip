'use client'

import {
  Card,
  CardFooter,
  CardLink,
  CardMenu,
  CardMenuContent,
  CardMenuItem,
  CardMenuTrigger,
  CardTitle,
} from './card'
import { FolderOpen, Pen, Trash, UserPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function List() {
  const t = useTranslations('Global')

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <Card>
        <CardLink href={'/'}>
          <CardTitle>Bookmarks</CardTitle>
        </CardLink>

        <CardFooter>
          <Avatar className="size-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <CardMenu>
            <CardMenuTrigger />
            <CardMenuContent className="z-10" align="end">
              <CardMenuItem
                onClick={() => {
                  console.log('open')
                }}
              >
                <Eye className="text-muted-foreground" /> {t('view')}
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
                <UserPlus className="text-muted-foreground" /> {t('share')}
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
        </CardFooter>
      </Card>

      <Card>
        <CardLink href={'/'}>
          <CardTitle>Read later</CardTitle>
        </CardLink>

        <CardFooter>
          <div className="flex items-center gap-2">
            <Avatar className="size-6 border border-muted">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="-ml-5 size-6 border border-muted">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="-ml-5 size-6 border border-muted">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <CardMenu>
            <CardMenuTrigger />
            <CardMenuContent className="z-10" align="end">
              <CardMenuItem
                onClick={() => {
                  console.log('open')
                }}
              >
                <Eye className="text-muted-foreground" /> {t('view')}
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
                <UserPlus className="text-muted-foreground" /> {t('share')}
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
        </CardFooter>
      </Card>
    </div>
  )
}
