import { cn } from '@/lib/utils'
import { Check, ChevronDown, SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { CircleFlag } from 'react-circle-flags'

import { Button, ButtonProps } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { FilterLabelType, FilterType } from '../_type'

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

export function FilterPopover(props: {
  className?: string
  children?: React.ReactNode
  title: string
  filterType: FilterLabelType
  filters: FilterType[]
  onSearch?: (query: string) => void
  onSelect: (filter: FilterType) => void
}) {
  const t = useTranslations('SearchPage')

  const [filteredFilteres, setFilteredFilteres] = React.useState(props.filters)
  React.useEffect(() => {
    setFilteredFilteres(props.filters)
  }, [props.filters])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn('justify-between', props.className)}
          variant="secondary"
        >
          {props.children} <ChevronDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-w-72 px-0 py-1.5" align="start">
        <h4 className="border-b px-3 pb-3 pt-1 font-serif text-sm font-medium">
          {props.title}
        </h4>

        <div className="relative my-2 px-1.5">
          <SearchIcon className="absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-9 rounded-full pl-10"
            placeholder={t('search')}
            onChange={(event) => {
              const query = event.target.value
              const filtered = props.filters.filter((filter) =>
                filter.label.toLowerCase().includes(query.toLowerCase())
              )
              setFilteredFilteres(filtered)

              if (props.onSearch) {
                props.onSearch(query)
              }
            }}
          />
        </div>

        <div className="max-h-72 overflow-y-auto px-1.5">
          <FilterList>
            {filteredFilteres.map((filter, index) => (
              <FilterListItem
                key={`${filter.label}-${index}`}
                onClick={() => props.onSelect(filter)}
              >
                <FilterListItemLabel>
                  {props.filterType !== 'sources' && (
                    <FilterListItemIcon>
                      {props.filterType === 'categories' ? (
                        <filter.icon className="size-4 text-muted-foreground" />
                      ) : (
                        <CircleFlag
                          countryCode={filter.icon as string}
                          className="size-6"
                        />
                      )}
                    </FilterListItemIcon>
                  )}

                  {filter.label}
                </FilterListItemLabel>

                {filter.selected && (
                  <FilterListItemAction>
                    <Check className="text-muted-foreground" />
                    <span className="sr-only">{t('selected')}</span>
                  </FilterListItemAction>
                )}
              </FilterListItem>
            ))}
          </FilterList>
        </div>
      </PopoverContent>
    </Popover>
  )
}
