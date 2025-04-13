import { globalRoutes } from '@/app/routes'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

const AppSidebar: FC = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={globalRoutes.home.routes.index.path}>
                    <Home />
                    <span>{globalRoutes.home.routes.index.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Puzzles</SidebarGroupLabel>
            <SidebarMenu>
              {globalRoutes.puzzles.map((puzzle) => (
                <SidebarMenuItem key={puzzle.name}>
                  <SidebarMenuButton asChild>
                    <Link href={puzzle.routes.index.path}>
                      <puzzle.icon className="size-4" />
                      <span>{puzzle.routes.index.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
