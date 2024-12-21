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
        include: false,
        exclude: false,
      },
      {
        icon: Handshake,
        label: t('business'),
        include: false,
        exclude: false,
      },
      {
        icon: Microscope,
        label: t('science'),
        include: false,
        exclude: false,
      },
      {
        icon: Cpu,
        label: t('technology'),
        include: false,
        exclude: false,
      },
      {
        icon: HeartPulse,
        label: t('health'),
        include: false,
        exclude: false,
      },
      {
        icon: Trophy,
        label: t('sports'),
        include: false,
        exclude: false,
      },
      {
        icon: FerrisWheel,
        label: t('entertainment'),
        include: false,
        exclude: false,
      },
    ]
  }, [t])

  return defaultCategories
}

export function useDefaultCountries() {
  const t = useTranslations('DefaultFilters')

  const defaultCountries = React.useMemo(() => {
    return [
      { label: t('ar'), icon: 'ar', include: null, exclude: null },
      { label: t('au'), icon: 'au', include: null, exclude: null },
      { label: t('at'), icon: 'at', include: null, exclude: null },
      { label: t('be'), icon: 'be', include: null, exclude: null },
      { label: t('br'), icon: 'br', include: null, exclude: null },
      { label: t('bg'), icon: 'bg', include: null, exclude: null },
      { label: t('ca'), icon: 'ca', include: null, exclude: null },
      { label: t('cn'), icon: 'cn', include: null, exclude: null },
      { label: t('co'), icon: 'co', include: null, exclude: null },
      { label: t('cz'), icon: 'cz', include: null, exclude: null },
      { label: t('eg'), icon: 'eg', include: null, exclude: null },
      { label: t('fr'), icon: 'fr', include: null, exclude: null },
      { label: t('de'), icon: 'de', include: null, exclude: null },
      { label: t('gr'), icon: 'gr', include: null, exclude: null },
      { label: t('hk'), icon: 'hk', include: null, exclude: null },
      { label: t('hu'), icon: 'hu', include: null, exclude: null },
      { label: t('in'), icon: 'in', include: null, exclude: null },
      { label: t('id'), icon: 'id', include: null, exclude: null },
      { label: t('ie'), icon: 'ie', include: null, exclude: null },
      { label: t('il'), icon: 'il', include: null, exclude: null },
      { label: t('it'), icon: 'it', include: null, exclude: null },
      { label: t('jp'), icon: 'jp', include: null, exclude: null },
      { label: t('lv'), icon: 'lv', include: null, exclude: null },
      { label: t('lt'), icon: 'lt', include: null, exclude: null },
      { label: t('my'), icon: 'my', include: null, exclude: null },
      { label: t('mx'), icon: 'mx', include: null, exclude: null },
      { label: t('ma'), icon: 'ma', include: null, exclude: null },
      { label: t('nl'), icon: 'nl', include: null, exclude: null },
      { label: t('nz'), icon: 'nz', include: null, exclude: null },
      { label: t('ng'), icon: 'ng', include: null, exclude: null },
      { label: t('no'), icon: 'no', include: null, exclude: null },
      { label: t('ph'), icon: 'ph', include: null, exclude: null },
      { label: t('pl'), icon: 'pl', include: null, exclude: null },
      { label: t('pt'), icon: 'pt', include: null, exclude: null },
      { label: t('ro'), icon: 'ro', include: null, exclude: null },
      { label: t('sa'), icon: 'sa', include: null, exclude: null },
      { label: t('rs'), icon: 'rs', include: null, exclude: null },
      { label: t('sg'), icon: 'sg', include: null, exclude: null },
      { label: t('sk'), icon: 'sk', include: null, exclude: null },
      { label: t('si'), icon: 'si', include: null, exclude: null },
      { label: t('za'), icon: 'za', include: null, exclude: null },
      { label: t('kr'), icon: 'kr', include: null, exclude: null },
      { label: t('se'), icon: 'se', include: null, exclude: null },
      { label: t('ch'), icon: 'ch', include: null, exclude: null },
      { label: t('tw'), icon: 'tw', include: null, exclude: null },
      { label: t('th'), icon: 'th', include: null, exclude: null },
      { label: t('tr'), icon: 'tr', include: null, exclude: null },
      { label: t('ae'), icon: 'ae', include: null, exclude: null },
      { label: t('ua'), icon: 'ua', include: null, exclude: null },
      { label: t('gb'), icon: 'gb', include: null, exclude: null },
      { label: t('us'), icon: 'us', include: null, exclude: null },
      { label: t('ve'), icon: 've', include: null, exclude: null },
    ]
  }, [t])

  return defaultCountries
}

export function useDefaultLanguages() {
  const t = useTranslations('DefaultFilters')

  const defaultLanguages = React.useMemo(() => {
    return [
      { label: t('english'), icon: 'uk', include: null, exclude: null },
      { label: t('arabic'), icon: 'sa', include: null, exclude: null },
      { label: t('bengali'), icon: 'bd', include: null, exclude: null },
      { label: t('bulgarian'), icon: 'bg', include: null, exclude: null },
      {
        label: t('chinese'),
        icon: 'cn',
        include: false,
        exclude: false,
      },
      { label: t('croatian'), icon: 'hr', include: null, exclude: null },
      { label: t('czech'), icon: 'cz', include: null, exclude: null },
      { label: t('danish'), icon: 'dk', include: null, exclude: null },
      { label: t('estonian'), icon: 'ee', include: null, exclude: null },
      { label: t('finnish'), icon: 'fi', include: null, exclude: null },
      { label: t('french'), icon: 'fr', include: null, exclude: null },
      { label: t('greek'), icon: 'gr', include: null, exclude: null },
      { label: t('gujarati'), icon: 'in', include: null, exclude: null },
      { label: t('hebrew'), icon: 'il', include: null, exclude: null },
      { label: t('hindi'), icon: 'in', include: null, exclude: null },
      { label: t('indonesian'), icon: 'id', include: null, exclude: null },
      { label: t('japanese'), icon: 'jp', include: null, exclude: null },
      { label: t('kannada'), icon: 'in', include: null, exclude: null },
      { label: t('korean'), icon: 'kr', include: null, exclude: null },
      { label: t('lithuanian'), icon: 'lt', include: null, exclude: null },
      { label: t('latvian'), icon: 'lv', include: null, exclude: null },
      { label: t('malayalam'), icon: 'in', include: null, exclude: null },
      { label: t('marathi'), icon: 'in', include: null, exclude: null },
      { label: t('dutch'), icon: 'nl', include: null, exclude: null },
      { label: t('german'), icon: 'de', include: null, exclude: null },
      { label: t('norwegian'), icon: 'no', include: null, exclude: null },
      { label: t('persian'), icon: 'ir', include: null, exclude: null },
      { label: t('polish'), icon: 'pl', include: null, exclude: null },
      { label: t('portuguese'), icon: 'pt', include: null, exclude: null },
      { label: t('russian'), icon: 'ru', include: null, exclude: null },
      { label: t('romanian'), icon: 'ro', include: null, exclude: null },
      { label: t('serbian'), icon: 'rs', include: null, exclude: null },
      { label: t('slovak'), icon: 'sk', include: null, exclude: null },
      { label: t('slovenian'), icon: 'si', include: null, exclude: null },
      { label: t('swahili'), icon: 'ke', include: null, exclude: null },
      { label: t('swedish'), icon: 'se', include: null, exclude: null },
      { label: t('thai'), icon: 'th', include: null, exclude: null },
      { label: t('tamil'), icon: 'in', include: null, exclude: null },
      { label: t('telugu'), icon: 'in', include: null, exclude: null },
      { label: t('turkish'), icon: 'tr', include: null, exclude: null },
      { label: t('ukrainian'), icon: 'ua', include: null, exclude: null },
      { label: t('urdu'), icon: 'pk', include: null, exclude: null },
      { label: t('hungarian'), icon: 'hu', include: null, exclude: null },
      { label: t('vietnamese'), icon: 'vn', include: null, exclude: null },
      { label: t('italian'), icon: 'it', include: null, exclude: null },
    ]
  }, [t])

  return defaultLanguages
}

export function useDefaultSources() {
  const defaultSources = React.useMemo(() => {
    return [
      { label: 'Google News', icon: 'google', include: null, exclude: null },
      { label: 'BBC News', icon: 'bbc', include: null, exclude: null },
      { label: 'CNN News', icon: 'cnn', include: null, exclude: null },
    ]
  }, [])

  return defaultSources
}
