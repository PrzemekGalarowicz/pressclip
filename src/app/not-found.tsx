import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { PageError } from './_components/page-error'
import { Button } from '@/components/ui/button'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.notFoundPageTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default async function NotFoundPage() {
  const t = await getTranslations('NotFoundPage')

  return (
    <PageError title={t('title')}>
      <Button size="lg" asChild>
        <Link href="/">{t('goHome')}</Link>
      </Button>
    </PageError>
  )
}
