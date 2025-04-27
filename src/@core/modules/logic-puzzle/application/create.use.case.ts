import { Hint } from '../../hint/entity/hint.entity'
import { puzzleRegistry } from '../../puzzle/infra/registry'
import { LogicPuzzle } from '../entity/logic-puzzle.entity'
import { LogicPuzzleGateway } from '../infra/gateway'
import { TCreateLogicPuzzleSchema } from '../schema/create.schema'

export class CreateLogicPuzzleUseCase {
  constructor(private readonly gateway: LogicPuzzleGateway) {}

  async execute(params: TCreateLogicPuzzleSchema): Promise<LogicPuzzle> {
    const puzzle = await puzzleRegistry.create.execute({
      description: params.description,
      difficulty: params.difficulty,
      title: params.title,
    })

    const logicPuzzle = await this.gateway.create({
      puzzleId: puzzle.id,
      image: params.image,
      hints: params.hint,
    })

    const hintsEntities = logicPuzzle.hint.map((hint) => {
      return new Hint(hint)
    })

    const logicPuzzleEntity = new LogicPuzzle({
      createdAt: logicPuzzle.createdAt,
      description: puzzle.description,
      difficulty: puzzle.difficulty,
      id: puzzle.id,
      image: logicPuzzle.image ? logicPuzzle.image : undefined,
      title: puzzle.title,
      updatedAt: logicPuzzle.updatedAt,
      hint: hintsEntities,
    })

    return logicPuzzleEntity
  }
}
