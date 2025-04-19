import { difficulty } from '../../../../../prisma/generated/prisma'
import { Difficulty } from '../entity/difficulty.entity'

export class GetDifficultiesUseCase {
  execute(): Difficulty[] {
    const easy = new Difficulty({
      id: difficulty.easy,
      label: 'Fácil',
      color: '#00FF00',
    })

    const medium = new Difficulty({
      id: difficulty.medium,
      label: 'Médio',
      color: '#FFFF00',
    })

    const hard = new Difficulty({
      id: difficulty.hard,
      label: 'Difícil',
      color: '#FF0000',
    })

    const hard_p = new Difficulty({
      id: difficulty.hard_p,
      label: 'Difícil +',
      color: '#CC0000',
    })

    return [easy, medium, hard, hard_p]
  }
}
