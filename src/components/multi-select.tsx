'use client'

import { Badge } from './ui/badge'
import { Button, ButtonProps } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@/lib/utils'
import { ChevronDown, XCircle } from 'lucide-react'

interface MultiSelectProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>
  className?: string
  placeholder?: string
  options: { label: string; icon: string; include: null; exclude: null }[]
  selectedOptions?: string[]
  onCheckedChange: (option: string[]) => void
}

export function MultiSelect({
  ref,
  className,
  placeholder,
  options,
  selectedOptions = [],
  ...props
}: MultiSelectProps) {
  const onCheckChange = (value: string) => {
    const trimmedValue: string | undefined = value?.toString().trim()
    if (!trimmedValue) return
    if (selectedOptions.includes(trimmedValue)) onRemove(trimmedValue)
    else onAdd(trimmedValue)
  }

  const onAdd = (value: string) => {
    props.onCheckedChange([...selectedOptions, value])
  }

  const onRemove = (value: string) => {
    props.onCheckedChange(selectedOptions.filter((option) => option !== value))
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            className={cn(
              'flex w-full justify-start text-muted-foreground hover:bg-white hover:text-muted-foreground dark:hover:bg-black',
              className
            )}
            variant="outline"
            {...props}
          >
            {selectedOptions.length > 1
              ? `${selectedOptions[0]} (+${selectedOptions.length - 1})`
              : selectedOptions?.[0] || placeholder || 'Select'}
            <ChevronDown className="ml-auto text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="start" className="w-64">
          <ScrollArea
            className={cn({
              'h-[200px]': options.length >= 6,
            })}
          >
            {options?.map(({ label }) => (
              <DropdownMenuCheckboxItem
                key={label}
                checked={selectedOptions?.includes(label)}
                onCheckedChange={() => onCheckChange(label)}
              >
                {label}
              </DropdownMenuCheckboxItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      {Array.isArray(selectedOptions) && !!selectedOptions.length && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedOptions.map((option, index) => (
            <Badge key={index} className="pr-1">
              <span className="... block max-w-[200px] truncate">{option}</span>
              <button
                type="button"
                className="ml-2"
                onClick={() => onRemove(option)}
              >
                <XCircle className="text-muted-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </>
  )
}
