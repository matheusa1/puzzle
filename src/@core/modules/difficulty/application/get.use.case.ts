import { Difficulty } from '../entity/difficulty.entity'

export class GetDifficultyUseCase {
  constructor(private readonly difficulties: Difficulty[]) {}

  execute(difficultyId: string): Difficulty {
    const difficulty = this.difficulties.find(
      (difficulty) => difficulty.id === difficultyId,
    )

    if (!difficulty) {
      throw new Error('Difficulty not found')
    }

    return difficulty
  }
}
