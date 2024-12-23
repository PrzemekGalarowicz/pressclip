'use client'

import {
  DEFAULT_CATEGORIES,
  DEFAULT_COUNTRIES,
  DEFAULT_LANGUAGES,
  DEFAULT_SOURCES,
} from '@/consts'
import { cn } from '@/lib/utils'
import { FilterLanguageType, FilterSourceType, FilterType } from '@/type'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  BookOpenText,
  CalendarIcon,
  Earth,
  Languages,
  LayoutList,
  SearchIcon,
  Sparkles,
} from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import * as React from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/hooks/use-toast'

import { AppHeader } from '../_components/app-header'
import {
  DateRangePopover,
  FilterPopover,
  SortByDropdown,
  SortByType,
  SourcePopover,
} from './_components/filter-popover'
import { AccentButton } from '@/components/accent-button'
import { MultiInput } from '@/components/multi-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

function useFilter<T extends { label: string; selected: boolean }>(
  defaultValues: T[]
): [number, T[], React.Dispatch<React.SetStateAction<T[]>>] {
  const t = useTranslations('DefaultFilters')

  const defaults = React.useMemo(
    () => defaultValues.map((val) => ({ ...val, label: t(val.label) })),
    [t, defaultValues]
  )
  const [values, setValues] = React.useState<T[]>(defaults)

  const selectedCount = values.filter((value) => value.selected).length

  return [selectedCount, values, setValues]
}

function useSearchFormSchema() {
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
type SearchFormData = z.infer<ReturnType<typeof useSearchFormSchema>>

export function SearchForm({
  className,
  ...props
}: React.ComponentPropsWithRef<'form'>) {
  const t = useTranslations('SearchPage')

  const format = useFormatter()

  const { toast } = useToast()

  const newsFormSchema = useSearchFormSchema()
  const form = useForm<SearchFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      keywords: [],
    },
  })

  const [categoriesCount, categories, setCategories] =
    useFilter<FilterType>(DEFAULT_CATEGORIES)
  const [countriesCount, countries, setCountries] =
    useFilter<FilterType>(DEFAULT_COUNTRIES)
  const [languagesCount, languages, setLanguages] =
    useFilter<FilterLanguageType>(DEFAULT_LANGUAGES)
  const [sourcesCount, sources, setSources] =
    useFilter<FilterSourceType>(DEFAULT_SOURCES)
  const [sortBy, setSortBy] = React.useState<SortByType>('relevance')
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: new Date(),
  })

  const [pending, startTransition] = React.useTransition()
  const onSubmit = (data: SearchFormData) => {
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

  const updateFilter = <
    T extends FilterType | FilterSourceType | FilterLanguageType,
  >(
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

        <div className="flex flex-wrap items-center justify-center gap-2 px-2">
          <FilterPopover
            title={t('categoriesTitle')}
            filterType="categories"
            filters={categories}
            onSelect={(selectedCategorie) => {
              setCategories((prev) => updateFilter(prev, selectedCategorie))
            }}
          >
            <LayoutList className="text-indigo-500" />{' '}
            {t('categories', { count: categoriesCount })}
          </FilterPopover>

          <FilterPopover
            title={t('countriesTitle')}
            filterType="countries"
            filters={countries}
            onSelect={(selectedCountrie) => {
              setCountries((prev) => updateFilter(prev, selectedCountrie))
            }}
          >
            <Earth className="text-blue-500" />{' '}
            {t('countries', { count: countriesCount })}
          </FilterPopover>

          <FilterPopover
            title={t('languagesTitle')}
            filterType="languages"
            filters={languages}
            onSelect={(selectedLanguage) => {
              setLanguages((prev) => updateFilter(prev, selectedLanguage))
            }}
          >
            <Languages className="text-sky-500" />{' '}
            {t('languages', { count: languagesCount })}
          </FilterPopover>

          <SourcePopover
            title={t('sourcesTitle')}
            filterType="sources"
            filters={sources}
            countries={countries
              .filter((country) => country.selected)
              .map((country) => country.icon)
              .join(',')}
            onSelect={(fetchedSources, selectedSource) => {
              setSources(updateFilter(fetchedSources, selectedSource))
            }}
          >
            <BookOpenText className="text-cyan-500" />{' '}
            {t('sources', { count: sourcesCount })}
          </SourcePopover>

          <DateRangePopover
            selected={date}
            onSelect={(range: DateRange | undefined) => {
              if (range) {
                setDate(range)
              }
            }}
          >
            <CalendarIcon className="text-teal-500" />{' '}
            {date.from &&
              date.to &&
              format.dateTimeRange(date.from, date.to, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
          </DateRangePopover>

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
