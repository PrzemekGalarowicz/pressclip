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
  const c = await getTranslations('Categories')
  const t = await getTranslations('SummariesPage')

  return (
    <>
      <PageHeader />

      <div className="relative mb-4 mt-2 w-full">
        <Categories />
      </div>

      <div className="grid grid-cols-12 gap-5 lg:gap-10">
        <section className="col-span-12 lg:col-span-8 xl:col-span-9">
          <h2 className="mb-4 text-base uppercase tracking-wider">
            {t('summaries')}
          </h2>

          <div className="grid grid-cols-12 xl:gap-10">
            <section className="col-span-12 xl:col-span-8">
              <Teaser className="mb-5 sm:mb-8 lg:mb-10 xl:mb-0">
                <TeaserContent>
                  <TeaserImage
                    src="https://images.unsplash.com/photo-1597701218190-ace198957ff6?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Photo by Drew Beamer"
                    priority={true}
                    ratio={16 / 9}
                    className="col-span-12 rounded-lg object-cover"
                  />
                  <TeaserHeader className="col-span-12 gap-4 text-center">
                    <TeaserTitle className="text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
                      Iran Secretly Warns U.S. Allies: Don’t Help Israel, or
                      You’re Next
                    </TeaserTitle>
                    <TeaserDescription>
                      The threats through diplomatic channels have prompted Arab
                      states to tell the U.S. that they won’t aid any attack on
                      Iran.
                    </TeaserDescription>
                    <TeaserList className="justify-center">
                      <TeaserListItem>{c('technology')}</TeaserListItem>
                      <TeaserListItem>1 hour ago</TeaserListItem>
                    </TeaserList>
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
                <TeaserPulse />
              </Teaser>
            </section>

            <section className="col-span-12 grid grid-cols-12 gap-4 sm:col-span-12 xl:col-span-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <Teaser
                  className="col-span-12 md:col-span-6 xl:col-span-12"
                  key={index}
                >
                  <TeaserContent className="gap-2">
                    <TeaserImage
                      src="https://images.unsplash.com/photo-1616970985306-275372fb7c74?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Photo by Drew Beamer"
                      priority={true}
                      ratio={16 / 9}
                      className="col-span-12 rounded-lg object-cover"
                    />
                    <TeaserHeader className="col-span-12">
                      <TeaserTitle>
                        Iran Secretly Warns U.S. Allies: Don’t Help Israel, or
                        You’re Next
                      </TeaserTitle>
                      <TeaserList>
                        <TeaserListItem>{c('technology')}</TeaserListItem>
                        <TeaserListItem>1 hour ago</TeaserListItem>
                      </TeaserList>

                      <OptionMenu>
                        <OptionMenuTrigger
                          className="absolute bottom-0 right-0"
                          variant="ghost"
                        />
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
                  {index === 1 && <TeaserPulse />}
                </Teaser>
              ))}
            </section>
          </div>

          <Separator className="my-6 md:my-8" />

          {Array.from({ length: 32 }).map((_, index) => (
            <Teaser key={index} className="mb-6 sm:mb-8 lg:mb-10">
              <TeaserContent>
                <TeaserHeader>
                  <TeaserTitle className="md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl">
                    Iran Secretly Warns U.S. Allies: Don’t Help Israel, or
                    You’re Next
                  </TeaserTitle>
                  <TeaserDescription>
                    The threats through diplomatic channels have prompted Arab
                    states to tell the U.S. that they won’t aid any attack on
                    Iran.
                  </TeaserDescription>
                  <TeaserList>
                    <TeaserListItem>{c('technology')}</TeaserListItem>
                    <TeaserListItem>1 hour ago</TeaserListItem>
                  </TeaserList>

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
                <TeaserImage
                  src="https://images.unsplash.com/photo-1728410994982-e376651ba722?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Photo by Drew Beamer"
                  className="h-36"
                />
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

          <Separator className="mb-2 mt-4 lg:hidden" />
        </section>

        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <section className="mb-8">
            <h2 className="mb-4 text-base uppercase tracking-wider">
              {t('mostPopular')}
            </h2>

            <div className="mb-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mb-6 md:gap-8 lg:grid-cols-1">
              {Array.from({ length: 8 }).map((_, index) => (
                <Teaser key={index} sponsored={index === 2}>
                  <TeaserContent>
                    <TeaserHeader className="col-span-12 gap-2">
                      <TeaserTitle>
                        Iran Secretly Warns U.S. Allies: Don’t Help Israel, or
                        You’re Next
                      </TeaserTitle>
                      <TeaserList>
                        {index === 2 && (
                          <TeaserListItem>{t('sponsored')}</TeaserListItem>
                        )}
                        {index === 3 && (
                          <TeaserListItem>{t('byPressclip')}</TeaserListItem>
                        )}
                        <TeaserListItem>{c('technology')}</TeaserListItem>
                        <TeaserListItem>1 hour ago</TeaserListItem>
                      </TeaserList>

                      <OptionMenu>
                        <OptionMenuTrigger
                          className="absolute bottom-0 right-0"
                          variant="ghost"
                        />
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
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-[280px] xl:w-full"
              >
                {t('loadMore')}
              </Button>
            </div>
          </section>

          <section className="sticky top-14 mb-8 rounded-lg bg-secondary p-4">
            <h2 className="mb-4 text-base uppercase tracking-wider">
              {t('podcast')}
            </h2>

            <div className="mb-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {Array.from({ length: 4 }).map((_, index) => (
                <Teaser key={index}>
                  <TeaserContent>
                    <TeaserImage
                      className="lg:col-span-4"
                      src="https://images.unsplash.com/photo-1540908489236-15aac66d9a53?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Photo by Drew Beamer"
                    />
                    <TeaserHeader className="lg:col-span-8">
                      <TeaserTitle className="!text-sm">
                        Iran Secretly Warns U.S. Allies: Don’t Help Israel, or
                        You’re Next
                      </TeaserTitle>
                      <TeaserList>
                        <TeaserListItem>1 day ago</TeaserListItem>
                      </TeaserList>
                    </TeaserHeader>
                  </TeaserContent>
                </Teaser>
              ))}
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="my-2 w-full sm:w-[280px]">
                {t('showAllEpisodes')} <ExternalLink className="ml-2 size-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
