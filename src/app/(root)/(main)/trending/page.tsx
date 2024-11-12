import { ExternalLink } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import {
  Teaser,
  TeaserContent,
  TeaserDescription,
  TeaserHeader,
  TeaserImage,
  TeaserList,
  TeaserListItem,
  TeaserTitle,
} from '../_components/teaser'
import { Breaking, BreakingLink, BreakingTitle } from './_components/breaking'
import { Categories } from './_components/categories'
import PageHeader from './_components/page-header'
import { Stocks } from './_components/stocks'
import {
  OptionMenu,
  OptionMenuClipButton,
  OptionMenuContent,
  OptionMenuGroup,
  OptionMenuHideButton,
  OptionMenuItem,
  OptionMenuTrigger,
  OptionMenuViewButton,
} from '@/components/option-menu'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export async function generateMetadata() {
  const t = await getTranslations('Global')

  return {
    title: `${t('meta.trendingTitle')} / ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex',
  }
}

export default async function TrendingPage() {
  const c = await getTranslations('Categories')
  const t = await getTranslations('TrendingPage')

  return (
    <>
      {/* <Stocks className="relative mt-2 w-full pb-2 md:border-b" /> */}

      <PageHeader />

      <div className="relative mb-4 mt-2 w-full">
        <Categories />
      </div>

      <Breaking className="mb-3 mt-2">
        <BreakingTitle>{t('breaking')}</BreakingTitle>
        <BreakingLink href="#">
          Iran Secretly Warns U.S. Allies: Don’t Help Israel, or You’re Next
        </BreakingLink>
      </Breaking>

      <div className="grid grid-cols-12 md:gap-x-8">
        <section className="order-2 col-span-12 lg:col-span-4 xl:order-1 xl:col-span-3">
          <h2 className="mb-4 text-base uppercase tracking-wider">
            {t('latest')}
          </h2>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <Teaser key={index}>
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
                            <OptionMenuHideButton />
                          </OptionMenuItem>
                        </OptionMenuGroup>
                      </OptionMenuContent>
                    </OptionMenu>
                  </TeaserHeader>
                </TeaserContent>
              </Teaser>
            ))}
          </div>

          <Separator className="my-6 lg:hidden" />
        </section>

        <section className="order-1 col-span-12 lg:col-span-8 xl:order-2 xl:col-span-6">
          <h2 className="mb-4 text-base uppercase tracking-wider">
            {t('recommended')}
          </h2>

          <Link href="/lorem-ipsum">
            <Teaser>
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
                    You’re Next Ipsum
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
                          <OptionMenuHideButton />
                        </OptionMenuItem>
                      </OptionMenuGroup>
                    </OptionMenuContent>
                  </OptionMenu>
                </TeaserHeader>
              </TeaserContent>
            </Teaser>
          </Link>

          <Separator className="my-6 md:my-8" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <Teaser key={index} sponsored={index === 2}>
                <TeaserContent>
                  <TeaserHeader className="col-span-12 gap-2">
                    <TeaserTitle>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      amet consectetur adipisicing elit .
                    </TeaserTitle>
                    <TeaserList>
                      {index === 2 && (
                        <TeaserListItem>{t('sponsored')}</TeaserListItem>
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
                            <OptionMenuHideButton />
                          </OptionMenuItem>
                        </OptionMenuGroup>
                      </OptionMenuContent>
                    </OptionMenu>
                  </TeaserHeader>
                </TeaserContent>
              </Teaser>
            ))}
          </div>

          <Separator className="my-6 lg:hidden" />
        </section>

        <section className="order-3 col-span-12 xl:col-span-3">
          <Separator className="my-8 hidden lg:block xl:hidden" />

          <h2 className="mb-4 text-base uppercase tracking-wider">
            {t('mostPopular')}
          </h2>

          <div className="grid-col-1 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-1">
            {Array.from({ length: 7 }).map((_, index) => (
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
                            <OptionMenuHideButton />
                          </OptionMenuItem>
                        </OptionMenuGroup>
                      </OptionMenuContent>
                    </OptionMenu>
                  </TeaserHeader>
                </TeaserContent>
              </Teaser>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="mt-6 w-full sm:w-[280px] lg:mt-8 xl:w-full"
            >
              {t('loadMore')}
            </Button>
          </div>
        </section>
      </div>

      <Separator className="my-8 lg:my-10" />

      <section className="h-96 rounded-lg bg-[#f8f5ec] p-8">
        <h2 className="mb-4 text-base uppercase tracking-wider">
          This day in history
        </h2>
      </section>

      <Separator className="my-8 lg:my-10" />

      <section>
        <h2 className="mb-4 text-base uppercase tracking-wider">Technology</h2>

        <div className="grid grid-cols-12 md:gap-x-8">
          <div className="col-span-12 mb-6 lg:col-span-6 lg:mb-0 xl:col-span-6">
            <Link href="/lorem-ipsum">
              <Teaser>
                <TeaserContent>
                  <TeaserImage
                    src="https://images.unsplash.com/photo-1597701218190-ace198957ff6?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Photo by Drew Beamer"
                    priority={true}
                    ratio={16 / 9}
                    className="col-span-12 rounded-lg object-cover"
                  />
                  <TeaserHeader className="col-span-12 gap-4">
                    <TeaserTitle className="text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
                      Iran Secretly Warns U.S. Allies: Don’t Help Israel, or
                      You’re Next Ipsum
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
                            <OptionMenuHideButton />
                          </OptionMenuItem>
                        </OptionMenuGroup>
                      </OptionMenuContent>
                    </OptionMenu>
                  </TeaserHeader>
                </TeaserContent>
              </Teaser>
            </Link>
          </div>

          <div className="col-span-12 mb-6 lg:col-span-3 lg:mb-0 xl:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-1">
              {Array.from({ length: 2 }).map((_, index) => (
                <Teaser key={index}>
                  <TeaserContent className="gap-2">
                    <TeaserImage
                      src="https://images.unsplash.com/photo-1616970985306-275372fb7c74?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Photo by Drew Beamer"
                      priority={true}
                      ratio={16 / 9}
                      className="col-span-12 hidden rounded-lg object-cover lg:block"
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
                              <OptionMenuHideButton />
                            </OptionMenuItem>
                          </OptionMenuGroup>
                        </OptionMenuContent>
                      </OptionMenu>
                    </TeaserHeader>
                  </TeaserContent>
                </Teaser>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-1">
              {Array.from({ length: 2 }).map((_, index) => (
                <Teaser key={index}>
                  <TeaserContent className="gap-2">
                    <TeaserImage
                      src="https://images.unsplash.com/photo-1616970985306-275372fb7c74?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Photo by Drew Beamer"
                      priority={true}
                      ratio={16 / 9}
                      className="col-span-12 hidden rounded-lg object-cover lg:block"
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
                              <OptionMenuHideButton />
                            </OptionMenuItem>
                          </OptionMenuGroup>
                        </OptionMenuContent>
                      </OptionMenu>
                    </TeaserHeader>
                  </TeaserContent>
                </Teaser>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-8 lg:my-10" />

      <section className="grid grid-cols-12 gap-6 lg:gap-10">
        <div className="order-2 col-span-12 lg:order-1 lg:col-span-8 xl:col-span-9">
          <h2 className="mb-4 text-base uppercase tracking-wider">
            {t('news')}
          </h2>

          {Array.from({ length: 12 }).map((_, index) => (
            <Teaser key={index} className="mb-5 sm:mb-8 lg:mb-10">
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
                          <OptionMenuHideButton />
                        </OptionMenuItem>
                      </OptionMenuGroup>
                    </OptionMenuContent>
                  </OptionMenu>
                </TeaserHeader>
                <TeaserImage
                  className="h-36"
                  src="https://images.unsplash.com/photo-1728410994982-e376651ba722?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Photo by Drew Beamer"
                />
              </TeaserContent>
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
        </div>

        <div className="order-1 col-span-12 lg:order-2 lg:col-span-4 xl:col-span-3">
          <div className="sticky top-14 rounded-lg bg-secondary p-4">
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
              <Button className="my-2 w-full sm:w-[280px]">
                {t('showAllEpisodes')} <ExternalLink className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
