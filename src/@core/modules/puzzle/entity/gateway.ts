import { puzzle } from '../../../../../prisma/generated/prisma'
import { TCreatePuzzleSchema } from '../schema/create.schema'

export interface IPuzzleGateway {
  create(params: TCreatePuzzleSchema): Promise<puzzle>
}
