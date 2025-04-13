import { z } from 'zod'

import { difficulty } from '../../../../../prisma/generated/prisma'

export const createLogicPuzzleSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  image: z
    .string()
    .url({
      message: 'Image must be a valid URL',
    })
    .optional(),
  description: z.string(),
  difficulty: z.nativeEnum(difficulty),
})

export type TCreateLogicPuzzleSchema = z.infer<typeof createLogicPuzzleSchema>
