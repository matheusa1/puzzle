import { z } from 'zod'

import { createHintSchema } from '../../hint/schema/create.schema'
import { createPuzzleSchema } from '../../puzzle/schema/create.schema'

export const logicPuzzleSchema = z.object({
  image: z
    .string()
    .url({
      message: 'Image must be a valid URL',
    })
    .optional(),
  hint: z.array(createHintSchema).min(1, {
    message: 'At least one hint is required',
  }),
})

export const createLogicPuzzleSchema =
  logicPuzzleSchema.merge(createPuzzleSchema)

export type TCreateLogicPuzzleSchema = z.infer<typeof createLogicPuzzleSchema>
