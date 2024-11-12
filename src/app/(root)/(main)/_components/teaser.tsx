import { cn } from '@/lib/utils'
import Image from 'next/image'
import * as React from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

const Teaser = React.forwardRef<
  HTMLDivElement,
  { sponsored?: boolean } & React.HTMLAttributes<HTMLDivElement>
>(({ className, sponsored, ...props }, ref) => (
  <article
    ref={ref}
    className={cn('group/teaser relative cursor-pointer', className, {
      'border-l-8 border-gray-100 pl-4 dark:border-gray-500': sponsored,
    })}
    {...props}
  />
))
Teaser.displayName = 'Teaser'

const TeaserHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative col-span-9 flex h-full flex-col justify-center gap-2',
      className
    )}
    {...props}
  />
))
TeaserHeader.displayName = 'TeaserHeader'

const TeaserTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'line-clamp-2 text-base transition-all duration-300 group-hover/teaser:underline group-hover/teaser:underline-offset-4 2xl:text-lg',
      className
    )}
    {...props}
  />
))
TeaserTitle.displayName = 'TeaserTitle'

const TeaserDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('line-clamp-2 text-sm text-muted-foreground', className)}
    {...props}
  />
))
TeaserDescription.displayName = 'TeaserDescription'

const TeaserList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      'flex list-inside flex-row flex-wrap items-center gap-1',
      className
    )}
    {...props}
  />
))
TeaserList.displayName = 'TeaserList'

const TeaserListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      'text-xs font-medium text-muted-foreground after:ml-2 after:rounded-full after:text-gray-300 after:content-["•"] last:after:content-none',
      className
      // { 'text-orange-400 dark:text-orange-400': sponsored },
      // { 'text-red-400 dark:text-red-400': recent }
    )}
    {...props}
  />
))
TeaserListItem.displayName = 'TeaserListItem'

const TeaserContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('grid grid-cols-12 gap-4', className)}
    {...props}
  />
))
TeaserContent.displayName = 'TeaserContent'

const TeaserImage = React.forwardRef<
  HTMLDivElement,
  {
    src: string
    alt: string
    priority?: boolean
    ratio?: number | undefined
  } & React.HTMLAttributes<HTMLDivElement>
>(({ className, src, alt, priority, ratio, ...props }, ref) => {
  const img = (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      sizes="(max-width: 768px) 50vw, 33vw"
      fill
      className="h-full w-full rounded-lg object-cover"
    />
  )

  return (
    <div
      ref={ref}
      className={cn('relative col-span-3 rounded-lg bg-muted', className)}
      {...props}
    >
      {ratio ? <AspectRatio ratio={ratio}>{img}</AspectRatio> : img}
    </div>
  )
})
TeaserImage.displayName = 'TeaserImage'

const TeaserPulse = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('absolute right-2 top-2 flex h-3 w-3', className)}
    {...props}
  >
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-700 opacity-90"></span>
    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-400"></span>
  </span>
))
TeaserPulse.displayName = 'TeaserPulse'

export {
  Teaser,
  TeaserHeader,
  TeaserImage,
  TeaserTitle,
  TeaserDescription,
  TeaserContent,
  TeaserList,
  TeaserListItem,
  TeaserPulse,
}
