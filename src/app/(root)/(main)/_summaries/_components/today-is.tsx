'use client'

import { useTranslations } from 'next-intl'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export const TodayIs = () => {
  const t = useTranslations('Global')
  const date = new Date()

  return (
    <HoverCard>
      <HoverCardTrigger className="flex w-full cursor-help flex-col text-center text-sm md:text-start">
        <span className="font-medium capitalize">
          {t('todayIsFormattedDay', { date })}
        </span>
        <span className="text-xs text-muted-foreground">
          {t('todayIsFormattedDate', { date })}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="text-xs text-muted-foreground">
        <span className="font-medium text-primary">October 11th</span> is the
        284th day of the Gregorian calendar (285th in leap years).
        <br />
        <br /> There are 81 days remaining until the end of the year.
        <span className="mt-3 block">{t('enjoyYourDay')} 😊</span>
        {/* From Wikipedia: https://pl.wikipedia.org/wiki/Kalendarium_dzie%C5%84_po_dniu#Dzisiaj */}
      </HoverCardContent>
    </HoverCard>
  )
}
