import { LogicPuzzle } from '@/@core/modules/logic-puzzle/entity/logic-puzzle.entity'
import { Badge } from '@/components/ui/badge'
import { FC } from 'react'

type TPuzzleInfo = {
  puzzle: LogicPuzzle
}

const PuzzleInfo: FC<TPuzzleInfo> = ({ puzzle }) => {
  return (
    <div className={'flex-1 flex flex-col space-y-4'}>
      <header className="flex justify-between items-center">
        <h1>{puzzle.title}</h1>
        <Badge variant={'default'}>{puzzle.difficulty}</Badge>
      </header>
    </div>
  )
}

export default PuzzleInfo
