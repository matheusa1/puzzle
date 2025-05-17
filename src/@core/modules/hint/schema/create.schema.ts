import { z } from 'zod'

export const createHintSchema = z.object({
  text: z.string(),
  order: z.number(),
})

export const createHintNoOrderSchema = z.object({
  text: z.string().min(1, {
    message: 'O texto da dica é obrigatório',
  }),
})

export type TCreateHintSchema = z.infer<typeof createHintSchema>
export type TCreateHintNoOrderSchema = z.infer<typeof createHintNoOrderSchema>
