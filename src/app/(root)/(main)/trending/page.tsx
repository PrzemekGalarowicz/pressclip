'use client'

import { UserButton } from '@clerk/nextjs'
import { DotIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ThemeDropdown } from '@/app/_components/theme-dropdown'

// import { getTranslations } from 'next-intl/server'

// export async function generateMetadata() {
//   const t = await getTranslations('Global')

//   return {
//     title: `${t('meta.trendingTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
//     robots: 'noindex',
//   }
// }

export default function TrendingPage() {
  const t = useTranslations('AppMenu')

  return (
    <div className="flex flex-col gap-10 p-10">
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
        </UserButton.MenuItems>
      </UserButton>

      <ThemeDropdown side="top" />

      <h1>Trending Page</h1>
    </div>
  )
}
