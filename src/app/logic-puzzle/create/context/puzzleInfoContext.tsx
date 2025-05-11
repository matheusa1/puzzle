'use client'

import { TLogicPuzzle } from '@/@core/modules/logic-puzzle/entity/logic-puzzle.entity'
import { createContext, useContext, useMemo, useState } from 'react'

type TPuzzleInfoContext = {
  puzzleInfo?: TLogicPuzzle
  setPuzzleInfo: React.Dispatch<React.SetStateAction<TLogicPuzzle>>
}

const PuzzleInfoContext = createContext({} as TPuzzleInfoContext)

export const PuzzleInfoProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [puzzleInfo, setPuzzleInfo] = useState<TLogicPuzzle>({
    id: '',
    title: '',
    description: '',
    image: '',
    difficulty: 'easy',
    createdAt: new Date(),
    updatedAt: new Date(),
    hint: [],
  })

  const values: TPuzzleInfoContext = useMemo(
    () => ({
      puzzleInfo,
      setPuzzleInfo,
    }),
    [puzzleInfo],
  )

  return (
    <PuzzleInfoContext.Provider value={values}>
      {children}
    </PuzzleInfoContext.Provider>
  )
}

export const usePuzzleInfoContext = () => {
  const context = useContext(PuzzleInfoContext)

  if (!context) {
    throw new Error(
      'usePuzzleInfoContext must be used within a PuzzleInfoProvider',
    )
  }

  return context
}
