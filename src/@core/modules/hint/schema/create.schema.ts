import { z } from 'zod'

export const createHintSchema = z.object({
  text: z.string(),
  order: z.number(),
})

export type TCreateHintSchema = z.infer<typeof createHintSchema>
