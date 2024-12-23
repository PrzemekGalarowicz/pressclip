'use client'

import { TodayIs } from './today-is'
import { cn } from '@/lib/utils'

import { useScroll } from '@/hooks/use-scroll'

import { Filters } from '../../_components/filters'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function PageHeader() {
  const isScroll = useScroll()

  return (
    <header
      className={cn(
        'sticky top-0 z-20 my-2 grid h-14 grid-cols-12 items-center gap-2 bg-background/95 transition-all duration-300 md:my-4 lg:mb-5 lg:mt-6 lg:gap-4',
        isScroll && 'shadow-[0px_6px_6px_-6px_rgba(0,0,0,0.15)]'
      )}
    >
      <div className="order-2 col-span-4 flex items-center gap-4 md:order-1 md:col-span-3">
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>
        <TodayIs />
      </div>

      <div className="order-1 col-span-4 md:order-2 md:col-span-6">
        {/* TODO: */}
      </div>

      <div className="order-3 col-span-4 flex items-center justify-end gap-4 md:order-3 md:col-span-3">
        <Filters />
      </div>
    </header>
  )
}
