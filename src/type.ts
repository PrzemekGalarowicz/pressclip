export type FilterType = {
  icon: React.ElementType | string
  label: string
  selected: boolean
}

export type FilterSourceType = FilterType & {
  url: string
  language: string
  country: string
}

export type FilterLanguageType = FilterType & {
  code: string
}

export type FilterLabelType =
  | 'categories'
  | 'sources'
  | 'countries'
  | 'languages'

export type FilterRecordType = Record<FilterLabelType, FilterType[]>
