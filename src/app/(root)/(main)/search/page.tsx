'use client'

import { DEFAULT_FILTERS } from './_const'
import { FilterLabelType, FilterRecordType } from './_type'
import { isDisabled, onExclude, onInclude, updateFilters } from './_utils'
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

      {children}
    </div>
  )
}

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
  keywords: z.array(
    z.string().min(1, { message: 'At least one keyword is required' })
  ),
})

export function SearchForm({
  className,
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

export default function SearchPage() {
  const isClient = useIsClient()

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

  const ref = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setActiveFilter(undefined))

  useEscapeButton(() => setActiveFilter(undefined))

  return (
    <SearchLayout>
      <div className="w-full max-w-2xl">
        <SearchForm />
      </div>

      <div ref={ref} className="h-[200px]">
        <FilterNav>
          <FilterNavItem
            active={activeFilter === 'categories'}
            onClick={() => onSetFilters('categories')}
          >
            <ClipboardList className="text-blue-600" />
            Categories
          </FilterNavItem>
          <FilterNavItem
            active={activeFilter === 'sources'}
            onClick={() => onSetFilters('sources')}
          >
            <Newspaper className="text-cyan-600" />
            Sources
          </FilterNavItem>
          <FilterNavItem
            active={activeFilter === 'countries'}
            onClick={() => onSetFilters('countries')}
          >
            <Earth className="text-sky-600" />
            Countries
          </FilterNavItem>
          <FilterNavItem
            active={activeFilter === 'languages'}
            onClick={() => onSetFilters('languages')}
          >
            <Languages className="text-lime-600" />
            Languages
          </FilterNavItem>
        </FilterNav>

        {activeFilter && (
          <div className="mt-2 w-full max-w-lg rounded-2xl border bg-background p-4">
            <div className="relative mb-2">
              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="rounded-2xl border-none bg-muted pl-10"
                placeholder="Search"
                onChange={(e) => {
                  setFilteredFilters((prev) => ({
                    ...prev,
                    [activeFilter]: filters[activeFilter].filter((filter) =>
                      filter.label
                        .toLocaleUpperCase()
                        .includes(e.target.value.toLocaleUpperCase())
                    ),
                  }))
                }}
              />
            </div>

            {/* <ActiveFilterList>
              {filters[activeFilter].map((filter) =>
                filter.include || filter.exclude ? (
                  <ActiveFilterListItem
                    key={filter.label}
                    include={filter.include}
                    exclude={filter.exclude}
                    onClear={() => {
                      setFilters((prev) => ({
                        ...prev,
                        [activeFilter]: onClearAction(prev[activeFilter]),
                      }))
                      setFilteredFilters((prev) => ({
                        ...prev,
                        [activeFilter]: onClearAction(prev[activeFilter]),
                      }))
                    }}
                  >
                    {filter.label}
                  </ActiveFilterListItem>
                ) : null
              )}
            </ActiveFilterList> */}

            <div className="max-h-[260px] overflow-y-auto">
              <FilterList>
                {filteredFilters[activeFilter].map((filter, index) => (
                  <React.Fragment key={filter.label}>
                    <FilterListItem key={filter.label}>
                      <FilterListItemLabel>
                        {activeFilter !== 'sources' && (
                          <FilterListItemIcon>
                            {activeFilter === 'categories' ? (
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
                          tooltip="Exclude"
                          disabled={isDisabled(filter, 'exclude')}
                          onClick={() => {
                            setFilters((prev) => ({
                              ...prev,
                              [activeFilter]: onExclude(
                                prev[activeFilter],
                                filter
                              ),
                            }))
                            setFilteredFilters((prev) => ({
                              ...prev,
                              [activeFilter]: onExclude(
                                prev[activeFilter],
                                filter
                              ),
                            }))
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
                            setFilters((prev) => ({
                              ...prev,
                              [activeFilter]: onInclude(
                                prev[activeFilter],
                                filter
                              ),
                            }))
                            setFilteredFilters((prev) => ({
                              ...prev,
                              [activeFilter]: onInclude(
                                prev[activeFilter],
                                filter
                              ),
                            }))
                          }}
                        >
                          <>
                            <Plus className="text-green-500" />
                            <span className="sr-only">Include</span>
                          </>
                        </FilterListItemActionButton>
                      </FilterListItemAction>
                    </FilterListItem>

                    {index < filters[activeFilter].length - 1 && <Separator />}
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
