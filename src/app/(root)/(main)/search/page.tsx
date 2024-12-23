'use client'

import {
  useDefaultCategories,
  useDefaultCountries,
  useDefaultLanguages,
  useDefaultSources,
} from './_hooks'
import { FilterLabelType, FilterSourceType, FilterType } from './_type'
import {
  GetSourcesFormDataFields,
  getSourcesAction,
} from '@/app/actions/get-sources-action'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowDownWideNarrow,
  ArrowRight,
  BookOpenText,
  CalendarArrowDown,
  CalendarArrowUp,
  Check,
  ChevronDown,
  Earth,
  ExternalLink,
  Languages,
  LayoutList,
  SearchIcon,
  Sparkles,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import * as React from 'react'
import { CircleFlag } from 'react-circle-flags'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/hooks/use-toast'

import { AppHeader } from '../_components/app-header'
import {
  FilterList,
  FilterListItem,
  FilterListItemAction,
  FilterListItemIcon,
  FilterListItemLabel,
} from './_components/filter-list'
import { AccentButton } from '@/components/accent-button'
import { MultiInput } from '@/components/multi-input'
import { Button } from '@/components/ui/button'
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
import { Skeleton } from '@/components/ui/skeleton'

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

export function SourcePopover(props: {
  className?: string
  children?: React.ReactNode
  title: string
  filterType: FilterLabelType
  filters: FilterSourceType[]
  onSearch?: (query: string) => void
  onSelect: (
    fetchedSources: FilterSourceType[],
    selectedSource: FilterSourceType
  ) => void
}) {
  const t = useTranslations('SearchPage')
  const { toast } = useToast()

  const [sources, setSources] = React.useState<FilterSourceType[]>(
    props.filters
  )
  React.useEffect(() => {
    setSources(props.filters)
  }, [props.filters])

  const [pending, startTransition] = React.useTransition()
  const onSearch = (query: GetSourcesFormDataFields['query']) => {
    startTransition(async () => {
      try {
        if (query.length >= 3) {
          const fetchedSources = await getSourcesAction({ query })
          setSources([...fetchedSources, ...sources])
        }
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
            disabled={pending}
            onChange={(event) => {
              const query = event.target.value
              onSearch(query)
              if (props.onSearch) {
                props.onSearch(query)
              }
            }}
          />
        </div>

        <div className="max-h-72 overflow-y-auto px-1.5">
          <FilterList>
            {pending &&
              [1, 2, 3, 4, 5, 6, 7].map((n) => (
                <FilterListItem key={n}>
                  <FilterListItemLabel>
                    <FilterListItemIcon>
                      <Skeleton className="size-6 rounded-full" />
                    </FilterListItemIcon>
                    <Skeleton className="h-5 w-56 rounded-lg" />
                  </FilterListItemLabel>
                </FilterListItem>
              ))}

            {!pending && sources.length === 0 && (
              <FilterListItem>
                <FilterListItemLabel>
                  <span className="block max-w-[170px] truncate">
                    {t('noResults')}
                  </span>
                </FilterListItemLabel>
              </FilterListItem>
            )}

            {!pending &&
              sources.length > 0 &&
              sources.map((source, index) => (
                <FilterListItem
                  key={`${source.label}-${index}`}
                  onClick={() => props.onSelect(sources, source)}
                >
                  <FilterListItemLabel>
                    <FilterListItemIcon>
                      <CircleFlag
                        countryCode={source.country as string}
                        className="size-6"
                      />
                    </FilterListItemIcon>
                    <span className="block max-w-[170px] truncate">
                      {source.label}
                    </span>

                    <Link
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
          </FilterList>
        </div>
      </PopoverContent>
    </Popover>
  )
}

type SortByType = 'published_desc' | 'published_asc' | 'relevance'

function SortByDropdown(props: {
  value: SortByType
  onValueChange: (
    value: 'published_desc' | 'published_asc' | 'relevance'
  ) => void
}) {
  const t = useTranslations('SearchPage')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          {props.value === 'published_desc' ? (
            <CalendarArrowDown className="text-lime-500" />
          ) : props.value === 'published_asc' ? (
            <CalendarArrowUp className="text-lime-500" />
          ) : (
            <ArrowDownWideNarrow className="text-lime-500" />
          )}
          <ChevronDown className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t('sortOptions')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={props.value}
          onValueChange={(value) =>
            props.onValueChange(
              value as 'relevance' | 'published_desc' | 'published_asc'
            )
          }
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

export function SearchForm({
  className,
  ...props
}: React.ComponentPropsWithRef<'form'>) {
  const t = useTranslations('SearchPage')
  const { toast } = useToast()

  const newsFormSchema = useNewsFormSchema()
  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      keywords: [],
    },
  })

  const defaultCategories = useDefaultCategories()
  const defaultCountries = useDefaultCountries()
  const defaultSources = useDefaultSources()
  const defaultLanguages = useDefaultLanguages()

  const [categories, setCategories] =
    React.useState<FilterType[]>(defaultCategories)
  const [countries, setCountries] =
    React.useState<FilterType[]>(defaultCountries)
  const [sources, setSources] =
    React.useState<FilterSourceType[]>(defaultSources)
  const [languages, setLanguages] =
    React.useState<FilterType[]>(defaultLanguages)
  const [sortBy, setSortBy] = React.useState<SortByType>('relevance')

  const [pending, startTransition] = React.useTransition()
  const onSubmit = (data: NewsFormData) => {
    startTransition(async () => {
      try {
        console.log('onSubmit', data)
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

  const getFilterLabel = (
    defaultLabel: string,
    selectedFiltersLength: number
  ) => {
    return selectedFiltersLength > 0
      ? `${selectedFiltersLength} ${defaultLabel}`
      : defaultLabel
  }

  const updateFilter = <T extends FilterType | FilterSourceType>(
    filters: T[],
    selectedFilter: T
  ): T[] => {
    return filters.map((filter) => {
      const isMatch = filter.label === selectedFilter.label
      return {
        ...filter,
        selected: isMatch ? !selectedFilter.selected : filter.selected,
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-1 flex-col items-baseline gap-2', className)}
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="relative flex w-full flex-1 items-stretch gap-2">
          <FormField
            control={form.control}
            name="keywords"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1 px-1">
                <FormControl>
                  <div className="relative">
                    <SearchIcon className="absolute left-4 top-4 size-4 text-muted-foreground/50" />
                    <MultiInput
                      className="h-12 rounded-full pl-10"
                      placeholder={t('addKeywordsPlaceholder')}
                      aria-invalid={fieldState.error ? 'true' : 'false'}
                      selectedOptions={field.value}
                      disabled={pending}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="px-3" />
              </FormItem>
            )}
          />

          <Button
            className="absolute right-2 top-1"
            size="icon"
            disabled={
              form.formState.isSubmitting || !form.formState.isValid || pending
            }
          >
            <ArrowRight />
            <span className="sr-only">{t('search')}</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-2 px-2">
          <FilterPopover
            title={t('categories')}
            filterType="categories"
            filters={categories}
            onSelect={(selectedCategorie) => {
              setCategories((prev) => updateFilter(prev, selectedCategorie))
            }}
          >
            <LayoutList className="text-indigo-500" />{' '}
            {getFilterLabel(
              t('categories'),
              categories.filter((category) => category.selected).length
            )}
          </FilterPopover>

          <SourcePopover
            title={t('sources')}
            filterType="sources"
            filters={sources}
            onSelect={(fetchedSources, selectedSource) => {
              setSources(updateFilter(fetchedSources, selectedSource))
            }}
          >
            <BookOpenText className="text-blue-500" />{' '}
            {getFilterLabel(
              t('sources'),
              sources.filter((source) => source.selected).length
            )}
          </SourcePopover>

          <FilterPopover
            title={t('countries')}
            filterType="countries"
            filters={countries}
            onSelect={(selectedCountrie) => {
              setCountries((prev) => updateFilter(prev, selectedCountrie))
            }}
          >
            <Earth className="text-sky-500" />{' '}
            {getFilterLabel(
              t('countries'),
              countries.filter((country) => country.selected).length
            )}
          </FilterPopover>

          <FilterPopover
            title={t('languages')}
            filterType="languages"
            filters={languages}
            onSelect={(selectedLanguage) => {
              setLanguages((prev) => updateFilter(prev, selectedLanguage))
            }}
          >
            <Languages className="text-cyan-500" />{' '}
            {getFilterLabel(
              t('languages'),
              languages.filter((language) => language.selected).length
            )}
          </FilterPopover>

          <SortByDropdown value={sortBy} onValueChange={setSortBy} />
        </div>
      </form>
    </Form>
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
      <header className="mb-8 w-full max-w-3xl text-center">
        <h1 className="mb-2 text-2xl">{t('title')}</h1>

        <p className="text-sm text-muted-foreground">
          {t.rich('description', {
            advancedSearchOptions: t('advancedSearchOptions'),
            button: (chunks) => (
              <Button size="sm" variant="link" className="!h-auto !p-0">
                {chunks}
              </Button>
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

export default function SearchPage() {
  const t = useTranslations('Global')

  return (
    <>
      <AppHeader>
        <AccentButton href="/" icon={<Sparkles />}>
          {t('upgrade')}
        </AccentButton>
      </AppHeader>

      <SearchLayout>
        <div className="mb-0.5 w-full max-w-3xl transition-all duration-300">
          <SearchForm />
        </div>
      </SearchLayout>
    </>
  )
}
