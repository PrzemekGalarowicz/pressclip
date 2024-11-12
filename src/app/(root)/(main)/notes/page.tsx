import { Plus, Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { AppHeader } from '../_components/app-header'
import { AccentButton } from '@/components/accent-button'
import { Button } from '@/components/ui/button'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.notesTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default async function NotesPage() {
  const t = await getTranslations('NotesPage')
  const g = await getTranslations('Global')

  return (
    <>
      <AppHeader title={t('notes')}>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="secondary">
            <Plus className="mr-2 size-4" />
            {t('note')}
          </Button>
          <AccentButton href="/" icon={<Sparkles />}>
            {g('upgrade')}
          </AccentButton>
        </div>
      </AppHeader>

      <div>Notes</div>
    </>
  )
}
