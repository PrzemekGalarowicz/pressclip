'use client'

import { getCookie, setCookie } from '@/lib/cookies'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CookieDialog(props: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations('CookieDialog')

  const [openDialog, setOpenDialog] = React.useState(false)

  const session = { data: { user: null } }

  const toggleDialog = () => setOpenDialog((prev) => !prev)

  const handleRejectAllCookies = () => {
    try {
      setCookie('isCookieManaged', JSON.stringify(true), 180)
      toggleDialog()
    } catch (error) {
      console.error(error)
    }
  }

  const handleAcceptAllCookies = () => {
    try {
      setCookie('isCookieManaged', JSON.stringify(true), 180)
      toggleDialog()
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    try {
      const isCookieManaged = getCookie('isCookieManaged')
      if (!isCookieManaged) setOpenDialog(true)
    } catch (error) {
      console.error(error)
    }
  }, [setOpenDialog])

  React.useEffect(() => {
    if (session?.data?.user) {
      setCookie('isCookieManaged', JSON.stringify(true), 180)
      setOpenDialog(false)
    }
  }, [session?.data?.user, setOpenDialog])

  if (!openDialog) return null

  return (
    <Card
      className={cn(
        'fixed bottom-1 z-50 flex w-full flex-col shadow-lg sm:bottom-4 sm:right-4 sm:max-w-[600px]',
        props.className
      )}
      {...props}
    >
      <CardHeader className="p-4">
        <CardTitle className="mb-0 text-base">{t('title')}</CardTitle>
        <CardDescription className="text-sm">
          {t('description')}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center gap-4 p-4 pt-0">
        <Button size="sm" onClick={handleAcceptAllCookies}>
          {t('accept')}
        </Button>

        <Button variant="outline" size="sm" onClick={handleRejectAllCookies}>
          {t('reject')}
        </Button>
      </CardFooter>
    </Card>
  )
}
