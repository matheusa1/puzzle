'use client'

import { logicPuzzle } from '@/@core/modules/logic-puzzle/infra/registry'
import { TCreateLogicPuzzleSchema } from '@/@core/modules/logic-puzzle/schema/create.schema'
import { Button } from '@/components/ui/button'
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
import { FC, useMemo } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

type TLogicPuzzleForm = {
  form: UseFormReturn<TCreateLogicPuzzleSchema>
}

const LogicPuzzleForm: FC<TLogicPuzzleForm> = ({ form }) => {
  const difficultyOptions = useMemo(
    () => logicPuzzle.getDifficulties.execute(),
    [],
  )

  const onHandleOnSubmit = (formData: TCreateLogicPuzzleSchema) => {
    console.log({ formData })
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
              <FormLabel>Imagem</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Dificuldade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {difficultyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
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
        <Button type="submit">Criar</Button>
      </form>
    </FormProvider>
  )
}

export default LogicPuzzleForm
