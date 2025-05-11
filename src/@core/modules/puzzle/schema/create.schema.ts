import { z } from 'zod'

import { difficulty } from '../../../../../prisma/generated/prisma'

export const createPuzzleSchema = z.object({
  title: z
    .string({
      message: 'Informe o título',
    })
    .min(1, { message: 'O título é obrigatório' }),
  description: z
    .string({
      message: 'Informe a descrição',
      required_error: 'A descrição é obrigatória',
    })
    .min(1, { message: 'A descrição é obrigatória' }),
  difficulty: z.nativeEnum(difficulty, {
    required_error: 'Informe a dificuldade',
  }),
})

export type TCreatePuzzleSchema = z.infer<typeof createPuzzleSchema>
