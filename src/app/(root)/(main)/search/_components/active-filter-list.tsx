import { cn } from '@/lib/utils'
import { Minus, Plus, X } from 'lucide-react'
import * as React from 'react'

import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { FilterType } from '../_type'

export function ActiveFilterList({
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

export function ActiveFilterListItem({
  className,
  children,
  include,
  exclude,
  onClear,
  ...props
}: BadgeProps & {
  include?: FilterType['include']
  exclude?: FilterType['exclude']
  onClear?: () => void
}) {
  return (
    <li>
      <Badge
        variant="outline"
        className={cn('gap-2 pl-1.5 pr-0.5 font-normal', {
          className,
        })}
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
                onClick={onClear}
              >
                <X className="!size-3 text-muted-foreground" />
                <span className="sr-only">Remove</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Badge>
    </li>
  )
}
