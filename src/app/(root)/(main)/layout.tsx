import { AppSidebar } from './_components/app-sidebar'
import { MobileHeader } from './_components/mobile-header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MobileHeader className="flex md:hidden" />
      <AppSidebar />
      <main>
        <SidebarTrigger className="hidden md:flex" />
        {children}
      </main>
    </SidebarProvider>
  )
}
