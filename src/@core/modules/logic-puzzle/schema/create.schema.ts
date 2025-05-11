import * as z from 'zod'

import { createPuzzleSchema } from '../../puzzle/schema/create.schema'

export const logicPuzzleSchema = z.object({
  image: z
    .string({
      invalid_type_error: 'A imagem deve ser um texto',
      message: 'A imagem deve ser uma URL',
    })
    .refine((url) => !url || /^https?:\/\/.+/i.test(url), {
      message: 'Informe uma URL válida',
    })
    .optional(),
})

export const createLogicPuzzleSchema = z.object({
  ...logicPuzzleSchema.shape,
  ...createPuzzleSchema.shape,
})

export type TCreateLogicPuzzleSchema = z.infer<typeof createLogicPuzzleSchema>
