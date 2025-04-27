import { PrismaClient, puzzle } from '../../../../../prisma/generated/prisma'
import { IPuzzleGateway } from '../entity/gateway'
import { TCreatePuzzleSchema } from '../schema/create.schema'

export class PuzzleGateway implements IPuzzleGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async create(params: TCreatePuzzleSchema): Promise<puzzle> {
    return await this.prisma.puzzle.create({
      data: {
        name: params.title,
        description: params.description,
        difficultyId: params.difficulty,
      },
    })
  }
}
