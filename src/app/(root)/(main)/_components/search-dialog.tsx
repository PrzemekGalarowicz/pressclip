'use client'

import {
  Teaser,
  TeaserContent,
  TeaserHeader,
  TeaserImage,
  TeaserList,
  TeaserListItem,
  TeaserTitle,
} from './teaser'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import { useIsMobile } from '@/hooks/use-mobile'

import { CommandKey } from '@/components/command-key'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

const SearchDialogInput = React.forwardRef<
  HTMLInputElement,
  { loading: boolean } & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, loading, disabled, ...props }, ref) => (
  <div className="relative mb-3 flex items-center px-5" cmdk-input-wrapper="">
    <Search
      className={cn('absolute left-9 mr-2 size-4 shrink-0 opacity-50', {
        '!opacity-35': loading || disabled,
      })}
    />
    <Input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-full border-0 bg-secondary py-3 !pl-12 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      disabled={loading || disabled}
      {...props}
    />
    {loading && (
      <Spinner className="absolute right-10 top-3.5 size-4 shrink-0 text-gray-400" />
    )}
  </div>
))
SearchDialogInput.displayName = 'SearchDialogInput'

export function SearchDialogSkeleton() {
  return (
    <CommandGroup>
      {Array.from({ length: 3 }).map((_, index) => (
        <CommandItem key={index} className="!bg-transparent !px-2">
          <Teaser>
            <TeaserContent>
              <TeaserHeader>
                <TeaserTitle>
                  <Skeleton className="mb-2 h-6 w-full" />
                  <Skeleton className="h-6 w-3/5" />
                </TeaserTitle>
                <TeaserList className="font-sans">
                  <TeaserListItem>
                    <Skeleton className="h-2 w-20" />
                  </TeaserListItem>
                </TeaserList>
              </TeaserHeader>
              <Skeleton className="h-18 w-[106px]" />
            </TeaserContent>
          </Teaser>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

export function SearchDialog() {
  const t = useTranslations('SearchDialog')

  const isMobile = useIsMobile()

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button
        variant={isMobile ? 'secondary' : 'outline'}
        className="relative w-10 md:w-full"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4 text-muted-foreground md:mr-2" />
        <span className="sr-only md:not-sr-only">{t('search')}</span>
        <CommandKey
          className="top-2.75 absolute right-4 hidden md:flex"
          keyboardKey="K"
        />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="px-6 py-4">{t('search')}</DialogTitle>

        <SearchDialogInput
          placeholder={t('searchPlaceholder')}
          value={value}
          loading={true}
          onChange={(e) => setValue(e.target.value)}
        />

        <CommandList className="px-2">
          <SearchDialogSkeleton />

          {/* <CommandEmpty>{t('noResults')}</CommandEmpty>
          <CommandGroup className="font-serif" heading={t('result')}>
            {Array.from({ length: 5 }).map((_, index) => (
              <CommandItem key={index} className="!bg-transparent !px-2">
                <Teaser>
                  <TeaserContent>
                    <TeaserHeader>
                      <TeaserTitle className="text-base">
                        Iran Secretly Warns U.S. Allies: Don’t Help Israel, or
                        You’re Next
                      </TeaserTitle>
                      <TeaserList className="font-sans">
                        <TeaserListItem>Technology</TeaserListItem>
                        <TeaserListItem>1 hour ago</TeaserListItem>
                      </TeaserList>
                    </TeaserHeader>
                    <TeaserImage
                      src="https://images.unsplash.com/photo-1728410994982-e376651ba722?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Photo by Drew Beamer"
                    />
                  </TeaserContent>
                </Teaser>
              </CommandItem>
            ))}
          </CommandGroup> */}

          {/* <CommandGroup className="font-serif" heading={t('lastSearches')}>
            {Array.from({ length: 5 }).map((_, index) => (
              <CommandItem key={index} className="!bg-transparent !px-2">
                <Teaser>
                  <TeaserContent>
                    <TeaserHeader>
                      <TeaserTitle className="text-base">
                        Iran Secretly Warns U.S. Allies: Don’t Help Israel, or
                        You’re Next
                      </TeaserTitle>
                      <TeaserList className="font-sans">
                        <TeaserListItem>Technology</TeaserListItem>
                        <TeaserListItem>1 hour ago</TeaserListItem>
                      </TeaserList>
                    </TeaserHeader>
                    <TeaserImage
                      src="https://images.unsplash.com/photo-1728410994982-e376651ba722?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Photo by Drew Beamer"
                    />
                  </TeaserContent>
                </Teaser>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-3" />
          <CommandGroup className="font-serif" heading={t('recommended')}>
            {Array.from({ length: 8 }).map((_, index) => (
              <CommandItem key={index} className="!bg-transparent !px-2">
                <Teaser>
                  <TeaserContent>
                    <TeaserHeader>
                      <TeaserTitle className="text-base">
                        Iran Secretly Warns U.S. Allies: Don’t Help Israel, or
                        You’re Next
                      </TeaserTitle>
                      <TeaserList className="font-sans">
                        <TeaserListItem>Technology</TeaserListItem>
                        <TeaserListItem>1 hour ago</TeaserListItem>
                      </TeaserList>
                    </TeaserHeader>
                    <TeaserImage
                      src="https://images.unsplash.com/photo-1728410994982-e376651ba722?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Photo by Drew Beamer"
                    />
                  </TeaserContent>
                </Teaser>
              </CommandItem>
            ))}
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  )
}
