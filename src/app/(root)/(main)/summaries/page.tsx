import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.summariesTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default function SummariesPage() {
  return <>Summaries Page</>
}
