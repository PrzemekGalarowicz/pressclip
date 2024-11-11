import { SignUp } from '@clerk/nextjs'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import * as React from 'react'

import { Logo } from '@/components/logo'

export async function generateMetadata() {
  const t = await getTranslations('SignUpPage')

  return {
    title: `${t('meta.title')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: t('meta.description'),
  }
}

export default async function SignUpPage() {
  const t = await getTranslations('SignUpPage')

  return (
    <>
      <Logo href="/" className="absolute left-4 top-4 z-20 hidden lg:flex" />

      <div className="grid h-screen grid-cols-1 items-center lg:grid-cols-2">
        <div className="col-span-1 hidden h-screen items-center justify-center lg:flex">
          <blockquote className="max-w-[800px] p-10 font-serif text-4xl leading-snug">
            The press is the best instrument for enlightening the mind of man,
            and improving him as a rational, moral, and social being.
            <span className="block pt-3 font-sans text-base font-normal leading-normal text-gray-500 dark:text-gray-300">
              ~{' '}
              <a
                href="https://www.google.com/search?q=Thomas+Jefferson&oq=Thomas+Jefferson"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted transition-all duration-300 hover:opacity-85"
              >
                Thomas Jefferson
              </a>
            </span>
          </blockquote>
        </div>

        <div className="col-span-1 flex flex-col items-center justify-center">
          <SignUp fallbackRedirectUrl="/trending" />

          <p className="mt-4 block max-w-96 text-center text-xs text-muted-foreground">
            {t('youAgree')}
            <Link
              className="ml-1 underline"
              href="/terms-of-service"
              target="blank"
            >
              {t('terms')}
            </Link>
            {', '}
            <Link
              className="ml-1 underline"
              href="/privacy-policy"
              target="blank"
            >
              {t('privacy')}
            </Link>
            {', and '}
            <Link
              className="ml-1 underline"
              href="/cookies-policy"
              target="blank"
            >
              {t('cookies')}
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
