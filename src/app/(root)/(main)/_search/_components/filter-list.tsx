import { cn } from '@/lib/utils'
import * as React from 'react'

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
        'mb-px flex cursor-pointer items-center justify-between rounded-lg p-0.5 transition-colors duration-150 hover:bg-muted',
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
      className={cn('flex items-center gap-2 text-sm', className)}
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
    <div>
      <div
        className={cn(
          'flex size-8 items-center justify-center rounded-full bg-primary-foreground',
          className
        )}
        {...props}
      >
        {children}
      </div>
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
              className={cn('size-6', className)}
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
