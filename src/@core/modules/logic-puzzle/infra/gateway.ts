import {
  PrismaClient,
  hint,
  logic_puzzle,
} from '../../../../../prisma/generated/prisma'
import { ILogicPuzzleGateway } from '../entity/gateway'
import { TCreateLogicPuzzle } from '../entity/logic-puzzle.entity'

export class LogicPuzzleGateway implements ILogicPuzzleGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    params: TCreateLogicPuzzle,
  ): Promise<logic_puzzle & { hint: hint[] }> {
    const logicPuzzle = await this.prisma.logic_puzzle.create({
      data: {
        image: params.image,
        puzzleId: params.puzzleId,
        hint: {
          createMany: {
            data: params.hints,
          },
        },
      },
      include: {
        hint: true,
      },
    })

    return logicPuzzle
  }
}
