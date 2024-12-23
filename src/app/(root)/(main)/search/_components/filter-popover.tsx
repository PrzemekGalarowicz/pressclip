'use client'

import {
  FilterList as FilterListComponent,
  FilterListItem,
  FilterListItemAction,
  FilterListItemIcon,
  FilterListItemLabel,
} from './filter-list'
import { getSourcesAction } from '@/app/actions/get-sources-action'
import { cn, removeDuplicatesByName } from '@/lib/utils'
import {
  FilterLabelType,
  FilterLanguageType,
  FilterSourceType,
  FilterType,
} from '@/type'
import {
  ArrowDownWideNarrow,
  CalendarArrowDown,
  CalendarArrowUp,
  Check,
  ChevronDown,
  ExternalLink,
  SearchIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import * as React from 'react'
import { CircleFlag } from 'react-circle-flags'
import { DateRange } from 'react-day-picker'

import { useDebounceValue } from '@/hooks/use-debounce-value'
import { useIsMobile } from '@/hooks/use-mobile'
import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Skeleton } from '@/components/ui/skeleton'

export type SortByType = 'published_desc' | 'published_asc' | 'relevance'

export function SortByDropdownTrigger(props: { value: SortByType }) {
  const t = useTranslations('SearchPage')

  return (
    <>
      {props.value === 'published_desc' ? (
        <>
          <CalendarArrowDown className="text-lime-500" /> {t('publishedDesc')}
        </>
      ) : props.value === 'published_asc' ? (
        <>
          <CalendarArrowUp className="text-lime-500" /> {t('publishedAsc')}
        </>
      ) : (
        <>
          <ArrowDownWideNarrow className="text-lime-500" /> {t('relevance')}
        </>
      )}
      <ChevronDown className="text-muted-foreground" />
    </>
  )
}

export function SortByDropdown(props: {
  value: SortByType
  onValueChange: (value: SortByType) => void
}) {
  const t = useTranslations('SearchPage')

  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary" type="button">
            <SortByDropdownTrigger value={props.value} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('sortOptions')}</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col p-4">
            <RadioGroup
              value={props.value}
              onValueChange={(value) =>
                props.onValueChange(value as SortByType)
              }
            >
              <div className="flex w-full items-center space-x-4 p-2">
                <RadioGroupItem value="relevance" id="relevance" />
                <Label htmlFor="relevance" className="w-full">
                  {t('relevance')}
                </Label>
              </div>
              <div className="flex w-full items-center space-x-4 p-2">
                <RadioGroupItem value="published_desc" id="published_desc" />
                <Label htmlFor="published_desc" className="w-full">
                  {t('publishedDesc')}
                </Label>
              </div>
              <div className="flex w-full items-center space-x-4 p-2">
                <RadioGroupItem value="published_asc" id="published_asc" />
                <Label htmlFor="published_asc" className="w-full">
                  {t('publishedAsc')}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" type="button">
          <SortByDropdownTrigger value={props.value} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t('sortOptions')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={props.value}
          onValueChange={(value) => props.onValueChange(value as SortByType)}
        >
          <DropdownMenuRadioItem value="relevance">
            {t('relevance')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="published_desc">
            {t('publishedDesc')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="published_asc">
            {t('publishedAsc')}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DateRangePopover(props: {
  className?: string
  children?: React.ReactNode
  selected: DateRange
  onSelect: (range: DateRange | undefined) => void
}) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={cn('justify-between', props.className)}
            variant="secondary"
          >
            {props.children}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col items-center p-4">
            <Calendar
              mode="range"
              selected={props.selected}
              onSelect={props.onSelect}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              initialFocus
            />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn('justify-between', props.className)}
          variant="secondary"
        >
          {props.children}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 py-1.5" align="start">
        <div className="px-1.5">
          <Calendar
            mode="range"
            selected={props.selected}
            onSelect={props.onSelect}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function FilterSearch<T extends FilterType | FilterLanguageType>(props: {
  className?: string
  children?: React.ReactNode
  filters: T[]
  onSearch: (query: string) => void
}) {
  const t = useTranslations('SearchPage')

  return (
    <header className={cn('relative my-2 px-1.5', props.className)}>
      <SearchIcon className="absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="h-9 rounded-full pl-10"
        placeholder={t('search')}
        onChange={(event) => {
          props.onSearch(event.target.value)
        }}
      />
    </header>
  )
}

export function FilterList<T extends FilterType | FilterLanguageType>(props: {
  filterType: FilterLabelType
  filters: T[]
  onSelect: (filter: T) => void
}) {
  const t = useTranslations('SearchPage')

  return (
    <FilterListComponent>
      {props.filters.map((filter, index) => (
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
    </FilterListComponent>
  )
}

export function FilterPopover<
  T extends FilterType | FilterLanguageType,
>(props: {
  className?: string
  children?: React.ReactNode
  title: string
  filterType: FilterLabelType
  filters: T[]
  onSelect: (filter: T) => void
}) {
  const isMobile = useIsMobile()

  const [filteredFilteres, setFilteredFilteres] = React.useState(props.filters)
  React.useEffect(() => {
    setFilteredFilteres(props.filters)
  }, [props.filters])

  const onSearch = (query: string) => {
    const filteredFilters = props.filters.filter((filter) =>
      filter.label.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredFilteres(filteredFilters)
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={cn('justify-between', props.className)}
            variant="secondary"
          >
            {props.children} <ChevronDown className="text-muted-foreground" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{props.title}</DrawerTitle>
            <FilterSearch filters={props.filters} onSearch={onSearch} />
          </DrawerHeader>

          <div className="h-72 overflow-y-auto px-2 pb-3">
            <FilterList
              filterType={props.filterType}
              filters={filteredFilteres}
              onSelect={props.onSelect}
            />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

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

        <FilterSearch filters={props.filters} onSearch={onSearch} />

        <div className="max-h-72 overflow-y-auto px-1.5">
          <FilterList
            filterType={props.filterType}
            filters={filteredFilteres}
            onSelect={props.onSelect}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function SourceFilterListSkeleton() {
  return (
    <FilterListComponent>
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <FilterListItem key={n}>
          <FilterListItemLabel>
            <FilterListItemIcon>
              <Skeleton className="size-6 rounded-full" />
            </FilterListItemIcon>
            <Skeleton className="h-5 w-56 rounded-lg" />
          </FilterListItemLabel>
        </FilterListItem>
      ))}
    </FilterListComponent>
  )
}

export function SourceFilterListNoResults() {
  const t = useTranslations('SearchPage')

  return (
    <FilterListComponent>
      <FilterListItem>
        <FilterListItemLabel>
          <span className="block max-w-[170px] truncate text-muted-foreground">
            {t('noResults')}
          </span>
        </FilterListItemLabel>
      </FilterListItem>
    </FilterListComponent>
  )
}

export function SourceFilterList(props: {
  sources: FilterSourceType[]
  onSelect: (filter: FilterSourceType) => void
}) {
  const t = useTranslations('SearchPage')

  return (
    <FilterListComponent>
      {props.sources.map((source, index) => (
        <FilterListItem
          key={`${source.label}-${index}`}
          onClick={() => props.onSelect(source)}
        >
          <FilterListItemLabel>
            <FilterListItemIcon>
              <CircleFlag
                countryCode={source.country as string}
                className="size-6"
              />
            </FilterListItemIcon>
            <span className="block max-w-[170px] truncate">{source.label}</span>

            <Link href={source.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-3 text-muted-foreground" />
            </Link>
          </FilterListItemLabel>

          {source.selected && (
            <FilterListItemAction>
              <Check className="text-muted-foreground" />
              <span className="sr-only">{t('selected')}</span>
            </FilterListItemAction>
          )}
        </FilterListItem>
      ))}
    </FilterListComponent>
  )
}

export function SourcePopover(props: {
  className?: string
  children?: React.ReactNode
  countries?: string
  title: string
  filterType: FilterLabelType
  filters: FilterSourceType[]
  onSelect: (
    fetchedSources: FilterSourceType[],
    selectedSource: FilterSourceType
  ) => void
}) {
  const t = useTranslations('SearchPage')

  const { toast } = useToast()

  const isMobile = useIsMobile()

  const [debouncedQuery, setQuery] = useDebounceValue('', 500)

  const [pending, startTransition] = React.useTransition()

  const [sources, setSources] = React.useState<FilterSourceType[]>(
    props.filters
  )
  React.useEffect(() => {
    setSources(props.filters)
  }, [props.filters])

  React.useEffect(() => {
    if (debouncedQuery.length >= 3) {
      startTransition(async () => {
        try {
          const fetchedSources = await getSourcesAction({
            query: debouncedQuery,
            countries: props.countries || '',
          })
          setSources((prev) =>
            removeDuplicatesByName([...fetchedSources, ...prev])
          )
        } catch (error) {
          toast({
            variant: 'destructive',
            description: t('error'),
          })
          if (process.env.NODE_ENV === 'development') {
            console.error(error)
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, startTransition, t, toast])

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={cn('justify-between', props.className)}
            variant="secondary"
          >
            {props.children} <ChevronDown className="text-muted-foreground" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{props.title}</DrawerTitle>
            <FilterSearch filters={sources} onSearch={setQuery} />
          </DrawerHeader>

          <div className="h-72 overflow-y-auto px-2 pb-3">
            {pending && <SourceFilterListSkeleton />}
            {!pending && sources.length === 0 && <SourceFilterListNoResults />}
            {!pending && sources.length > 0 && (
              <SourceFilterList
                sources={sources}
                onSelect={(selectedSource) =>
                  props.onSelect(sources, selectedSource)
                }
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

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

        <FilterSearch filters={sources} onSearch={setQuery} />

        <div className="max-h-72 overflow-y-auto px-1.5">
          {pending && <SourceFilterListSkeleton />}

          {!pending && sources.length === 0 && <SourceFilterListNoResults />}

          {!pending && sources.length > 0 && (
            <SourceFilterList
              sources={sources}
              onSelect={(selectedSource) =>
                props.onSelect(sources, selectedSource)
              }
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
