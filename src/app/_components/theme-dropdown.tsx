'use client'

import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeDropdown(props: {
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined
}) {
  const t = useTranslations('Global')

  const { theme, setTheme } = useTheme()

  const handleColorChange = (theme: React.SetStateAction<string>) =>
    setTheme(theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('rounded-full', props.className)}
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('changeColorTheme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4" align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={handleColorChange}>
          <DropdownMenuRadioItem
            className="cursor-pointer py-2 pr-2"
            value="light"
          >
            {t('light')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="cursor-pointer py-2 pr-2"
            value="dark"
          >
            {t('dark')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="cursor-pointer py-2 pr-2"
            value="system"
          >
            {t('system')}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
