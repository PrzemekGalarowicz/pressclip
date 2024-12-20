'use client'

import { cn } from '@/lib/utils'
import { ScrollAreaProps } from '@radix-ui/react-scroll-area'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export const Categories = (props: ScrollAreaProps) => {
  const t = useTranslations('Categories')

  return (
    <ScrollArea
      className={cn(
        'flex w-full flex-row gap-2 whitespace-nowrap rounded-lg bg-secondary p-1',
        props.className
      )}
      {...props}
    >
      {[
        t('all'),
        t('general'),
        t('business'),
        t('entertainment'),
        t('health'),
        t('science'),
        t('sports'),
        t('technology'),
      ].map((category, index) => {
        const actvie = index === 0

        return (
          <Button
            key={category}
            variant="ghost"
            size="sm"
            className={cn(
              'mr-1 grow rounded-lg border-0 font-normal transition-all duration-300 hover:bg-white hover:shadow-sm disabled:opacity-100 dark:hover:bg-black lg:grow-0',
              { 'bg-white font-medium shadow-md dark:bg-black': actvie }
            )}
            disabled={actvie}
          >
            {category}
          </Button>
        )
      })}

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
