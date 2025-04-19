import { z } from 'zod'

import { difficulty } from '../../../../../prisma/generated/prisma'
import { createHintSchema } from '../../hint/schema/create.schema'

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
  hint: z.array(createHintSchema).min(1, {
    message: 'At least one hint is required',
  }),
})

export type TCreateLogicPuzzleSchema = z.infer<typeof createLogicPuzzleSchema>
