import { Filter } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export const Filters = () => {
  const t = useTranslations('TrendingPage')
  const g = useTranslations('Global')
  const c = useTranslations('Categories')

  const DATE_FILTER_RANGES = [
    { label: g('anytime'), value: 'anytime' },
    { label: g('today'), value: 'today' },
    { label: g('yesterday'), value: 'yesterday' },
    { label: g('lastWeek'), value: '7days' },
    { label: g('lastMonth'), value: '30days' },
    { label: g('last6Months'), value: '6months' },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="w-10 md:w-fit">
          <Filter className="size-4 md:mr-2" />
          <span className="sr-only md:not-sr-only">{t('filters')}</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </SheetDescription>
        </SheetHeader>

        <div className="overflow-y-auto">
          <Separator className="my-5" />

          <h4 className="mb-4 text-base font-medium">Categories</h4>
          <RadioGroup
            className="flex flex-col gap-4"
            defaultValue="comfortable"
          >
            {[
              c('all'),
              c('general'),
              c('business'),
              c('entertainment'),
              c('health'),
              c('science'),
              c('sports'),
              c('technology'),
            ].map((value) => (
              <div className="flex items-center gap-2" key={value}>
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value} className="w-full cursor-pointer">
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Separator className="my-5" />

          <h4 className="mb-4 text-base font-medium">Publication date</h4>
          <RadioGroup
            className="flex flex-col gap-4"
            defaultValue="comfortable"
          >
            {DATE_FILTER_RANGES.map(({ label, value }) => (
              <div className="flex items-center gap-2" key={value}>
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value} className="w-full cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Separator className="my-5" />

          <h4 className="mb-4 text-base font-medium">Type</h4>
          <RadioGroup
            className="flex flex-col gap-4"
            defaultValue="comfortable"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="w-full cursor-pointer">
                All
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="clipped" id="clipped" />
              <Label htmlFor="clipped" className="w-full cursor-pointer">
                Clipped
              </Label>
            </div>
          </RadioGroup>
        </div>
      </SheetContent>
    </Sheet>
  )
}
