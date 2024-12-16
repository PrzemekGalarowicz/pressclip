import { Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { AccentButton } from '@/components/accent-button'
import { AppHeader } from '../../_components/app-header'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.clippedTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default async function SummaryPage() {
  const t = await getTranslations('ClippedPage')
  const g = await getTranslations('Global')

  return (
    <>
      <AppHeader title={t('clipped')}>
        <div className="ml-auto flex items-center gap-2">
          <AccentButton href="/" icon={<Sparkles />}>
            {g('upgrade')}
          </AccentButton>
        </div>
      </AppHeader>

      <div>Clipped

        <iframe src="https://www.wired.com/story/wayves-ai-self-driving-system-is-here-to-drive-like-a-human-and-take-on-waymo-and-tesla/" className="h-[90vh] w-1/2" allowFullScreen loading="lazy" sandbox="allow-scripts allow-same-origin"></iframe>

      </div>
    </>
  )
}
