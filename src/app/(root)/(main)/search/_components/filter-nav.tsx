import { cn } from '@/lib/utils'

import { Button, ButtonProps } from '@/components/ui/button'

export function FilterNav({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'ul'>) {
  return (
    <ul
      className={cn(
        'mt-2 flex w-full flex-wrap items-center justify-center gap-2',
        className
      )}
      {...props}
    >
      {children}
    </ul>
  )
}

export function FilterNavItem({
  className,
  children,
  active,
  ...props
}: Omit<ButtonProps, 'variant'> & { active: boolean }) {
  return (
    <li>
      <Button
        variant={active ? 'secondary' : 'outline'}
        className={cn('border text-muted-foreground', className)}
        {...props}
      >
        {children}
      </Button>
    </li>
  )
}
