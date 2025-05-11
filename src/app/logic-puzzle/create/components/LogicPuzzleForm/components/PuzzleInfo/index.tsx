import { difficulty } from '@/@core/modules/difficulty/infra/registry'
import {
  TCreateLogicPuzzleSchema,
  createLogicPuzzleSchema,
} from '@/@core/modules/logic-puzzle/schema/create.schema'
import { usePuzzleInfoContext } from '@/app/logic-puzzle/create/context/puzzleInfoContext'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import FormStepsFooter from '../FormStepsFooter'
import { TFormStepProps } from '../formSteps'

const PuzzleInfo: FC<TFormStepProps> = ({ formStep, setFormStep, steps }) => {
  const { setPuzzleInfo, puzzleInfo } = usePuzzleInfoContext()
  const difficulties = useMemo(() => difficulty.getAll.execute(), [])

  const form = useForm<TCreateLogicPuzzleSchema>({
    resolver: zodResolver(createLogicPuzzleSchema),
    defaultValues: {
      description: puzzleInfo?.description ?? '',
      title: puzzleInfo?.title ?? '',
      difficulty: puzzleInfo?.difficulty ?? undefined,
      image: puzzleInfo?.image ?? '',
    },
  })

  const title = form.watch('title')
  const description = form.watch('description')
  const difficultyForm = form.watch('difficulty')
  const image = form.watch('image')

  const onHandleSubmit = (data: TCreateLogicPuzzleSchema) => {
    console.log('data', data)
    setFormStep(formStep + 1)
  }

  useEffect(() => {
    setPuzzleInfo((prev) => ({
      ...prev,
      title,
      description,
      image,
      difficulty: difficultyForm ?? 'easy',
    }))
  }, [title, description, difficultyForm, image, setPuzzleInfo])

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col space-y-4 h-full"
        onSubmit={form.handleSubmit(onHandleSubmit)}
      >
        <div className="flex-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Os Castelos..." {...field} />
                </FormControl>
                <FormDescription>
                  Título do puzzle. Ex: &quot;Os Castelos...&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea placeholder="Durante a construção..." {...field} />
                </FormControl>
                <FormDescription>
                  Descrição. Ex: &quot;Durante a construção......&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dificuldade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Dificuldade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty.id} value={difficulty.id}>
                        {difficulty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormDescription>
                  Selecione a dificuldade do puzzle. Ex: &quot;Fácil&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <Input placeholder="https://image.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  URL da imagem do puzzle. Ex: &quot;https://image.jpg...&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormStepsFooter
          formStep={formStep}
          setFormStep={setFormStep}
          steps={steps}
        />
      </form>
    </FormProvider>
  )
}

export default PuzzleInfo
