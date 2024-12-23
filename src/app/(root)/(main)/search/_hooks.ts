'use client'

import {
  Cpu,
  FerrisWheel,
  Handshake,
  HeartPulse,
  Microscope,
  Newspaper,
  Trophy,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export function useDefaultCategories() {
  const t = useTranslations('DefaultFilters')

  const defaultCategories = React.useMemo(() => {
    return [
      {
        icon: Newspaper,
        label: t('general'),
        selected: false,
      },
      {
        icon: Handshake,
        label: t('business'),
        selected: false,
      },
      {
        icon: Microscope,
        label: t('science'),
        selected: false,
      },
      {
        icon: Cpu,
        label: t('technology'),
        selected: false,
      },
      {
        icon: HeartPulse,
        label: t('health'),
        selected: false,
      },
      {
        icon: Trophy,
        label: t('sports'),
        selected: false,
      },
      {
        icon: FerrisWheel,
        label: t('entertainment'),
        selected: false,
      },
    ]
  }, [t])

  return defaultCategories
}

export function useDefaultCountries() {
  const t = useTranslations('DefaultFilters')

  const defaultCountries = React.useMemo(() => {
    return [
      { label: t('ar'), icon: 'ar', selected: false },
      { label: t('au'), icon: 'au', selected: false },
      { label: t('at'), icon: 'at', selected: false },
      { label: t('be'), icon: 'be', selected: false },
      { label: t('br'), icon: 'br', selected: false },
      { label: t('bg'), icon: 'bg', selected: false },
      { label: t('ca'), icon: 'ca', selected: false },
      { label: t('cn'), icon: 'cn', selected: false },
      { label: t('co'), icon: 'co', selected: false },
      { label: t('cz'), icon: 'cz', selected: false },
      { label: t('eg'), icon: 'eg', selected: false },
      { label: t('fr'), icon: 'fr', selected: false },
      { label: t('de'), icon: 'de', selected: false },
      { label: t('gr'), icon: 'gr', selected: false },
      { label: t('hk'), icon: 'hk', selected: false },
      { label: t('hu'), icon: 'hu', selected: false },
      { label: t('in'), icon: 'in', selected: false },
      { label: t('id'), icon: 'id', selected: false },
      { label: t('ie'), icon: 'ie', selected: false },
      { label: t('il'), icon: 'il', selected: false },
      { label: t('it'), icon: 'it', selected: false },
      { label: t('jp'), icon: 'jp', selected: false },
      { label: t('lv'), icon: 'lv', selected: false },
      { label: t('lt'), icon: 'lt', selected: false },
      { label: t('my'), icon: 'my', selected: false },
      { label: t('mx'), icon: 'mx', selected: false },
      { label: t('ma'), icon: 'ma', selected: false },
      { label: t('nl'), icon: 'nl', selected: false },
      { label: t('nz'), icon: 'nz', selected: false },
      { label: t('ng'), icon: 'ng', selected: false },
      { label: t('no'), icon: 'no', selected: false },
      { label: t('ph'), icon: 'ph', selected: false },
      { label: t('pl'), icon: 'pl', selected: false },
      { label: t('pt'), icon: 'pt', selected: false },
      { label: t('ro'), icon: 'ro', selected: false },
      { label: t('sa'), icon: 'sa', selected: false },
      { label: t('rs'), icon: 'rs', selected: false },
      { label: t('sg'), icon: 'sg', selected: false },
      { label: t('sk'), icon: 'sk', selected: false },
      { label: t('si'), icon: 'si', selected: false },
      { label: t('za'), icon: 'za', selected: false },
      { label: t('kr'), icon: 'kr', selected: false },
      { label: t('se'), icon: 'se', selected: false },
      { label: t('ch'), icon: 'ch', selected: false },
      { label: t('tw'), icon: 'tw', selected: false },
      { label: t('th'), icon: 'th', selected: false },
      { label: t('tr'), icon: 'tr', selected: false },
      { label: t('ae'), icon: 'ae', selected: false },
      { label: t('ua'), icon: 'ua', selected: false },
      { label: t('gb'), icon: 'gb', selected: false },
      { label: t('us'), icon: 'us', selected: false },
      { label: t('ve'), icon: 've', selected: false },
    ]
  }, [t])

  return defaultCountries
}

export function useDefaultLanguages() {
  const t = useTranslations('DefaultFilters')

  const defaultLanguages = React.useMemo(() => {
    return [
      { label: t('english'), icon: 'uk', selected: false },
      { label: t('arabic'), icon: 'sa', selected: false },
      { label: t('bengali'), icon: 'bd', selected: false },
      { label: t('bulgarian'), icon: 'bg', selected: false },
      {
        label: t('chinese'),
        icon: 'cn',
        selected: false,
      },
      { label: t('croatian'), icon: 'hr', selected: false },
      { label: t('czech'), icon: 'cz', selected: false },
      { label: t('danish'), icon: 'dk', selected: false },
      { label: t('estonian'), icon: 'ee', selected: false },
      { label: t('finnish'), icon: 'fi', selected: false },
      { label: t('french'), icon: 'fr', selected: false },
      { label: t('greek'), icon: 'gr', selected: false },
      { label: t('gujarati'), icon: 'in', selected: false },
      { label: t('hebrew'), icon: 'il', selected: false },
      { label: t('hindi'), icon: 'in', selected: false },
      { label: t('indonesian'), icon: 'id', selected: false },
      { label: t('japanese'), icon: 'jp', selected: false },
      { label: t('kannada'), icon: 'in', selected: false },
      { label: t('korean'), icon: 'kr', selected: false },
      { label: t('lithuanian'), icon: 'lt', selected: false },
      { label: t('latvian'), icon: 'lv', selected: false },
      { label: t('malayalam'), icon: 'in', selected: false },
      { label: t('marathi'), icon: 'in', selected: false },
      { label: t('dutch'), icon: 'nl', selected: false },
      { label: t('german'), icon: 'de', selected: false },
      { label: t('norwegian'), icon: 'no', selected: false },
      { label: t('persian'), icon: 'ir', selected: false },
      { label: t('polish'), icon: 'pl', selected: false },
      { label: t('portuguese'), icon: 'pt', selected: false },
      { label: t('russian'), icon: 'ru', selected: false },
      { label: t('romanian'), icon: 'ro', selected: false },
      { label: t('serbian'), icon: 'rs', selected: false },
      { label: t('slovak'), icon: 'sk', selected: false },
      { label: t('slovenian'), icon: 'si', selected: false },
      { label: t('swahili'), icon: 'ke', selected: false },
      { label: t('swedish'), icon: 'se', selected: false },
      { label: t('thai'), icon: 'th', selected: false },
      { label: t('tamil'), icon: 'in', selected: false },
      { label: t('telugu'), icon: 'in', selected: false },
      { label: t('turkish'), icon: 'tr', selected: false },
      { label: t('ukrainian'), icon: 'ua', selected: false },
      { label: t('urdu'), icon: 'pk', selected: false },
      { label: t('hungarian'), icon: 'hu', selected: false },
      { label: t('vietnamese'), icon: 'vn', selected: false },
      { label: t('italian'), icon: 'it', selected: false },
    ]
  }, [t])

  return defaultLanguages
}

export function useDefaultSources() {
  const defaultSources = React.useMemo(() => {
    return [
      {
        label: 'Google News',
        icon: 'google',
        selected: false,
        url: 'https://news.google.com',
        language: 'en',
        country: 'us',
      },
      {
        label: 'BBC News',
        icon: 'bbc',
        selected: false,
        url: 'https://www.bbc.com/news',
        language: 'en',
        country: 'gb',
      },
      {
        label: 'CNN News',
        icon: 'cnn',
        selected: false,
        url: 'https://www.cnn.com',
        language: 'en',
        country: 'us',
      },
    ]
  }, [])

  return defaultSources
}
