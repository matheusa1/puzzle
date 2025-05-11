import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FC } from 'react'

import { logicPuzzleRoutes } from './routes'

const logic: FC = () => {
  return (
    <div className={''}>
      <h1>logic</h1>
      <Button asChild>
        <Link href={logicPuzzleRoutes.routes.create.path}>
          {logicPuzzleRoutes.routes.create.name}
        </Link>
      </Button>
    </div>
  )
}

export default logic
