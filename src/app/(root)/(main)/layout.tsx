import { AppSidebar } from './_components/app-sidebar'
import { MobileHeader } from './_components/mobile-header'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MobileHeader className="flex md:hidden" />
      <AppSidebar />
      <main className="w-full flex-1 px-2 pb-10 md:pb-4">{children}</main>
    </SidebarProvider>
  )
}
