import { Separator } from '@/components/ui/separator'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { FC, ReactNode } from 'react'

import Header from './components/Header'
import AppSidebar from './components/Sidebar'
import { ThemeProvider } from './context/ThemeProvider'
import './globals.css'

type TRootLayout = {
  children: ReactNode
}

const RootLayout: FC<TRootLayout> = ({ children }) => {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <div className="flex w-screen h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-1 flex flex-col">
                <Header />
                <Separator className="mb-2" />
                <section className="flex-1 px-4 flex pb-4">{children}</section>
              </main>
              <Toaster closeButton position="top-right" expand richColors />
            </SidebarProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
