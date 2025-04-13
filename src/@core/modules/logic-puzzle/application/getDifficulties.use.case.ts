import { difficulty } from '../../../../../prisma/generated/prisma'
import { Difficulty } from '../entity/difficulty.entity'

export class GetDifficultyListUseCase {
  execute(): Difficulty[] {
    const easy = new Difficulty({
      label: 'Fácil',
      value: difficulty.easy,
    })
    const medium = new Difficulty({
      label: 'Médio',
      value: difficulty.medium,
    })
    const hard = new Difficulty({
      label: 'Difícil',
      value: difficulty.hard,
    })

    const difficultyList = [easy, medium, hard]

    return difficultyList
  }
}
