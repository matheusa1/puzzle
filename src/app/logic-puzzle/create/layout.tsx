import { FC } from 'react'

import { PuzzleInfoProvider } from './context/puzzleInfoContext'

type TLayout = {
  children: React.ReactNode
}

const PuzzleLayout: FC<TLayout> = ({ children }) => {
  return <PuzzleInfoProvider>{children}</PuzzleInfoProvider>
}

export default PuzzleLayout
