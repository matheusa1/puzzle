'use client'

import { LogicPuzzle } from '@/@core/modules/logic-puzzle/entity/logic-puzzle.entity'
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

  const puzzle = useMemo(
    () =>
      new LogicPuzzle({
        title: title,
        description: description,
        image: image,
        difficulty: difficulty,
      }),
    [title, description, image, difficulty],
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
        <PuzzleInfo puzzle={puzzle} />
      </Card>
    </div>
  )
}

export default Create
