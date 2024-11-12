import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.clippedTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default function ClippedPage() {
  return <>Clipped Page</>
}
