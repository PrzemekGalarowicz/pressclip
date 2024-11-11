'use client'

import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export function Spinner(props: React.HTMLAttributes<HTMLDivElement>) {
  const t = useTranslations('Global')

  return (
    <div className={cn(props.className)} {...props}>
      <Loader2Icon className="size-5 animate-spin" />
      <span className="sr-only">{t('loading')}</span>
    </div>
  )
}
