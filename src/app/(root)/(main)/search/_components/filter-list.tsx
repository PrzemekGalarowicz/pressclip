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

export function FilterListItem({ className, children, ...props }: ButtonProps) {
  return (
    <li className="mb-px">
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-between rounded-lg p-1.5 transition-colors duration-150 hover:bg-muted/50',
          className
        )}
        {...props}
      >
        {children}
      </Button>
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
          'flex size-8 items-center justify-center rounded-full bg-muted',
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
        'ml-auto flex items-center justify-center gap-1 text-right',
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
              className={cn('size-7', className)}
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
