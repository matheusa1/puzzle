'use client'

import { TLogicPuzzle } from '@/@core/modules/logic-puzzle/entity/logic-puzzle.entity'
import {
  TCreateLogicPuzzleSchema,
  createLogicPuzzleSchema,
} from '@/@core/modules/logic-puzzle/schema/create.schema'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import PuzzleInfo from '../components/LogicPuzzleInfo'
import LogicPuzzleForm from './components/LogicPuzzleForm'

const Create: FC = () => {
  const form = useForm<TCreateLogicPuzzleSchema>({
    resolver: zodResolver(createLogicPuzzleSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      difficulty: undefined,
    },
  })

  const title = form.watch('title')
  const description = form.watch('description')
  const image = form.watch('image')
  const difficulty = form.watch('difficulty')
  const hints = form.watch('hint')

  const puzzle: TLogicPuzzle = useMemo(
    () => ({
      createdAt: new Date(),
      updatedAt: new Date(),
      title,
      description,
      image,
      difficulty,
      id: 'puzzle-id',
      hint: hints.map((hint, index) => ({
        id: index.toString(),
        logicPuzzleId: 'puzzle-id',
        order: hint.order,
        text: hint.text,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    }),
    [title, description, image, difficulty, hints],
  )

  return (
    <div className={'@container flex-1 flex space-x-4'}>
      <Card className="@md:w-1/2 h-full">
        <CardHeader>
          <CardTitle>Crie um novo puzzle</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar um novo puzzle.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LogicPuzzleForm form={form} />
        </CardContent>
      </Card>
      <Card className="@md:w-1/2 h-full">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Exemplo de como ficará o puzzle</CardDescription>
        </CardHeader>
        <CardContent>
          <PuzzleInfo puzzle={puzzle} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Create
