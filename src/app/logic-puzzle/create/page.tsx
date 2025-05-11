'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FC } from 'react'

import PuzzleInfo from '../components/LogicPuzzleInfo'
import LogicPuzzleForm from './components/LogicPuzzleForm'
import { usePuzzleInfoContext } from './context/puzzleInfoContext'

const Create: FC = () => {
  const { puzzleInfo } = usePuzzleInfoContext()

  return (
    <div className={'@container flex-1 flex space-x-4'}>
      <Card className="@md:w-1/2 h-full">
        <CardHeader>
          <CardTitle>Crie um novo puzzle</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar um novo puzzle.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <LogicPuzzleForm />
        </CardContent>
      </Card>
      <Card className="@md:w-1/2 h-full">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Exemplo de como ficará o puzzle</CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          {puzzleInfo && <PuzzleInfo puzzle={puzzleInfo} />}
        </CardContent>
      </Card>
    </div>
  )
}

export default Create
