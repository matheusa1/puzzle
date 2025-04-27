'use client'

import { difficulty } from '@/@core/modules/difficulty/infra/registry'
import { TCreateLogicPuzzleSchema } from '@/@core/modules/logic-puzzle/schema/create.schema'
import { requestHandler } from '@/@core/utils/hander'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
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
import { FC, useMemo, useState } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import HintsModalForm from '../HintsModalForm'
import { createLogicPuzzle } from './actions'

type TLogicPuzzleForm = {
  form: UseFormReturn<TCreateLogicPuzzleSchema>
}

const LogicPuzzleForm: FC<TLogicPuzzleForm> = ({ form }) => {
  const [hints, setHints] = useState<string[]>([])

  const difficulties = useMemo(() => difficulty.getAll.execute(), [])

  const onHandleOnSubmit = async (formData: TCreateLogicPuzzleSchema) => {
    const [data, error] = await requestHandler({
      function: createLogicPuzzle,
      params: formData,
    })

    if (error) {
      toast.error(error)
    }

    if (data) {
      toast.success('Puzzle criado com sucesso!')
      form.reset()
      setHints([])
    }
  }

  const addHint = (hint: string) => {
    const updatedHints = [...hints, hint]
    setHints(updatedHints)
    form.setValue(
      'hint',
      updatedHints.map((hint, index) => ({ text: hint, order: index + 1 })),
    )
  }

  const updateHint = (index: number, hint: string) => {
    const updatedHints = [...hints]
    updatedHints[index] = hint

    setHints(updatedHints)
    form.setValue(
      'hint',
      updatedHints.map((hint, index) => ({ text: hint, order: index + 1 })),
    )
  }

  const removeHint = (index: number) => {
    const updatedHints = [...hints]
    updatedHints.splice(index, 1)

    setHints(updatedHints)
    form.setValue(
      'hint',
      updatedHints.map((hint, index) => ({ text: hint, order: index + 1 })),
    )
  }

  return (
    <FormProvider {...form}>
      <form
        className={'flex flex-col space-y-4'}
        onSubmit={form.handleSubmit(onHandleOnSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="OS castelos..." {...field} />
              </FormControl>
              <FormDescription>
                Título do puzzle. Ex: &quot;OS castelos...&quot;
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <div className="w-full flex flex-col space-y-2">
          <h2 className="h2">Dicas</h2>
          {form.formState.errors.hint && hints.length === 0 && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.hint.message}
            </p>
          )}
          {hints.map((hint, index) => (
            <Dialog key={hint + index}>
              <DialogTrigger asChild>
                <p className="hover:bg-accent cursor-pointer p-px px-4 rounded-sm">
                  {hint}
                </p>
              </DialogTrigger>
              <DialogContent>
                <HintsModalForm
                  addHintFn={addHint}
                  updateHintFn={updateHint}
                  hint={{ hint, index }}
                  removeHintFn={removeHint}
                />
              </DialogContent>
            </Dialog>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant={'secondary'}>
                Adicionar dica
              </Button>
            </DialogTrigger>
            <DialogContent>
              <HintsModalForm addHintFn={addHint} />
            </DialogContent>
          </Dialog>
        </div>
        <Button type="submit">Criar</Button>
      </form>
    </FormProvider>
  )
}

export default LogicPuzzleForm
