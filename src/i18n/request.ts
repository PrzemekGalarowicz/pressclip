import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // TODO: get locale from cookies or user settings
  const locale = 'en'

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
