import {
  TCreateHintSchema,
  createHintSchema,
} from '@/@core/modules/hint/schema/create.schema'
import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type THintsModalForm = {
  addHintFn: (hint: string) => void
  updateHintFn?: (index: number, hint: string) => void
  removeHintFn?: (index: number) => void
  hint?: {
    hint: string
    index: number
  }
}

const HintsModalForm: FC<THintsModalForm> = ({
  addHintFn,
  hint,
  updateHintFn,
  removeHintFn,
}) => {
  const form = useForm<TCreateHintSchema>({
    resolver: zodResolver(createHintSchema),
    defaultValues: {
      text: hint ? hint.hint : '',
      order: hint ? hint.index : 0,
    },
  })

  const onHandleSubmit = (formData: TCreateHintSchema) => {
    if (hint && updateHintFn) {
      updateHintFn(hint.index, formData.text)
      return
    }
    addHintFn(formData.text)
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col space-y-4">
        <DialogHeader>
          <DialogTitle>Adicionar dica.</DialogTitle>
          <DialogDescription>
            Adicione uma dica para o puzzle.
          </DialogDescription>
        </DialogHeader>
        <div>
          <FormField
            control={form.control}
            name="text"
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
        </div>
        <DialogFooter>
          {hint && removeHintFn && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                removeHintFn(hint.index)
              }}
            >
              Remover dica
            </Button>
          )}
          <Button type="button" onClick={form.handleSubmit(onHandleSubmit)}>
            Adicionar dica
          </Button>
        </DialogFooter>
      </div>
    </FormProvider>
  )
}

export default HintsModalForm
