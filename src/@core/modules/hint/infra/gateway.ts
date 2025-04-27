import { PrismaClient, hint } from '../../../../../prisma/generated/prisma'
import { IHintGateway } from '../entity/gateway'
import { TCreateHint } from '../entity/hint.entity'

export class HintGateway implements IHintGateway {
  constructor(private readonly prisma: PrismaClient) {}

  create(params: TCreateHint): Promise<hint> {
    return this.prisma.hint.create({
      data: {
        text: params.text,
        order: params.order,
        logicPuzzleId: params.logicPuzzleId,
      },
    })
  }
}
