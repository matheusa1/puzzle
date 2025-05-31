import { z } from 'zod'

export const createOptionSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
})

export type TCreateOptionSchema = z.infer<typeof createOptionSchema>
