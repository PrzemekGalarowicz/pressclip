'use client'

import { cn } from '@/lib/utils'
import { Command } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

interface CommandKeyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  keyboardKey: string
}

const CommandKey = React.forwardRef<HTMLDivElement, CommandKeyProps>(
  ({ className, keyboardKey, ...props }, ref) => {
    const t = useTranslations('Global')

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-1 text-xs font-medium text-muted-foreground opacity-50',
          className
        )}
        {...props}
      >
        <Command className="size-2" /> {keyboardKey}
        <span className="sr-only">{t('CtrOrCmd', { keyboardKey })}</span>
      </div>
    )
  }
)

CommandKey.displayName = 'CommandKey'

export { CommandKey }
