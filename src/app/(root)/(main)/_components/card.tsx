'use client'

import { cn } from '@/lib/utils'
import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu'
import Link, { LinkProps } from 'next/link'
import * as React from 'react'

import { EllipsisButton } from '@/components/ellipsis-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Card({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-muted shadow-sm transition-colors duration-150 hover:bg-muted/75',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'h3'>) {
  return (
    <h3
      className={cn(
        'line-clamp-2 w-full text-sm font-semibold md:text-base lg:line-clamp-3 lg:text-xl',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardLink({
  className,
  children,
  ...props
}: LinkProps & { className?: string; children: React.ReactNode }) {
  return (
    <Link
      className={cn(`flex h-40 w-full flex-col rounded-2xl p-4`, className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export function CardFooter({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'footer'>) {
  return (
    <footer
      className={cn(
        'mt-auto flex items-center justify-between px-4 py-2',
        className
      )}
      {...props}
    >
      {children}
    </footer>
  )
}

export const CardMenu = DropdownMenu

export const CardMenuItem = DropdownMenuItem

export const CardMenuContent = DropdownMenuContent

export function CardMenuTrigger({
  className,
  children,
  ...props
}: DropdownMenuTriggerProps) {
  if (children) {
    return (
      <DropdownMenuTrigger asChild {...props}>
        {children}
      </DropdownMenuTrigger>
    )
  }
  return (
    <DropdownMenuTrigger asChild {...props}>
      <EllipsisButton className={cn('bottom-0', className)} />
    </DropdownMenuTrigger>
  )
}
