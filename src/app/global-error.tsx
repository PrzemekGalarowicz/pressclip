'use client'

import { useTranslations } from 'next-intl'

import { PageError } from './_components/page-error'
import { Button } from '@/components/ui/button'

export default function GlobalError(props: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('ErrorPage')

  return (
    <html>
      <body>
        <main className="flex h-screen items-center justify-center px-4">
          <PageError title={t('title')}>
            <Button size="lg" onClick={() => props.reset()}>
              {t('tryAgain')}
            </Button>
          </PageError>
        </main>
      </body>
    </html>
  )
}
