import { Logo } from '@/components/logo'

export default async function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <Logo href="/" />
      <span className="text-sm text-muted-foreground">Soon...</span>
    </div>
  )
}
