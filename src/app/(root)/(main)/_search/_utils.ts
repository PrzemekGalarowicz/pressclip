'use client'

import { FilterLabelType, FilterRecordType, FilterType } from './_type'
import { FilterActionType } from './_type'

export function updateFilters(
  prevFilters: FilterRecordType,
  filterName: FilterLabelType
) {
  return {
    ...prevFilters,
    [filterName]: prevFilters[filterName],
  }
}

export function onInclude(filters: FilterType[], filter: FilterType) {
  return filters.map((f) => {
    const isMatch = f.label === filter.label
    return {
      ...f,
      include: isMatch ? true : f.include,
      exclude: isMatch ? false : f.exclude,
    }
  })
}

export function onExclude(filters: FilterType[], filter: FilterType) {
  return filters.map((f) => {
    const isMatch = f.label === filter.label
    return {
      ...f,
      include: isMatch ? false : f.include,
      exclude: isMatch ? true : f.exclude,
    }
  })
}

export function onClearAction(filters: FilterType[]) {
  return filters.map((f) => ({
    ...f,
    include: null,
    exclude: null,
  }))
}

export function isDisabled(filter: FilterType, actionType: FilterActionType) {
  return filter[actionType] === null ? undefined : filter[actionType]
}
