import { Spinner } from './spinner'
import { cn } from '@/lib/utils'
import * as React from 'react'

import { Button, ButtonProps } from '@/components/ui/button'

export const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  {
    loading?: boolean
  } & ButtonProps
>((props, ref) => (
  <Button
    ref={ref}
    type="submit"
    disabled={props.disabled || props.loading}
    className={cn(props.className)}
    {...props}
  >
    {props.loading && <Spinner className="mr-3" />} {props.children}
  </Button>
))

SubmitButton.displayName = 'SubmitButton'
