'use client'

import { UserButton } from '@clerk/nextjs'
import { DotIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function UserDropdown() {
  const t = useTranslations('AppMenu')

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label={t('subscription')}
          labelIcon={<DotIcon />}
          href="/subscription"
        />
        <UserButton.Link
          label={t('support')}
          labelIcon={<DotIcon />}
          href="/support"
        />
        <UserButton.Link
          label={t('settings')}
          labelIcon={<DotIcon />}
          href="/settings"
        />
      </UserButton.MenuItems>
    </UserButton>
  )
}
