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
import { Gauge, Home } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

const AppSidebar: FC = () => {
  return (
    <Sidebar>
      <SidebarContent>
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
