'use server'

import { removeDuplicatesByName } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import { FilterSourceType } from '../../type'

type Source = {
  name: string
  code: string
  category: string
  country: string
  language: string
  url: string
}

const getSourcesSchema = z.object({
  query: z.string().trim().min(1),
  countries: z.string().trim().optional(),
})

export type GetSourcesFormDataFields = z.infer<typeof getSourcesSchema>

export async function getSourcesAction(
  params: GetSourcesFormDataFields
): Promise<FilterSourceType[]> {
  const t = await getTranslations('Server')

  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error(t('accessDenied'))
    }

    const validated = getSourcesSchema.safeParse(params)
    if (!validated.success) {
      throw new Error(t('invalidQuery'))
    }

    if (validated.data.query.length < 3) {
      throw new Error(t('invalidQuery'))
    }

    let URL = `http://api.mediastack.com/v1/sources?access_key=${process.env.MEDIASTACK_API_KEY}&search=${validated.data.query}&limit=100&categories=general`
    if (validated.data.countries) {
      URL += `&countries=${validated.data.countries}`
    }

    const response = await fetch(URL)
    const sources = await response.json()

    if (!sources || sources.data?.length === 0) {
      return []
    }

    if (sources.error) {
      throw new Error(sources.error)
    }

    const sourcesArray = sources.data.map((source: Source) => ({
      country: source.country,
      language: source.language,
      url: source.url,
      label: source.name,
      icon: source.code,
      selected: false,
    }))
    return removeDuplicatesByName(sourcesArray)
  } catch (error) {
    console.error(error)
    throw new Error(t('unexpectedError'))
  }
}
