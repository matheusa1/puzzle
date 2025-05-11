'use server'

import { logicPuzzleRegistry } from '@/@core/modules/logic-puzzle/infra/registry'
import { TCreateLogicPuzzleSchema } from '@/@core/modules/logic-puzzle/schema/create.schema'

export const createLogicPuzzle = async (formData: TCreateLogicPuzzleSchema) => {
  return (await logicPuzzleRegistry.create.execute(formData)).toJson()
}
