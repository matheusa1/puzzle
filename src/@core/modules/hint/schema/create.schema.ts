import { z } from 'zod'

export const createHintSchema = z.object({
  text: z.string(),
})

export type TCreateHintSchema = z.infer<typeof createHintSchema>
