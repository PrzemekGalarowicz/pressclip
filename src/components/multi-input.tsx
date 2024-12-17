'use client'

import { BadgeList, BadgeListItem } from './badge-list'
import { Input } from './ui/input'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

interface MultiInputProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'onChange'> {
  selectedOptions: string[]
  onCheckedChange: (badge: string[]) => void
}

export function MultiInput({
  selectedOptions = [],
  type = 'text',
  placeholder = 'Type and press Enter or add a comma...',
  ...props
}: MultiInputProps) {
  const [value, setValue] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      onAdd((event.target as HTMLInputElement).value)
    }
    if (props.onKeyDown) {
      props.onKeyDown(event)
    }
  }

  const onAdd = (value: string) => {
    const trimmedValue: string | undefined = value?.toString().trim()
    if (trimmedValue && !selectedOptions.includes(trimmedValue)) {
      const updatedSelectedOptions = [...selectedOptions, trimmedValue].map(
        (option) => option.replaceAll(',', '')
      )
      props.onCheckedChange(updatedSelectedOptions)
      setValue('')
    }
  }

  const onRemove = (indexToRemove: number) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (_, index) => index !== indexToRemove
    )
    props.onCheckedChange(updatedSelectedOptions)
    setValue('')
  }

  return (
    <>
      <Input
        {...props}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {Array.isArray(selectedOptions) && !!selectedOptions.length && (
        <BadgeList className="justify-startflex mt-2 items-start">
          {selectedOptions.map((option, index) => (
            <BadgeListItem key={index} onRemove={() => onRemove(index)}>
              {option}
            </BadgeListItem>
          ))}
        </BadgeList>
      )}
    </>
  )
}
