import { logicPuzzleRoutes } from '@/app/puzzle/logic/routes'
import { globalRoutes } from '@/app/routes'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { FC } from 'react'

import { ThemeToggle } from './components/ThemeToggle'

const Header: FC = () => {
  return (
    <div className={'flex px-4 w-full py-2 justify-between'}>
      <div className="flex space-x-4 items-center">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={globalRoutes.home.routes.index.path}>
                {globalRoutes.home.routes.index.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={logicPuzzleRoutes.routes.index.path}>
                {logicPuzzleRoutes.routes.index.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbLink href={logicPuzzleRoutes.routes.create.path}>
              {logicPuzzleRoutes.routes.create.name}
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <ThemeToggle />
    </div>
  )
}

export default Header
