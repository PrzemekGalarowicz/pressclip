'use client'

import {
  useDefaultCategories,
  useDefaultCountries,
  useDefaultLanguages,
  useDefaultSources,
} from './_hooks'
import { FilterLabelType, FilterRecordType, FilterType } from './_type'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowDownWideNarrow,
  ArrowRight,
  BookOpenText,
  CalendarArrowDown,
  CalendarArrowUp,
  ChevronDown,
  Earth,
  Languages,
  LayoutList,
  SearchIcon,
  Sparkles,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AppHeader } from '../_components/app-header'
import { FilterPopover } from './_components/filter-list'
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

export function SearchNewsForm({
  className,
  ...props
}: React.ComponentPropsWithRef<'form'>) {
  const t = useTranslations('SearchPage')

  const newsFormSchema = useNewsFormSchema()
  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      keywords: [],
    },
  })

  const categories = useDefaultCategories()
  const countries = useDefaultCountries()
  const sources = useDefaultSources()
  const languages = useDefaultLanguages()

  const defaultFilters = {
    categories,
    countries,
    sources,
    languages,
  }

  const [filters, setFilters] = React.useState<FilterRecordType>(defaultFilters)
  const [sortBy, setSortBy] = React.useState<SortByType>('published_desc')

  const [_, startTransition] = React.useTransition()

  const getFilterLabel = (
    defaultLabel: string,
    selectedFiltersLength: number
  ) => {
    if (selectedFiltersLength > 0) {
      return `${selectedFiltersLength} ${defaultLabel}`
    }
    return defaultLabel
  }

  const getSelectedFilters = (filterName: FilterLabelType) => {
    return filters[filterName].filter((filter) => filter.selected)
  }

  const selectFilter = (filter: FilterType, filterName: FilterLabelType) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: prev[filterName].map((f) => {
        const isMatch = f.label === filter.label
        return {
          ...f,
          selected: isMatch ? !filter.selected : f.selected,
        }
      }),
    }))
  }

  const onSubmit = (data: NewsFormData) => {
    startTransition(async () => {
      console.log('onSubmit', data)
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
                      onCheckedChange={field.onChange}
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
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            <ArrowRight />
            <span className="sr-only">{t('search')}</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-2 px-2">
          <FilterPopover
            title={t('categories')}
            filterType="categories"
            filters={filters.categories}
            onSelect={(filter) => selectFilter(filter, 'categories')}
          >
            <LayoutList className="text-indigo-500" />{' '}
            {getFilterLabel(
              t('categories'),
              getSelectedFilters('categories').length
            )}
          </FilterPopover>

          <FilterPopover
            title={t('sources')}
            filterType="sources"
            filters={filters.sources}
            onSelect={(filter) => selectFilter(filter, 'sources')}
          >
            <BookOpenText className="text-blue-500" />{' '}
            {getFilterLabel(t('sources'), getSelectedFilters('sources').length)}
          </FilterPopover>

          <FilterPopover
            title={t('countries')}
            filterType="countries"
            filters={filters.countries}
            onSelect={(filter) => selectFilter(filter, 'countries')}
          >
            <Earth className="text-sky-500" />{' '}
            {getFilterLabel(
              t('countries'),
              getSelectedFilters('countries').length
            )}
          </FilterPopover>

          <FilterPopover
            title={t('languages')}
            filterType="languages"
            filters={filters.languages}
            onSelect={(filter) => selectFilter(filter, 'languages')}
          >
            <Languages className="text-cyan-500" />{' '}
            {getFilterLabel(
              t('languages'),
              getSelectedFilters('languages').length
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
          <SearchNewsForm />
        </div>
      </SearchLayout>
    </>
  )
}
