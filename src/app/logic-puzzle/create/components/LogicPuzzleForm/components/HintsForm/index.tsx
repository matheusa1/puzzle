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
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import FormStepsFooter from '../FormStepsFooter'
import { TFormStepProps } from '../formSteps'
import Hint from './components/Hint'

const Hints: FC<TFormStepProps> = ({ formStep, setFormStep, steps }) => {
  const { setPuzzleInfo, puzzleInfo } = usePuzzleInfoContext()

  const [hints, setHints] = useState<
    (TCreateHintNoOrderSchema & { id: number })[]
  >([])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const form = useForm<TCreateHintNoOrderSchema>({
    resolver: zodResolver(createHintNoOrderSchema),
    defaultValues: {
      text: '',
    },
  })

  const onSubmit = (data: TCreateHintNoOrderSchema) => {
    setHints((prev) => [...prev, { ...data, id: prev.length + 1 }])
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

  const handleDeleteHint = (index: number) => {
    setHints((prev) => prev.filter((_, hintIndex) => hintIndex !== index))
    setPuzzleInfo((prev) => ({
      ...prev,
      hint: prev?.hint
        ?.filter((_, hintIndex) => hintIndex !== index)
        .map((hint, index) => ({ ...hint, order: index + 1 })),
    }))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    console.log({ active, over, hints })

    if (active.id !== over.id) {
      const oldIndex = hints.findIndex((hint) => hint.id === active.id)
      const newIndex = hints.findIndex((hint) => hint.id === over.id)

      const newHints = arrayMove(hints, oldIndex, newIndex)

      console.log({ newHints })

      setHints(newHints)

      setPuzzleInfo((prev) => ({
        ...prev,
        hint: newHints.map((hint, index) => ({
          id: hint.id.toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          order: index + 1,
          logicPuzzleId: prev?.id,
          text: hint.text,
        })),
      }))
    }
  }

  const handleSave = () => {
    if (hints.length === 0) {
      return form.setError('text', {
        type: 'manual',
        message: 'Preencha pelo menos uma dica',
      })
    }

    setFormStep(formStep + 1)
  }

  useEffect(() => {
    setHints(
      puzzleInfo?.hint
        ? puzzleInfo?.hint.map((hint) => ({ ...hint, id: hint.order }))
        : [],
    )
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={hints}
              strategy={verticalListSortingStrategy}
            >
              {hints.map((hint, index) => (
                <Hint
                  key={hint.id}
                  hint={hint}
                  onDelete={() => handleDeleteHint(index)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <FormStepsFooter
          formStep={formStep}
          setFormStep={setFormStep}
          steps={steps}
          submit={false}
          submitFn={handleSave}
        />
      </div>
    </FormProvider>
  )
}

export default Hints
