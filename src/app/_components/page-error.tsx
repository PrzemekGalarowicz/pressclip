import * as React from 'react'

export function PageError(
  props: {
    title?: string
  } & React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center rounded-lg p-4 text-center text-gray-600 dark:text-gray-300"
      {...props}
    >
      <h1 className="mb-6 font-serif text-xl font-medium text-black dark:text-white md:text-2xl">
        {props.title}
      </h1>

      <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
        {props.children}
      </p>
    </div>
  )
}
