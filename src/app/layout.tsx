import './globals.css'
import { cn } from '@/lib/utils'
import { enUS, plPL } from '@clerk/localizations'
import '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import {
  Inter as FontSans,
  DM_Serif_Display as FontSerif,
} from 'next/font/google'

import { FirebaseProvider } from './_components/firebase-provider'
import { ThemeProvider } from '@/app/_components/theme-provider'
import { CookieDialog } from '@/components/cookie-dialog'
import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'sans-serif'],
  variable: '--font-sans',
})

const fontSerif = FontSerif({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Times New Roman', 'Times', 'serif'],
  variable: '--font-serif',
})

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.title')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: t('meta.description'),
    applicationName: process.env.NEXT_PUBLIC_APP_NAME,
    creator: process.env.NEXT_PUBLIC_APP_NAME,
    publisher: process.env.NEXT_PUBLIC_APP_NAME,
    // themeColor: '#000000',
    keywords:
      'AI news assistant, personal news, smart summaries, intelligent insights, news aggregator, personalized news feed, news curation, artificial intelligence, news updates, media intelligence, technology news, news trends, real-time news, digital news assistant, news analysis',
    manifest: `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`,
    authors: [
      {
        name: process.env.NEXT_PUBLIC_APP_NAME,
        url: process.env.NEXT_PUBLIC_BASE_URL,
      },
    ],
    icons: [
      {
        rel: 'icon',
        sizes: '32x32',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon-32x32.png`,
      },
      {
        rel: 'icon',
        sizes: '16x16',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon-16x16.png`,
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/apple-touch-icon.png`,
      },
    ],
    openGraph: {
      title: `${t('meta.title')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
      description: t('meta.description'),
      url: process.env.NEXT_PUBLIC_BASE_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
          alt: process.env.NEXT_PUBLIC_APP_NAME,
        },
      ],
      type: 'website',
    },
    twitter: {
      title: `${t('meta.title')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
      description: t('meta.description'),
      card: 'summary_large_image',
      site: '@site',
      creator: '@creator',
      images: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
    },
    appleWebApp: {
      capable: true,
      title: process.env.NEXT_PUBLIC_APP_NAME,
      statusBarStyle: 'black-translucent',
    },
    robots: 'index, follow',
  }
}

// FIXME:
// const schemaMarkup = {
//   '@context': 'https://schema.org',
//   '@type': 'WebSite',
//   name: process.env.NEXT_PUBLIC_APP_NAME,
//   url: process.env.NEXT_PUBLIC_BASE_URL,
//   description:
//     'The Future of News: Your AI-Powered Personal News Assistant with Smart Summaries and Intelligent Insights.',
//   image: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
//   // FIXME:
//   // "sameAs": [
//   //     "https://www.facebook.com/YourSaaSApp",
//   //     "https://twitter.com/YourSaaSApp",
//   //     "https://www.linkedin.com/company/yoursaasapp"
//   // ],
//   publisher: {
//     '@type': 'Organization',
//     name: process.env.NEXT_PUBLIC_APP_NAME,
//     logo: {
//       '@type': 'ImageObject',
//       url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
//     },
//   },
// }

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: 'hsl(0 0% 9%)',
        },
      }}
      localization={locale === 'en' ? enUS : locale === 'pl' ? plPL : enUS}
      dynamic
    >
      <FirebaseProvider>
        <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
          {/* <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!}
      /> */}
          <head>
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#000000"
            />
            <meta
              name="apple-mobile-web-app-title"
              content={process.env.NEXT_PUBLIC_APP_NAME}
            />
            <meta name="msapplication-TileColor" content="#000000" />

            {/* FIXME: */}
            {/* <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script> */}
          </head>

          <body
            className={cn(
              'min-h-screen bg-background font-sans antialiased',
              fontSans.variable,
              fontSerif.variable
            )}
            suppressHydrationWarning
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider messages={messages}>
                {props.children}
                <Toaster />
                <CookieDialog />
              </NextIntlClientProvider>
            </ThemeProvider>

            {/* <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} /> */}
          </body>
        </html>
      </FirebaseProvider>
    </ClerkProvider>
  )
}
