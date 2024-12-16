import { ExternalLink } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Categories } from './_components/categories'
import PageHeader from './_components/page-header'
import {
  Teaser,
  TeaserContent,
  TeaserDescription,
  TeaserHeader,
  TeaserImage,
  TeaserList,
  TeaserListItem,
  TeaserPulse,
  TeaserTitle,
} from '@/app/(root)/(main)/_components/teaser'
import {
  OptionMenu,
  OptionMenuClipButton,
  OptionMenuContent,
  OptionMenuDeleteButton,
  OptionMenuGroup,
  OptionMenuItem,
  OptionMenuPublishButton,
  OptionMenuTrigger,
  OptionMenuViewButton,
} from '@/components/option-menu'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.summariesTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default async function SummariesPage() {
  const t = await getTranslations('SummariesPage')

  return (
    <>
      {/* <PageHeader />

      <div className="relative mb-4 mt-2 w-full">
        <Categories />
      </div> */}

      <div className="mx-auto grid grid-cols-12 gap-5 lg:gap-10">
        <section className="col-span-12 lg:col-span-8 xl:col-span-8">
          {Array.from({ length: 32 }).map((_, index) => (
            <Teaser key={index} className="my-6 md:my-8">
              <TeaserContent>
                <TeaserImage
                  src="https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg"
                  alt="Photo by Drew Beamer"
                  className="h-36"
                />

                <TeaserHeader>
                  <TeaserList>
                    <TeaserListItem>TMZ Staff</TeaserListItem>
                    <TeaserListItem>General</TeaserListItem>
                    <TeaserListItem>05 Dec 2024</TeaserListItem>
                  </TeaserList>
                  <TeaserTitle className="md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                    Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns
                  </TeaserTitle>
                  <TeaserDescription>
                    Rafael Nadal is officially OUT of the U.S. Open ... the
                    tennis legend said Tuesday it&apos;s just too damn unsafe
                    for him to travel to America during the COVID-19 pandemic.
                    &quot;The situation is very complicated worldwide,&quot;
                    Nadal wrote in a statement. &quot;The…&quot;
                  </TeaserDescription>
                  <OptionMenu>
                    <OptionMenuTrigger className="absolute bottom-0 right-0" />
                    <OptionMenuContent>
                      <OptionMenuGroup>
                        <OptionMenuItem>
                          <OptionMenuViewButton />
                        </OptionMenuItem>
                        <OptionMenuItem>
                          <OptionMenuClipButton />
                        </OptionMenuItem>
                        <OptionMenuItem>
                          <OptionMenuPublishButton />
                        </OptionMenuItem>
                        <OptionMenuItem>
                          <OptionMenuDeleteButton />
                        </OptionMenuItem>
                      </OptionMenuGroup>
                    </OptionMenuContent>
                  </OptionMenu>
                </TeaserHeader>
              </TeaserContent>
              {index === 3 && <TeaserPulse />}
            </Teaser>
          ))}

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="my-6 w-full sm:w-[280px] lg:my-10"
            >
              {t('loadMore')}
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
