import { Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { AppHeader } from '../_components/app-header'
import { AccentButton } from '@/components/accent-button'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.scheduleTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default async function SchedulePage() {
  const t = await getTranslations('SchedulePage')
  const g = await getTranslations('Global')

  return (
    <>
      <AppHeader title={t('schedule')}>
        <div className="ml-auto flex items-center gap-2">
          <AccentButton href="/" icon={<Sparkles />}>
            {g('upgrade')}
          </AccentButton>
        </div>
      </AppHeader>

      <div>Schedule</div>
    </>
  )
}
