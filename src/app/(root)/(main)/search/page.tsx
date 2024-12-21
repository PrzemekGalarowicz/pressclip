'use client'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, Minus, Plus, SearchIcon, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { CircleFlag } from 'react-circle-flags'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AppHeader } from '../_components/app-header'
import {
  FilterList,
  FilterListItem,
  FilterListItemAction,
  FilterListItemActionButton,
  FilterListItemIcon,
  FilterListItemLabel,
} from '../_search/_components/filter-list'
import { AccentButton } from '@/components/accent-button'
import { BadgeList, BadgeListItem } from '@/components/badge-list'
import { MultiInput } from '@/components/multi-input'
import { MultiSelect } from '@/components/multi-select'
import { Button, ButtonProps } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import {
  useDefaultCategories,
  useDefaultCountries,
  useDefaultLanguages,
  useDefaultSources,
} from '../_search/_hooks'
import { FilterLabelType, FilterRecordType, FilterType } from '../_search/_type'
import { isDisabled } from '../_search/_utils'

export function FilterPopover({
  children,
  title,
  filterType,
  filters,
  onSearch,
  onRemove,
  onExclude,
  onInclude,
  ...props
}: ButtonProps & {
  title: string
  filterType: FilterLabelType
  filters: FilterType[]
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: (filter: FilterType) => void
  onExclude: (filter: FilterType) => void
  onInclude: (filter: FilterType) => void
}) {
  const t = useTranslations('SearchPage')

  const [filteredFilters, setFilteredFilters] = React.useState(filters)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...props}>
          {children} <ChevronDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-1.5">
        <h4 className="mx-2 mb-1.5 text-sm font-medium">{title}</h4>

        <div className="relative mb-1">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-9 pl-10"
            placeholder={t('search')}
            onChange={(event) => {
              const value = event.target.value

              if (value.length === 0) {
                setFilteredFilters(filters)
              } else {
                setFilteredFilters(
                  filters.filter((filter) =>
                    filter.label.toLowerCase().includes(value.toLowerCase())
                  )
                )
              }

              if (onSearch) {
                onSearch(event)
              }
            }}
          />
        </div>

        <BadgeList>
          {filters
            .sort((a, b) => a.label.length - b.label.length)
            .filter((filter) => filter.include || filter.exclude)
            .map((filter) => (
              <BadgeListItem
                key={filter.label}
                include={filter.include}
                exclude={filter.exclude}
                onRemove={() => onRemove(filter)}
              >
                {filter.label}
              </BadgeListItem>
            ))}
        </BadgeList>

        <div className="max-h-72 overflow-y-auto">
          <FilterList>
            {filteredFilters.map((filter) => (
              <React.Fragment key={filter.label}>
                <FilterListItem>
                  <FilterListItemLabel>
                    {filterType !== 'sources' && (
                      <FilterListItemIcon>
                        {filterType === 'categories' ? (
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

                  <FilterListItemAction>
                    <FilterListItemActionButton
                      tooltip={t('exclude')}
                      disabled={isDisabled(filter, 'exclude')}
                      onClick={() => onExclude(filter)}
                    >
                      <>
                        <Minus className="text-red-500" />
                        <span className="sr-only">{t('exclude')}</span>
                      </>
                    </FilterListItemActionButton>
                    <FilterListItemActionButton
                      tooltip={t('include')}
                      disabled={isDisabled(filter, 'include')}
                      onClick={() => onInclude(filter)}
                    >
                      <>
                        <Plus className="text-green-500" />
                        <span className="sr-only">{t('include')}</span>
                      </>
                    </FilterListItemActionButton>
                  </FilterListItemAction>
                </FilterListItem>
              </React.Fragment>
            ))}
          </FilterList>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function SearchLayout({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const t = useTranslations('SearchPage')
  return (
    <div
      className={cn(
        'flex h-[calc(100vh-14rem)] flex-col items-center justify-center',
        className
      )}
      {...props}
    >
      <header className="mb-8 flex flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-2xl">{t('title')}</h1>

        <p className="text-sm text-muted-foreground">
          {t.rich('description', {
            advancedSearchOptions: t('advancedSearchOptions'),
            button: (chunks) => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="link" className="!h-auto !p-0">
                      {chunks}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t('advancedSearchOptionsTooltip')}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ),
          })}
          <br />
          {t('description2')}
        </p>
      </header>

      {children}
    </div>
  )
}

export function SearchFormLayout({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const t = useTranslations('SearchPage')

  const [sortBy, setSortBy] = React.useState<
    'published_desc' | 'published_asc' | 'relevance'
  >('published_desc')

  const categories: FilterType[] = useDefaultCategories()
  const sources: FilterType[] = useDefaultSources()
  const countries: FilterType[] = useDefaultCountries()
  const languages: FilterType[] = useDefaultLanguages()

  const [filters, setFilters] = React.useState<FilterRecordType>({
    categories,
    countries,
    sources,
    languages,
  })

  const updateFilters = (
    filter: FilterType,
    filterName: FilterLabelType,
    includeVal: boolean | null,
    excludeVal: boolean | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: prev[filterName].map((f) => {
        const isMatch = f.label === filter.label
        return {
          ...f,
          include: isMatch ? includeVal : f.include,
          exclude: isMatch ? excludeVal : f.exclude,
        }
      }),
    }))
  }

  const onInclude = (filter: FilterType, filterName: FilterLabelType) => {
    updateFilters(filter, filterName, true, false)
  }

  const onExclude = (filter: FilterType, filterName: FilterLabelType) => {
    updateFilters(filter, filterName, false, true)
  }

  const onRemove = (filter: FilterType, filterName: FilterLabelType) => {
    updateFilters(filter, filterName, null, null)
  }

  return (
    <div
      className={cn('flex flex-col gap-2 rounded-3xl bg-muted', className)}
      {...props}
    >
      <SearchNewsForm className="px-2 pt-2" />

      <Separator className="dark:bg-primary/10" />

      <div className="flex items-center justify-around gap-1">
        <FilterPopover
          className="text-muted-foreground"
          size="sm"
          variant="ghost"
          title={t('categories')}
          filterType="categories"
          filters={filters.categories}
          onRemove={(filter) => onRemove(filter, 'categories')}
          onExclude={(filter) => onExclude(filter, 'categories')}
          onInclude={(filter) => onInclude(filter, 'categories')}
        >
          {filters.categories.filter(
            (filter) => filter.include || filter.exclude
          ).length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {filters.categories
                .filter((filter) => filter.include || filter.exclude)
                .map((filter) => (
                  <span
                    key={filter.label}
                    className="block w-fit truncate text-muted-foreground"
                  >
                    {filter.label}
                  </span>
                ))}
            </div>
          ) : (
            <span className="text-muted-foreground">Categories</span>
          )}
        </FilterPopover>

        <Separator orientation="vertical" className="h-8 dark:bg-primary/10" />

        <FilterPopover
          className="text-muted-foreground"
          size="sm"
          variant="ghost"
          title={t('sources')}
          filterType="sources"
          filters={filters.sources}
          onRemove={(filter) => onRemove(filter, 'sources')}
          onExclude={(filter) => onExclude(filter, 'sources')}
          onInclude={(filter) => onInclude(filter, 'sources')}
        >
          Sources
        </FilterPopover>

        <Separator orientation="vertical" className="h-8 dark:bg-primary/10" />

        <FilterPopover
          className="text-muted-foreground"
          size="sm"
          variant="ghost"
          title={t('countries')}
          filterType="countries"
          filters={filters.countries}
          onRemove={(filter) => onRemove(filter, 'countries')}
          onExclude={(filter) => onExclude(filter, 'countries')}
          onInclude={(filter) => onInclude(filter, 'countries')}
        >
          Countries
        </FilterPopover>

        <Separator orientation="vertical" className="h-8 dark:bg-primary/10" />

        <FilterPopover
          className="text-muted-foreground"
          size="sm"
          variant="ghost"
          title={t('languages')}
          filterType="languages"
          filters={filters.languages}
          onRemove={(filter) => onRemove(filter, 'languages')}
          onExclude={(filter) => onExclude(filter, 'languages')}
          onInclude={(filter) => onInclude(filter, 'languages')}
        >
          Languages
        </FilterPopover>

        <Separator orientation="vertical" className="h-8 dark:bg-primary/10" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="text-muted-foreground">
              Sort by <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortBy}
              onValueChange={(value) =>
                setSortBy(
                  value as 'relevance' | 'published_desc' | 'published_asc'
                )
              }
            >
              <DropdownMenuRadioItem value="relevance">
                Relevance
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="published_desc">
                Published (desc)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="published_asc">
                Published (asc)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="dark:bg-primary/10" />

      <div className="mx-2 mb-2 flex justify-end">
        <Button className="rounded-full">
          <SearchIcon /> Search
        </Button>
      </div>
    </div>
  )
}

function useNewsFormSchema() {
  const t = useTranslations('SearchPage')

  const schema = React.useMemo(() => {
    return z.object({
      keywords: z
        .array(z.string().min(1, { message: t('atLeastOneKeywordIsRequired') }))
        .min(1, { message: t('atLeastOneKeywordIsRequired') }),
    })
  }, [t])

  return schema
}
type NewsFormData = z.infer<ReturnType<typeof useNewsFormSchema>>

export function SearchNewsForm({
  className,
  ...props
}: React.ComponentPropsWithRef<'form'>) {
  const t = useTranslations('SearchPage')

  const [_, startTransition] = React.useTransition()

  const newsFormSchema = useNewsFormSchema()
  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      keywords: [],
    },
  })

  const onSubmit = (data: NewsFormData) => {
    startTransition(async () => {
      console.log('onSubmit', data)
      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-1 items-baseline gap-2', className)}
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="keywords"
          render={({ field, fieldState }) => (
            <FormItem className="flex-1 px-1">
              <FormControl>
                <MultiInput
                  className={cn(
                    'rounded-lg border-transparent bg-transparent placeholder:text-base placeholder:text-muted-foreground/75',
                    fieldState.error && 'border-destructive'
                  )}
                  type="search"
                  placeholder={t('addKeywordsPlaceholder')}
                  aria-invalid={fieldState.error ? 'true' : 'false'}
                  selectedOptions={field.value}
                  onCheckedChange={field.onChange}
                  {...field}
                />
              </FormControl>
              <FormMessage className="px-3" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default function SearchPage() {
  const g = useTranslations('Global')

  const sources = useDefaultSources()
  const [selectedSources, setSelectedSources] = React.useState<string[]>([])

  return (
    <>
      <AppHeader>
        <AccentButton href="/" icon={<Sparkles />}>
          {g('upgrade')}
        </AccentButton>
      </AppHeader>

      <SearchLayout>
        <div className="mb-0.5 w-full max-w-2xl transition-all duration-300">
          <SearchFormLayout />
          <MultiSelect
            placeholder="Select categories"
            options={sources}
            selectedOptions={selectedSources}
            onCheckedChange={setSelectedSources}
          />
        </div>
      </SearchLayout>
    </>
  )
}
