import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const schema = z.object({
  languages: z.string().optional().default('en'),
  sources: z.string().optional().default(''),
  q: z.array(z.string()).optional().default([]),
  from: z.string().optional().default(''),
  to: z.string().optional().default(''),
})

const createQueryFromKeywords = (keywords: string[]) => {
  const query = keywords
    .map((keyword) => `${keyword} AND `)
    .join(' ')
    .trim()
  const finalQuery = query.endsWith(' AND') ? query.slice(0, -4) : query
  return `q=${encodeURIComponent(finalQuery)}`
}

const fetchNews = async (params: z.infer<typeof schema>) => {
  const queryParts = []

  // Add keywords if they exist
  if (params.q) {
    const keywords = createQueryFromKeywords(params.q)
    queryParts.push(`q=${keywords}`)
  }

  // Add other parameters conditionally
  if (params.from) queryParts.push(`from=${encodeURIComponent(params.from)}`)
  if (params.to) queryParts.push(`to=${encodeURIComponent(params.to)}`)
  if (params.sources)
    queryParts.push(`sources=${encodeURIComponent(params.sources)}`)
  if (params.languages)
    queryParts.push(`language=${encodeURIComponent(params.languages)}`)

  // Join all query parts with "&"
  const queryString = queryParts.join('&')

  const response = await fetch(
    `https://newsapi.org/v2/everything?${queryString}&sortBy=relevancy&page=1&apiKey=${process.env.NEWSAPI_SECRET_KEY}`
  )

  const data = await response.json()
  return data
}

const createSummary = async (data: Record<string, any>[]) => {
  const content = data.articles
    .map((article) => article.content || article.description || '')
    .join('\n\n')

  console.log('content', content)
  if (!content) {
    return
  }

  // Send request to OpenAI API for summarization
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a researcher and an analyst.',
      },
      {
        role: 'user',
        content: `
        Create and press article from the following articles:\n\n${content}. It has to be a summary of the provided articles. Keep it concise and to the point and be focused on facts.
        Return only the summary in JSON format. Each JSON object should have
        a "title" key with the article/summary title, and
        a "paragraph" key with the paragraph content as the "content" key, and
        a "source" key with the sources of the article as the "source" key, and
        a "url" key with the url of the article as the "url" key, and
        a "title" key with the title of the article as the "title" key, and
        a "urlToImage" key with the url to the image of the article as the "urlToImage" key, and
        an "author" key with the author of the article as the "author" key.
        `,
      },
    ],
    top_p: 0,
    temperature: 0,
    presence_penalty: -2,
    response_format: { type: 'json_object' },
  })

  return completion.choices[0].message
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { languages, sources, q, from, to } = await request.json()
    const validatedCredentials = schema.safeParse({
      languages,
      sources,
      q,
      from,
      to,
    })
    if (!validatedCredentials.success) {
      throw new Error('Invalid credentials')
    }

    // Fetch news
    const articles = await fetchNews(validatedCredentials.data)
    if (!articles || articles.length === 0) {
      throw new Error('No articles found for the given query.')
    }

    // Create summary
    const summary = await createSummary(articles)
    console.log('summary', summary)

    return new NextResponse(JSON.stringify({ data: summary }), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 })
  }
}
