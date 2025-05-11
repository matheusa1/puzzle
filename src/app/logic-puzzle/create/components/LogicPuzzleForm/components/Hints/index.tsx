'use client'

import {
  TCreateHintNoOrderSchema,
  createHintNoOrderSchema,
} from '@/@core/modules/hint/schema/create.schema'
import { usePuzzleInfoContext } from '@/app/logic-puzzle/create/context/puzzleInfoContext'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { randomUUID } from 'crypto'
import { FC, useEffect } from 'react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import FormStepsFooter from '../FormStepsFooter'
import { TFormStepProps } from '../formSteps'

const Hints: FC<TFormStepProps> = ({ formStep, setFormStep, steps }) => {
  const { setPuzzleInfo, puzzleInfo } = usePuzzleInfoContext()

  const [hints, setHints] = useState<TCreateHintNoOrderSchema[]>([])

  const form = useForm<TCreateHintNoOrderSchema>({
    resolver: zodResolver(createHintNoOrderSchema),
    defaultValues: {
      text: '',
    },
  })

  const onSubmit = (data: TCreateHintNoOrderSchema) => {
    console.log('data', data)
    setHints((prev) => [...prev, data])
    setPuzzleInfo((prev) => ({
      ...prev,
      hint: [
        ...(prev?.hint ?? []),
        {
          id: (prev?.hint?.length ? prev.hint.length + 1 : 1).toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          order: prev?.hint?.length ? prev.hint.length + 1 : 1,
          logicPuzzleId: prev?.id,
          text: data.text,
        },
      ],
    }))
    form.reset()
  }

  useEffect(() => {
    setHints(puzzleInfo?.hint ?? [])
  }, [puzzleInfo])

  return (
    <FormProvider {...form}>
      <div className="h-full flex flex-col space-y-8">
        <form
          className="flex flex-col space-y-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Texto</FormLabel>
                <FormControl>
                  <Textarea placeholder="Texto da dica..." {...field} />
                </FormControl>
                <FormDescription>
                  Texto da dica. Ex: &quot;Texto da dica...&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <strong>Adicionar</strong>
          </Button>
        </form>
        <div className="flex-1">
          {hints.map((hint, index) => (
            <div key={index} className="p-2 hover:bg-accent">
              <p>{hint.text}</p>
            </div>
          ))}
        </div>
        <FormStepsFooter
          formStep={formStep}
          setFormStep={setFormStep}
          steps={steps}
          submit={false}
          submitFn={() => {
            console.log('asd')
          }}
        />
      </div>
    </FormProvider>
  )
}

export default Hints
