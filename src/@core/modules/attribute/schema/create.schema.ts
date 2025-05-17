import { z } from 'zod'

export const createAttributeSchema = z.object({
  name: z
    .string({
      message: 'Campo obrigatório',
      required_error: 'Campo obrigatório',
    })
    .min(1, 'Campo obrigatório'),
  order: z.number(),
})

export const createAttributeNoOrderSchema = z.object({
  name: z
    .string({
      message: 'Campo obrigatório',
      required_error: 'Campo obrigatório',
    })
    .min(1, 'Campo obrigatório'),
})

export type TCreateAttributeSchema = z.infer<typeof createAttributeSchema>
export type TCreateAttributeNoOrderSchema = z.infer<
  typeof createAttributeNoOrderSchema
>
