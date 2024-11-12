'use client'

import { cn } from '@/lib/utils'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {
  Bookmark,
  BookmarkCheck,
  EllipsisVertical,
  Eye,
  EyeOff,
  FileCheck2,
  FileSymlink,
  Paperclip,
  Pencil,
  Trash,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import { Button, ButtonProps } from '@/components/ui/button'

const OptionMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const OptionMenuTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    const t = useTranslations('OptionsMenu')

    return (
      <DropdownMenuTrigger ref={ref} asChild>
        <Button
          size="icon"
          variant={variant || 'ghost'}
          className={cn('bg-background/90', className)}
          {...props}
        >
          <EllipsisVertical className="size-4 text-gray-700 dark:text-gray-300" />
          <span className="sr-only">{t('options')}</span>
        </Button>
      </DropdownMenuTrigger>
    )
  }
)
OptionMenuTrigger.displayName = 'OptionMenuTrigger'

const OptionMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(
  (
    { className, sideOffset = 4, align = 'end', forceMount = true, ...props },
    ref
  ) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        align={align}
        forceMount={forceMount}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
)
OptionMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const OptionMenuGroup = DropdownMenuPrimitive.Group

const OptionMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
OptionMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const OptionMenuViewButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    const t = useTranslations('OptionsMenu')

    return (
      <Button
        ref={ref}
        variant={variant || 'ghost'}
        className={cn('justify-start', className)}
        {...props}
      >
        <Eye className="mr-3 size-4 text-gray-700 dark:text-gray-300" />{' '}
        {t('view')}
      </Button>
    )
  }
)
OptionMenuViewButton.displayName = 'OptionMenuViewButton'

const OptionMenuEditButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    const t = useTranslations('OptionsMenu')

    return (
      <Button
        ref={ref}
        variant={variant || 'ghost'}
        className={cn('justify-start', className)}
        {...props}
      >
        <Pencil className="mr-3 size-4 text-gray-700 dark:text-gray-300" />{' '}
        {t('edit')}
      </Button>
    )
  }
)
OptionMenuEditButton.displayName = 'OptionMenuEditButton'

const OptionMenuDeleteButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    const t = useTranslations('OptionsMenu')

    return (
      <Button
        ref={ref}
        variant={variant || 'ghost'}
        className={cn('justify-start', className)}
        {...props}
      >
        <Trash className="mr-3 size-4 text-red-500 dark:text-red-400" />{' '}
        {t('delete')}
      </Button>
    )
  }
)
OptionMenuDeleteButton.displayName = 'OptionMenuDeleteButton'

const OptionMenuHideButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    const t = useTranslations('OptionsMenu')

    return (
      <Button
        ref={ref}
        variant={variant || 'ghost'}
        className={cn('justify-start', className)}
        {...props}
      >
        <EyeOff className="mr-3 size-4 text-gray-700 dark:text-gray-300" />{' '}
        {t('hide')}
      </Button>
    )
  }
)
OptionMenuHideButton.displayName = 'OptionMenuHideButton'

const OptionMenuPublishButton = React.forwardRef<
  HTMLButtonElement,
  { published?: boolean } & ButtonProps
>(({ className, variant, published, ...props }, ref) => {
  const t = useTranslations('OptionsMenu')

  return (
    <Button
      ref={ref}
      variant={variant || 'ghost'}
      className={cn('justify-start', className)}
      {...props}
    >
      {published ? (
        <>
          <FileCheck2 className="mr-3 size-4 text-gray-700 dark:text-gray-300" />{' '}
          {t('published')}
        </>
      ) : (
        <>
          <FileSymlink className="mr-3 size-4 text-gray-700 dark:text-gray-300" />{' '}
          {t('publish')}
        </>
      )}
    </Button>
  )
})
OptionMenuPublishButton.displayName = 'OptionMenuPublishButton'

const OptionMenuClipButton = React.forwardRef<
  HTMLButtonElement,
  { clipped?: boolean } & ButtonProps
>(({ className, variant, clipped, ...props }, ref) => {
  const t = useTranslations('OptionsMenu')

  const content = {
    sign: clipped ? '-' : '+',
    icon: (
      <Paperclip className="mr-3 size-4 text-gray-700 dark:text-gray-300" />
    ),
    text: clipped ? t('clipped') : t('clip'),
  }

  return (
    <Button
      ref={ref}
      variant={variant || 'ghost'}
      className={cn('justify-start', className)}
      {...props}
    >
      <div className="relative flex items-center">
        <span className="absolute -left-1 -top-1.5 text-sm text-gray-700 dark:text-gray-300">
          {content.sign}
        </span>
        {content.icon}
        {content.text}
      </div>
    </Button>
  )
})
OptionMenuClipButton.displayName = 'OptionMenuClipButton'

const OptionMenuBookmarkButton = React.forwardRef<
  HTMLButtonElement,
  { bookmarked?: boolean } & ButtonProps
>(({ className, variant, bookmarked, ...props }, ref) => {
  const t = useTranslations('OptionsMenu')

  return (
    <Button
      ref={ref}
      variant={variant || 'ghost'}
      className={cn('justify-start', className)}
      {...props}
    >
      {bookmarked ? (
        <>
          <BookmarkCheck className="mr-3 size-4 text-gray-700 dark:text-gray-300" />{' '}
          {t('bookmarked')}
        </>
      ) : (
        <>
          <Bookmark className="mr-3 size-4 text-gray-700 dark:text-gray-300" />{' '}
          {t('bookmark')}
        </>
      )}
    </Button>
  )
})
OptionMenuBookmarkButton.displayName = 'OptionMenuBookmarkButton'

export {
  OptionMenu,
  OptionMenuTrigger,
  OptionMenuContent,
  OptionMenuGroup,
  OptionMenuItem,
  OptionMenuClipButton,
  OptionMenuViewButton,
  OptionMenuEditButton,
  OptionMenuDeleteButton,
  OptionMenuPublishButton,
  OptionMenuBookmarkButton,
  OptionMenuHideButton,
}
