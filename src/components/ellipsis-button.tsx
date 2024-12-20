'use client'

import { cn } from '@/lib/utils'
import { EllipsisVertical } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button, ButtonProps } from '@/components/ui/button'

export function EllipsisButton({
  className,
  variant = 'ghost',
  size = 'icon',
  ...props
}: Omit<ButtonProps, 'asChild'>) {
  const t = useTranslations('Global')

  return (
    <Button variant={variant} size={size} className={cn(className)} {...props}>
      <EllipsisVertical className="text-muted-foreground" />
      <span className="sr-only">{t('moreOptions')}</span>
    </Button>
  )
}
