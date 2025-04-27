import { z } from 'zod'

import { difficulty } from '../../../../../prisma/generated/prisma'

export const createPuzzleSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string(),
  difficulty: z.nativeEnum(difficulty),
})

export type TCreatePuzzleSchema = z.infer<typeof createPuzzleSchema>
