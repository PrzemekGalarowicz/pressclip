import { cn } from '@/lib/utils'
import * as React from 'react'

import { AnimatedGroup } from '@/components/ui/animated-group'
import { Button, ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function FilterList({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'ul'>) {
  return (
    <ul className={cn('flex w-full flex-col', className)} {...props}>
      {children}
    </ul>
  )
}

export function FilterListItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'li'>) {
  return (
    <li
      className={cn(
        'my-px flex cursor-pointer items-center justify-between gap-4 rounded-2xl p-1.5 transition-colors duration-150 hover:bg-muted/40',
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
}

export function FilterListItemLabel({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('flex items-center gap-4 text-sm', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function FilterListItemIcon({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'flex size-8 items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function FilterListItemAction({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'ml-auto flex items-center justify-center gap-2 text-right',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function FilterListItemActionButton({
  className,
  variant = 'secondary',
  size = 'icon',
  children,
  tooltip,
  ...props
}: ButtonProps & { tooltip?: string }) {
  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={size}
              variant={variant}
              className={cn(className)}
              {...props}
            >
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Button size={size} variant={variant} className={cn(className)} {...props}>
      {children}
    </Button>
  )
}
