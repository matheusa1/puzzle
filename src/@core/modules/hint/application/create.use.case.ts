import { Hint, TCreateHint } from '../entity/hint.entity'
import { HintGateway } from '../infra/gateway'

export class CreateHintUseCase {
  constructor(private readonly gateway: HintGateway) {}

  async execute(params: TCreateHint): Promise<Hint> {
    console.log('to aqui')
    const hint = await this.gateway.create(params)

    return new Hint({
      id: hint.id,
      logicPuzzleId: hint.logicPuzzleId,
      text: hint.text,
      order: hint.order,
      createdAt: hint.createdAt,
      updatedAt: hint.updatedAt,
    })
  }
}
