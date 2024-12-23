'use server'

import { auth } from '@clerk/nextjs/server'
import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import { FilterSourceType } from '../(root)/(main)/search/_type'

function removeDuplicatesByName(arr: FilterSourceType[]) {
  return arr.reduce((acc: FilterSourceType[], current: FilterSourceType) => {
    if (!acc.find((item: FilterSourceType) => item.label === current.label)) {
      acc.push(current)
    }
    return acc
  }, [])
}

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

    const response = await fetch(
      `http://api.mediastack.com/v1/sources?access_key=${process.env.MEDIASTACK_API_KEY}&search=${validated.data.query}&categories=general&limit=100`
    )
    const sources = await response.json()

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
