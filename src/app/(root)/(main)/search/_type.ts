export type FilterType = {
  icon: React.ElementType | string
  label: string
  include: boolean | null
  exclude: boolean | null
}

export type FilterActionType = 'include' | 'exclude'
