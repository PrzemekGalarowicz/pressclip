import { Spinner } from './spinner'
import { cn } from '@/lib/utils'
import * as React from 'react'

export function Loading(props: {
  fixed?: boolean
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center gap-4 text-sm',
        {
          'fixed bottom-0 left-0 right-0 top-0 z-50 bg-white opacity-90 dark:bg-black':
            props.fixed,
        }
      )}
    >
      <Spinner />
      {props.children}
    </div>
  )
}
