'use client'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { X } from 'lucide-react'
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
        <ul className="justify-startflex mt-2 flex flex-wrap items-start gap-1 p-1">
          {selectedOptions.map((option, index) => (
            <li key={index}>
              <Badge
                variant="outline"
                className="gap-2 pl-1.5 pr-0.5 font-normal"
              >
                <span className="max-w-[100px] truncate text-muted-foreground">
                  {option}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className="size-4"
                  onClick={() => onRemove(index)}
                >
                  <X className="!size-3 text-muted-foreground" />
                </Button>
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
