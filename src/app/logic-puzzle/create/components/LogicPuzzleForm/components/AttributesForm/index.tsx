import {
  TCreateAttributeNoOrderSchema,
  createAttributeNoOrderSchema,
} from '@/@core/modules/attribute/schema/create.schema'
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
import Attribute from './Attribute'

const AttributesForm: FC<TFormStepProps> = ({
  formStep,
  setFormStep,
  steps,
}) => {
  const { setPuzzleInfo, puzzleInfo } = usePuzzleInfoContext()

  const [attributes, setAttributes] = useState<
    (TCreateAttributeNoOrderSchema & { id: number })[]
  >([])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const form = useForm<TCreateAttributeNoOrderSchema>({
    resolver: zodResolver(createAttributeNoOrderSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (data: TCreateAttributeNoOrderSchema) => {
    console.log('data', data)
    setAttributes((prev) => [...prev, { ...data, id: prev.length + 1 }])
    setPuzzleInfo((prev) => ({
      ...prev,
      attribute: [
        ...(prev?.attribute ?? []),
        {
          id: (prev?.attribute?.length
            ? prev.attribute.length + 1
            : 1
          ).toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          order: prev?.attribute?.length ? prev.attribute.length + 1 : 1,
          logicPuzzleId: prev?.id,
          name: data.name,
          options: [],
          solution_value: [],
        },
      ],
    }))
    form.reset()
  }

  const handleDeleteAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, attrIndex) => attrIndex !== index))
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

    console.log({ active, over, attributes })

    if (active.id !== over.id) {
      const oldIndex = attributes.findIndex((attr) => attr.id === active.id)
      const newIndex = attributes.findIndex((attr) => attr.id === over.id)

      const newAttributes = arrayMove(attributes, oldIndex, newIndex)

      console.log({ newAttributes })

      setAttributes(newAttributes)

      setPuzzleInfo((prev) => ({
        ...prev,
        attribute: newAttributes.map((attr, index) => ({
          id: attr.id.toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          order: index + 1,
          logicPuzzleId: prev?.id,
          name: attr.name,
          options: [],
          solution_value: [],
        })),
      }))
    }
  }

  const handleSave = () => {
    if (attributes.length === 0) {
      form.setError('name', {
        type: 'manual',
        message: 'Preencha pelo menos um atributo',
      })
    }

    setFormStep(formStep + 1)
  }

  useEffect(() => {
    setAttributes(
      puzzleInfo?.attribute
        ? puzzleInfo?.attribute.map((attr) => ({
            ...attr,
            id: Number(attr.id),
          }))
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Textarea placeholder="Nome do atributo..." {...field} />
                </FormControl>
                <FormDescription>
                  Nome do atributo. Ex: &quot;Nome do atributo...&quot;
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
              items={attributes}
              strategy={verticalListSortingStrategy}
            >
              {attributes.map((attr, index) => (
                <Attribute
                  key={attr.id}
                  attribute={attr}
                  onDelete={() => handleDeleteAttribute(index)}
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

export default AttributesForm
