export type FilterType = {
  icon: React.ElementType | string
  label: string
  selected: boolean
}

export type FilterLabelType =
  | 'categories'
  | 'sources'
  | 'countries'
  | 'languages'

export type FilterRecordType = Record<FilterLabelType, FilterType[]>