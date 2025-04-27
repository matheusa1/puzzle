import { difficulty as difficultyRegistry } from '@/@core/modules/difficulty/infra/registry'
import { ILogicPuzzle } from '@/@core/modules/logic-puzzle/entity/logic-puzzle.entity'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { FC, useMemo } from 'react'

type TPuzzleInfo = {
  puzzle: ILogicPuzzle
}

const PuzzleInfo: FC<TPuzzleInfo> = ({ puzzle }) => {
  const difficulty = useMemo(
    () =>
      puzzle.difficulty
        ? difficultyRegistry.get.execute(puzzle.difficulty)
        : undefined,
    [puzzle],
  )

  return (
    <div className={'flex-1 flex flex-col space-y-8'}>
      <header className="flex justify-between items-center">
        <h1 className="h1">{puzzle.title}</h1>
        {difficulty && <Badge variant={'default'}>{difficulty.label}</Badge>}
      </header>
      <div className="w-full flex justify-center">
        {puzzle.image && (
          <div className="w-1/2">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={puzzle.image}
                fill
                alt="Image"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        )}
      </div>
      <div className="w-full">
        <p className="p">{puzzle.description}</p>
      </div>
      {puzzle.hint && (
        <div className="w-full flex flex-col space-y-3">
          {puzzle.hint?.map((hint) => (
            <div key={hint.id} className="flex items-start space-x-4">
              <h4 className="h4">{hint.order}.</h4>
              <p className="">{hint.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PuzzleInfo
