'use client'

import {
  useDefaultCategories,
  useDefaultCountries,
  useDefaultLanguages,
  useDefaultSources,
} from './_hooks'
import { FilterLabelType, FilterRecordType, FilterType } from './_type'
import {
  isDisabled,
  onClearAction,
  onExclude,
  onInclude,
  updateFilters,
} from './_utils'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CalendarCog,
  ClipboardList,
  Earth,
  Globe,
  Languages,
  ListPlus,
  Minus,
  MonitorSmartphone,
  Newspaper,
  Plus,
  Search as SearchIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import * as React from 'react'
import { CircleFlag } from 'react-circle-flags'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useEscapeButton } from '@/hooks/use-escape-button'
import { useIsClient } from '@/hooks/use-is-client'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

import {
  FilterList,
  FilterListItem,
  FilterListItemAction,
  FilterListItemActionButton,
  FilterListItemIcon,
  FilterListItemLabel,
} from './_components/filter-list'
import { FilterNav, FilterNavItem } from './_components/filter-nav'
import { BadgeList, BadgeListItem } from '@/components/badge-list'
import { MultiInput } from '@/components/multi-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function SearchLayout({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const t = useTranslations('SearchPage')

  const defaultCategories: FilterType[] = useDefaultCategories()
  const defaultSources: FilterType[] = useDefaultSources()
  const defaultCountries: FilterType[] = useDefaultCountries()
  const defaultLanguages: FilterType[] = useDefaultLanguages()

  const filters = {
    categories: defaultCategories,
    sources: defaultSources,
    countries: defaultCountries,
    languages: defaultLanguages,
  }

  return (
    <div
      className={cn(
        'flex h-screen flex-col items-center justify-center',
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

      <Tabs defaultValue="news">
        <TabsList>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="social_media">Social Media</TabsTrigger>
          <TabsTrigger value="internet">Internet</TabsTrigger>
        </TabsList>
        <TabsContent value="news">
          <SearchFormLayout>
            <SearchNewsForm />

            <div className="mb-2 flex gap-2">
              <FilterCard
                header={
                  <>
                    <ClipboardList className="text-blue-600" />
                    {t('categories')}
                  </>
                }
                filterType="categories"
                filters={filters.categories}
                onSearch={() => {}}
                onRemove={() => {}}
                onExclude={() => {}}
                onInclude={() => {}}
              />

              <FilterCard
                header={
                  <>
                    <Newspaper className="text-cyan-600" />
                    {t('sources')}
                  </>
                }
                filterType="sources"
                filters={filters.sources}
                onSearch={() => {}}
                onRemove={() => {}}
                onExclude={() => {}}
                onInclude={() => {}}
              />

              <FilterCard
                header={
                  <>
                    <Earth className="text-sky-600" />
                    {t('countries')}
                  </>
                }
                filterType="countries"
                filters={filters.countries}
                onSearch={() => {}}
                onRemove={() => {}}
                onExclude={() => {}}
                onInclude={() => {}}
              />

              <FilterCard
                header={
                  <>
                    <Languages className="text-lime-600" />
                    {t('languages')}
                  </>
                }
                filterType="languages"
                filters={filters.languages}
                onSearch={() => {}}
                onRemove={() => {}}
                onExclude={() => {}}
                onInclude={() => {}}
              />
            </div>
          </SearchFormLayout>
        </TabsContent>
        <TabsContent value="social_media">
          <SearchFormLayout>
            <SearchSocialMediaForm />
          </SearchFormLayout>
        </TabsContent>
        <TabsContent value="internet">
          <SearchFormLayout>
            <SearchInternetForm />
          </SearchFormLayout>
        </TabsContent>
      </Tabs>

      {/* {children} */}
    </div>
  )
}

export function SearchFormLayout({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const t = useTranslations('SearchPage')

  const [activeForm, setActiveForm] = React.useState<
    'news' | 'social_media' | 'internet'
  >('news')

  return (
    <div
      className={cn('flex flex-col gap-2 rounded-3xl bg-muted p-2', className)}
      {...props}
    >
      {activeForm === 'news' && <SearchNewsForm />}
      {activeForm === 'social_media' && <SearchSocialMediaForm />}
      {activeForm === 'internet' && <SearchInternetForm />}

      <nav className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveForm('news')}
              >
                <Newspaper
                  strokeWidth={2}
                  className={cn(
                    activeForm !== 'news' && 'text-muted-foreground'
                  )}
                />
                <span className="sr-only">
                  {t('searchInNewspapersMagazinesAndBlogs')}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {t('searchInNewspapersMagazinesAndBlogs')}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveForm('social_media')}
              >
                <MonitorSmartphone
                  strokeWidth={2}
                  className={cn(
                    activeForm !== 'social_media' && 'text-muted-foreground'
                  )}
                />
                <span className="sr-only">{t('searchInSocialMedia')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('searchInSocialMedia')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveForm('internet')}
              >
                <Globe
                  strokeWidth={2}
                  className={cn(
                    activeForm !== 'internet' && 'text-muted-foreground'
                  )}
                />
                <span className="sr-only">{t('searchInTheInternet')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('searchInTheInternet')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </div>
  )
}

export function SearchFormTriggers({ submitting }: { submitting: boolean }) {
  const t = useTranslations('SearchPage')
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="secondary" size="icon">
              <ListPlus strokeWidth={2} />
              <span className="sr-only">{t('addATask')}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('addATask')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="secondary" size="icon">
              <CalendarCog strokeWidth={2} />
              <span className="sr-only">{t('addAndScheduleATask')}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('addAndScheduleATask')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              size="icon"
              disabled={submitting}
              className="shadow-md"
            >
              <SearchIcon strokeWidth={3} />
              <span className="sr-only">{t('search')}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('search')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
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

  const [submitting, startTransition] = useTransition()

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
                    'rounded-xl border-transparent bg-transparent placeholder:text-base placeholder:text-muted-foreground/75',
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

        <SearchFormTriggers submitting={submitting} />
      </form>
    </Form>
  )
}

function useSocialMediaFormSchema() {
  const t = useTranslations('SearchPage')

  const schema = React.useMemo(() => {
    return z.object({
      query: z.string().min(1, { message: t('atLeastOneCharacterIsRequired') }),
    })
  }, [t])

  return schema
}
type SocialMediaFormData = z.infer<ReturnType<typeof useSocialMediaFormSchema>>

export function SearchSocialMediaForm({
  className,
  ...props
}: React.ComponentPropsWithRef<'form'>) {
  const t = useTranslations('SearchPage')

  const [submitting, startTransition] = useTransition()

  const socialMediaFormSchema = useSocialMediaFormSchema()
  const form = useForm<SocialMediaFormData>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      query: '',
    },
  })

  const onSubmit = (data: SocialMediaFormData) => {
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
          name="query"
          render={({ field, fieldState }) => (
            <FormItem className="flex-1 px-1">
              <FormControl>
                <Input
                  className={cn(
                    'rounded-xl border-transparent bg-transparent placeholder:text-base placeholder:text-muted-foreground/75',
                    fieldState.error && 'border-destructive'
                  )}
                  placeholder={t('searchInSocialMediaPlaceholder')}
                  aria-invalid={fieldState.error ? 'true' : 'false'}
                  {...field}
                />
              </FormControl>
              <FormMessage className="px-3" />
            </FormItem>
          )}
        />

        <SearchFormTriggers submitting={submitting} />
      </form>
    </Form>
  )
}

function useInternetFormSchema() {
  const t = useTranslations('SearchPage')

  const schema = React.useMemo(() => {
    return z.object({
      query: z.string().min(1, { message: t('atLeastOneCharacterIsRequired') }),
    })
  }, [t])

  return schema
}
type InternetFormData = z.infer<ReturnType<typeof useInternetFormSchema>>

export function SearchInternetForm({
  className,
  ...props
}: React.ComponentPropsWithRef<'form'>) {
  const t = useTranslations('SearchPage')

  const [submitting, startTransition] = useTransition()

  const internetFormSchema = useInternetFormSchema()
  const form = useForm<InternetFormData>({
    resolver: zodResolver(internetFormSchema),
    defaultValues: {
      query: '',
    },
  })

  const onSubmit = (data: InternetFormData) => {
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
          name="query"
          render={({ field, fieldState }) => (
            <FormItem className="flex-1 px-1">
              <FormControl>
                <Input
                  className={cn(
                    'rounded-xl border-transparent bg-transparent placeholder:text-base placeholder:text-muted-foreground/75',
                    fieldState.error && 'border-destructive'
                  )}
                  placeholder={t('searchInTheInternetPlaceholder')}
                  aria-invalid={fieldState.error ? 'true' : 'false'}
                  {...field}
                />
              </FormControl>
              <FormMessage className="px-3" />
            </FormItem>
          )}
        />

        <SearchFormTriggers submitting={submitting} />
      </form>
    </Form>
  )
}

export function FilterCard({
  className,
  header,
  filterType,
  filters,
  onSearch,
  onRemove,
  onExclude,
  onInclude,
  ...props
}: React.ComponentPropsWithRef<'div'> & {
  header: React.ReactNode
  filterType: FilterLabelType
  filters: FilterType[]
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: (filter: FilterType) => void
  onExclude: (filter: FilterType) => void
  onInclude: (filter: FilterType) => void
}) {
  const t = useTranslations('SearchPage')

  return (
    <div
      className={cn(
        'mt-2 w-full max-w-lg rounded-2xl border bg-background p-4',
        className
      )}
      {...props}
    >
      <header className="mb-3 flex items-center gap-4">{header}</header>

      <div className="relative mb-1">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="rounded-2xl border-none bg-muted pl-10"
          placeholder={t('search')}
          onChange={onSearch}
        />
      </div>

      <BadgeList>
        {filters.map((filter) =>
          filter.include || filter.exclude ? (
            <BadgeListItem
              key={filter.label}
              include={filter.include}
              exclude={filter.exclude}
              onRemove={() => onRemove(filter)}
            >
              {filter.label}
            </BadgeListItem>
          ) : null
        )}
      </BadgeList>

      <div className="max-h-[260px] overflow-y-auto">
        <FilterList>
          {filters.map((filter, index) => (
            <React.Fragment key={filter.label}>
              <FilterListItem>
                <FilterListItemLabel>
                  {filterType !== 'sources' && (
                    <FilterListItemIcon>
                      {filterType === 'categories' ? (
                        <filter.icon className="size-4 text-muted-foreground" />
                      ) : (
                        <CircleFlag countryCode={filter.icon as string} />
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

              {index < filters.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </FilterList>
      </div>
    </div>
  )
}

export default function SearchPage() {
  const t = useTranslations('SearchPage')

  const isClient = useIsClient()

  const defaultCategories: FilterType[] = useDefaultCategories()
  const defaultSources: FilterType[] = useDefaultSources()
  const defaultCountries: FilterType[] = useDefaultCountries()
  const defaultLanguages: FilterType[] = useDefaultLanguages()
  const DEFAULT_FILTERS: FilterRecordType = {
    categories: defaultCategories,
    sources: defaultSources,
    countries: defaultCountries,
    languages: defaultLanguages,
  }

  const [filters, setFilters] = React.useState<FilterRecordType>(() => {
    if (!isClient) return DEFAULT_FILTERS
    const data = localStorage.getItem('PRESSCLIP_FILTERS')
    return data ? JSON.parse(data) : DEFAULT_FILTERS
  })
  const [filteredFilters, setFilteredFilters] =
    React.useState<FilterRecordType>(() => {
      if (!isClient) return DEFAULT_FILTERS
      const data = localStorage.getItem('PRESSCLIP_FILTERED_FILTERS')
      return data ? JSON.parse(data) : DEFAULT_FILTERS
    })

  const [activeFilter, setActiveFilter] = React.useState<
    FilterLabelType | undefined
  >(() => {
    if (!isClient) return undefined
    const data = localStorage.getItem('PRESSCLIP_ACTIVE_FILTER')
    return data ? JSON.parse(data) : undefined
  })

  const onSetFilters = (filterName: FilterLabelType) => {
    setFilters((prev) => updateFilters(prev, filterName))
    localStorage.setItem('PRESSCLIP_FILTERS', JSON.stringify(filters))

    setFilteredFilters((prev) => updateFilters(prev, filterName))
    localStorage.setItem(
      'PRESSCLIP_FILTERED_FILTERS',
      JSON.stringify(filteredFilters)
    )

    setActiveFilter(filterName)
    localStorage.setItem('PRESSCLIP_ACTIVE_FILTER', JSON.stringify(filterName))
  }

  return (
    <SearchLayout>
      {/* <div className="mb-0.5 w-full max-w-2xl transition-all duration-300">
        <SearchFormLayout />
      </div> */}

      {/* <FilterNav>
        <FilterNavItem
          active={activeFilter === 'categories'}
          onClick={() => onSetFilters('categories')}
        >
          <ClipboardList className="text-blue-600" />
          {t('categories')}
        </FilterNavItem>
        <FilterNavItem
          active={activeFilter === 'sources'}
          onClick={() => onSetFilters('sources')}
        >
          <Newspaper className="text-cyan-600" />
          {t('sources')}
        </FilterNavItem>
        <FilterNavItem
          active={activeFilter === 'countries'}
          onClick={() => onSetFilters('countries')}
        >
          <Earth className="text-sky-600" />
          {t('countries')}
        </FilterNavItem>
        <FilterNavItem
          active={activeFilter === 'languages'}
          onClick={() => onSetFilters('languages')}
        >
          <Languages className="text-lime-600" />
          {t('languages')}
        </FilterNavItem>
      </FilterNav> */}

      {/* <div className="mb-2 flex gap-2">
        <FilterCard
          header={
            <>
              <ClipboardList className="text-blue-600" />
              {t('categories')}
            </>
          }
          filterType="categories"
          filters={filters.categories}
          onSearch={() => {}}
          onRemove={() => {}}
          onExclude={() => {}}
          onInclude={() => {}}
        />

        <FilterCard
          header={
            <>
              <Newspaper className="text-cyan-600" />
              {t('sources')}
            </>
          }
          filterType="sources"
          filters={filters.sources}
          onSearch={() => {}}
          onRemove={() => {}}
          onExclude={() => {}}
          onInclude={() => {}}
        />

        <FilterCard
          header={
            <>
              <Earth className="text-sky-600" />
              {t('countries')}
            </>
          }
          filterType="countries"
          filters={filters.countries}
          onSearch={() => {}}
          onRemove={() => {}}
          onExclude={() => {}}
          onInclude={() => {}}
        />

        <FilterCard
          header={
            <>
              <Languages className="text-lime-600" />
              {t('languages')}
            </>
          }
          filterType="languages"
          filters={filters.languages}
          onSearch={() => {}}
          onRemove={() => {}}
          onExclude={() => {}}
          onInclude={() => {}}
        />
      </div> */}
    </SearchLayout>
  )
}
