'use client'

import { cn } from '@/lib/utils'
import { Minus, Plus, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function BadgeList({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'ul'>) {
  return (
    <ul
      className={cn('flex flex-wrap items-center gap-1 p-1', className)}
      {...props}
    >
      {children}
    </ul>
  )
}

export function BadgeListItem({
  className,
  children,
  include,
  exclude,
  onRemove,
  ...props
}: BadgeProps & {
  include?: boolean | null
  exclude?: boolean | null
  onRemove?: () => void
}) {
  const t = useTranslations('Global')

  return (
    <li>
      <Badge
        variant="outline"
        className={cn(
          'gap-2 py-1 pl-3 pr-1 font-normal dark:border-primary/10',
          {
            className,
          }
        )}
        {...props}
      >
        <span className="flex items-center gap-1 text-muted-foreground">
          {include && <Plus className="size-3 text-green-600" />}
          {exclude && <Minus className="size-3 text-red-600" />}
          {children}
        </span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-4"
                onClick={onRemove}
              >
                <X className="!size-3 text-muted-foreground" />
                <span className="sr-only">{t('remove')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('remove')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Badge>
    </li>
  )
}
