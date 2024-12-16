'use client'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { XCircle } from 'lucide-react'
import React, { ChangeEvent, KeyboardEvent, forwardRef, useState } from 'react'

interface MultiInputProps
  extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  selectedOptions: string[]
  onCheckedChange: (badge: string[]) => void
}

export const MultiInput = forwardRef<HTMLInputElement, MultiInputProps>(
  (
    {
      selectedOptions = [],
      type = 'text',
      placeholder = 'Type and press Enter or add a comma...',
      ...props
    },
    ref
  ) => {
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
          ref={ref}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />

        {Array.isArray(selectedOptions) && !!selectedOptions.length && (
          <div className="mt-2 flex flex-wrap items-start justify-start gap-1">
            {selectedOptions.map((option, index) => (
              <Badge
                key={index}
                className="gap-2 border-muted-foreground/50 pr-0.5 font-normal"
                variant="outline"
              >
                <span className="max-w-[100px] truncate">{option}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-4"
                  onClick={() => onRemove(index)}
                >
                  <XCircle className="!size-4 text-muted-foreground" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </>
    )
  }
)

MultiInput.displayName = 'MultiInput'
