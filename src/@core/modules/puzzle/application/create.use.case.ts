import { IPuzzleGateway } from '../entity/gateway'
import { Puzzle } from '../entity/puzzle.entity'
import { TCreatePuzzleSchema } from '../schema/create.schema'

export class CreatePuzzleUseCase {
  constructor(private readonly gateway: IPuzzleGateway) {}

  async execute(params: TCreatePuzzleSchema): Promise<Puzzle> {
    const puzzle = await this.gateway.create(params)

    return new Puzzle({
      createdAt: puzzle.createdAt,
      description: puzzle.description,
      difficulty: puzzle.difficultyId,
      id: puzzle.id,
      title: puzzle.name,
      updatedAt: puzzle.updatedAt,
    })
  }
}
