'use client'

import {
  DEFAULT_CATEGORIES,
  DEFAULT_COUNTRIES,
  DEFAULT_LANGUAGES,
  DEFAULT_SOURCES,
} from './_const'
import { FilterActionType, FilterType } from './_type'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ClipboardList,
  Earth,
  Languages,
  Minus,
  Newspaper,
  Plus,
  Search as SearchIcon,
} from 'lucide-react'
import { useTransition } from 'react'
import * as React from 'react'
import { CircleFlag } from 'react-circle-flags'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useEscapeButton } from '@/hooks/use-escape-button'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

import {
  ActiveFilterList,
  ActiveFilterListItem,
} from './_components/active-filter-list'
import {
  FilterList,
  FilterListItem,
  FilterListItemAction,
  FilterListItemActionButton,
  FilterListItemIcon,
  FilterListItemLabel,
} from './_components/filter-list'
import { FilterNav, FilterNavItem } from './_components/filter-nav'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
  keywords: z.array(
    z.string().min(1, { message: 'At least one keyword is required' })
  ),
})

export function SearchForm({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const [submitting, startTransition] = useTransition()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: [],
    },
  })

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      console.log('onSubmit', data)
      form.reset()
    })
  }

  return (
    <section
      className={cn('flex gap-1 rounded-3xl bg-muted p-2', className)}
      {...props}
    >
      <Form {...form}>
        <form
          className="flex-1"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="keywords"
            render={({ field, fieldState }) => (
              <FormItem className="px-1">
                <FormControl>
                  <MultiInput
                    className="rounded-xl border-0 bg-transparent placeholder:text-base placeholder:text-muted-foreground/75"
                    type="search"
                    placeholder="Add keywords releated to the topic your're looking for..."
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                    selectedOptions={field.value}
                    onCheckedChange={field.onChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Button size="icon" disabled={submitting}>
        <SearchIcon strokeWidth={3} className="!size-5" />
        <span className="sr-only">Search</span>
      </Button>
    </section>
  )
}

export function SearchLayout({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'flex h-screen flex-col items-center justify-center',
        className
      )}
      {...props}
    >
      <header className="mb-8 flex flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-2xl">What are you looking for today?</h1>

        <p className="text-sm text-muted-foreground">
          We have a wide range of{' '}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="link" className="!h-auto !p-0">
                  advanced search options
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Check out our advanced search options to help
                <br /> you find exactly what you&apos;re looking for.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>{' '}
          to help you find exactly what
          <br /> you&apos;re looking for. Enter your search query below to get
          started.
        </p>
      </header>

      <div className="w-full max-w-2xl">
        <SearchForm />
      </div>

      {children}
    </div>
  )
}

export default function SearchPage() {
  const [filters, setFilters] = React.useState<FilterType[]>([])
  const [filteredFilters, setFilteredFilters] = React.useState<FilterType[]>([])

  const [activeFilter, setActiveFilter] = React.useState<string>()

  const ref = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setActiveFilter(undefined))

  useEscapeButton(() => setActiveFilter(undefined))

  React.useEffect(() => {
    if (activeFilter === 'categories') {
      setFilters(DEFAULT_CATEGORIES)
      setFilteredFilters(DEFAULT_CATEGORIES)
    } else if (activeFilter === 'sources') {
      setFilters(DEFAULT_SOURCES)
      setFilteredFilters(DEFAULT_SOURCES)
    } else if (activeFilter === 'countries') {
      setFilters(DEFAULT_COUNTRIES)
      setFilteredFilters(DEFAULT_COUNTRIES)
    } else if (activeFilter === 'languages') {
      setFilters(DEFAULT_LANGUAGES)
      setFilteredFilters(DEFAULT_LANGUAGES)
    }
  }, [activeFilter])

  const onTakeAction = (
    filters: FilterType[],
    filter: FilterType,
    actionType: FilterActionType
  ) =>
    filters.map((f) => ({
      ...f,
      [actionType]: f.label === filter.label ? true : f[actionType],
    }))

  const onClearAction = (filters: FilterType[]) =>
    filters.map((f) => ({
      ...f,
      include: null,
      exclude: null,
    }))

  const isDisabled = (filter: FilterType, actionType: FilterActionType) =>
    filter[actionType] === null ? undefined : filter[actionType]

  return (
    <SearchLayout>
      <div ref={ref} className="h-[200px]">
        <FilterNav>
          <FilterNavItem
            active={activeFilter === 'categories'}
            onClick={() => setActiveFilter('categories')}
          >
            <ClipboardList className="text-blue-600" />
            Categories
          </FilterNavItem>
          <FilterNavItem
            active={activeFilter === 'sources'}
            onClick={() => setActiveFilter('sources')}
          >
            <Newspaper className="text-cyan-600" />
            Sources
          </FilterNavItem>
          <FilterNavItem
            active={activeFilter === 'countries'}
            onClick={() => setActiveFilter('countries')}
          >
            <Earth className="text-sky-600" />
            Countries
          </FilterNavItem>
          <FilterNavItem
            active={activeFilter === 'languages'}
            onClick={() => setActiveFilter('languages')}
          >
            <Languages className="text-lime-600" />
            Languages
          </FilterNavItem>
        </FilterNav>

        {activeFilter && (
          <div className="mt-2 w-full max-w-lg rounded-2xl border bg-background p-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="rounded-2xl border-none bg-muted pl-10"
                placeholder="Search"
                onChange={(e) => {
                  const filtered = filters.filter((filter) =>
                    filter.label
                      .toLocaleUpperCase()
                      .includes(e.target.value.toLocaleUpperCase())
                  )
                  setFilteredFilters(filtered)
                }}
              />
            </div>

            <ActiveFilterList>
              {filters.map((filter) =>
                filter.include || filter.exclude ? (
                  <ActiveFilterListItem
                    key={filter.label}
                    include={filter.include}
                    exclude={filter.exclude}
                    onClear={() => {
                      setFilters(onClearAction(filters))
                      setFilteredFilters(onClearAction(filteredFilters))
                    }}
                  >
                    {filter.label}
                  </ActiveFilterListItem>
                ) : null
              )}
            </ActiveFilterList>

            <div className="max-h-[260px] overflow-y-auto">
              <FilterList>
                {filteredFilters.map((filter, index) => (
                  <React.Fragment key={filter.label}>
                    <FilterListItem key={filter.label}>
                      <FilterListItemLabel>
                        {activeFilter !== 'sources' && (
                          <FilterListItemIcon>
                            {activeFilter === 'categories' ? (
                              <filter.icon className="size-5 text-muted-foreground" />
                            ) : (
                              <CircleFlag countryCode={filter.icon as string} />
                            )}
                          </FilterListItemIcon>
                        )}
                        {filter.label}
                      </FilterListItemLabel>

                      <FilterListItemAction>
                        <FilterListItemActionButton
                          tooltip="Exclude"
                          disabled={isDisabled(filter, 'exclude')}
                          onClick={() => {
                            setFilters(onTakeAction(filters, filter, 'exclude'))
                            setFilteredFilters(
                              onTakeAction(filteredFilters, filter, 'exclude')
                            )
                          }}
                        >
                          <>
                            <Minus className="text-red-500" />
                            <span className="sr-only">Exclude</span>
                          </>
                        </FilterListItemActionButton>
                        <FilterListItemActionButton
                          tooltip="Include"
                          disabled={isDisabled(filter, 'include')}
                          onClick={() => {
                            setFilters(onTakeAction(filters, filter, 'include'))
                            setFilteredFilters(
                              onTakeAction(filteredFilters, filter, 'include')
                            )
                          }}
                        >
                          <>
                            <Plus className="text-green-500" />
                            <span className="sr-only">Include</span>
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
        )}
      </div>
    </SearchLayout>
  )
}
