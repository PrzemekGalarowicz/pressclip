import { Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { AppHeader } from '../_components/app-header'
import { AccentButton } from '@/components/accent-button'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.listsTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default async function ListsPage() {
  const t = await getTranslations('ListsPage')
  const g = await getTranslations('Global')

  return (
    <>
      <AppHeader title={t('lists')}>
        <div className="ml-auto flex items-center gap-2">
          <AccentButton href="/" icon={<Sparkles />}>
            {g('upgrade')}
          </AccentButton>
        </div>
      </AppHeader>

      <div>Lists</div>
    </>
  )
}
