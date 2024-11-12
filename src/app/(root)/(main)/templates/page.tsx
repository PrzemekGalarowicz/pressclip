import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.templatesTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default function TemplatesPage() {
  return <>Templates Page</>
}
